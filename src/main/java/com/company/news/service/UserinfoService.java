package com.company.news.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import com.company.news.ProjectProperties;
import com.company.news.SystemConstants;
import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.Group;
import com.company.news.entity.RoleUserRelation;
import com.company.news.entity.User;
import com.company.news.entity.UserGroupRelation;
import com.company.news.form.UserLoginForm;
import com.company.news.jsonform.GroupRegJsonform;
import com.company.news.jsonform.UserRegJsonform;
import com.company.news.rest.RestConstants;
import com.company.news.rest.util.TimeUtils;
import com.company.news.right.RightConstants;
import com.company.news.validate.CommonsValidate;
import com.company.news.vo.ResponseMessage;
import com.company.news.vo.UserInfoReturn;
import com.company.plugin.security.LoginLimit;
import com.company.web.listener.SessionListener;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class UserinfoService extends AbstractServcice {
	public static final int USER_disable_default = 0;// 电话号码，验证。默认0，0:没验证。1:验证，2：提交验证
	public static final int USER_tel_verify_default = 0;// 是否被管理员封号。0：不封。1：封号，不允许登录。

	// 20150610 去掉对用户表的TYPE定义，默认都为0
	public static final int USER_type_group = 0;// 组织管理员
	public static final int USER_type_teacher = 0;// 老师类型

	// 用户状态
	public static final int USER_disable_true = 1;// 禁用

	/**
	 * 用户注册
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean reg(UserRegJsonform userRegJsonform,
			ResponseMessage responseMessage) throws Exception {

		// TEL格式验证
		if (!CommonsValidate.checkCellphone(userRegJsonform.getTel())) {
			responseMessage.setMessage("电话号码格式不正确！");
			return false;
		}

		// name昵称验证
		if (StringUtils.isBlank(userRegJsonform.getName())
				|| userRegJsonform.getName().length() > 15) {
			responseMessage.setMessage("昵称不能为空，且长度不能超过15位！");
			return false;
		}

		// Group_uuid昵称验证
		if (StringUtils.isBlank(userRegJsonform.getGroup_uuid())) {
			responseMessage.setMessage("关联机构不能为空！");
			return false;
		}

		// 用户名是否存在
		if (isExitSameUserByLoginName(userRegJsonform.getTel())) {
			responseMessage.setMessage("电话号码已被注册！");
			return false;
		}

		User user = new User();

		BeanUtils.copyProperties(user, userRegJsonform);
		user.setLoginname(userRegJsonform.getTel());
		user.setCreate_time(TimeUtils.getCurrentTimestamp());
		user.setDisable(USER_disable_default);
		user.setLogin_time(TimeUtils.getCurrentTimestamp());
		user.setTel_verify(USER_tel_verify_default);
		user.setSex(0);

		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(user);

		// 保存用户机构关联表
		UserGroupRelation userGroupRelation = new UserGroupRelation();
		userGroupRelation.setUseruuid(user.getUuid());
		userGroupRelation.setGroupuuid(userRegJsonform.getGroup_uuid());
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(userGroupRelation);

		//注册机构情况下,当前用户设置为管理员角色
		if(userRegJsonform instanceof GroupRegJsonform){
			GroupRegJsonform group=(GroupRegJsonform)userRegJsonform;
			if(SystemConstants.Group_type_1.equals(group.getType())){
				RoleUserRelation r = new RoleUserRelation();
				r.setRoleuuid(RightConstants.Role_KD_admini);
				r.setUseruuid(user.getUuid());
				this.nSimpleHibernateDao.getHibernateTemplate().save(r);
				
			}
		}
		return true;
	}

	/**
	 * 用户注册
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean update(UserRegJsonform userRegJsonform,
			ResponseMessage responseMessage) throws Exception {

		// name昵称验证
		if (StringUtils.isBlank(userRegJsonform.getName())
				|| userRegJsonform.getName().length() > 15) {
			responseMessage.setMessage("昵称不能为空，且长度不能超过15位！");
			return false;
		}

		User user = (User) this.nSimpleHibernateDao.getObject(User.class,
				userRegJsonform.getUuid());
		if (user == null) {
			responseMessage.setMessage("user不存在！");
			return false;
		}

		user.setName(userRegJsonform.getName());
		user.setSex(userRegJsonform.getSex());
		user.setEmail(userRegJsonform.getEmail());
		user.setOffice(userRegJsonform.getOffice());

		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().update(user);

		return true;
	}

	/**
	 * 
	 * @param loginName
	 * @param password
	 * @return
	 * @throws Exception
	 */
	public boolean login(UserLoginForm userLoginForm, ModelMap model,
			HttpServletRequest request, ResponseMessage responseMessage)
			throws Exception {
		String loginname = userLoginForm.getLoginname();
		String password = userLoginForm.getPassword();

		if (StringUtils.isBlank(loginname)) {
			responseMessage.setMessage("用户登录名不能为空!");
			return false;
		}
		if (StringUtils.isBlank(password)) {
			responseMessage.setMessage("登陆密码不能为空!");
			return false;
		}

		String attribute = "loginname";

		User user = (User) this.nSimpleHibernateDao.getObjectByAttribute(
				User.class, attribute, loginname);

		if (user == null) {
			responseMessage.setMessage("用户名:" + loginname + ",不存在!");
			return false;
		}
		
		boolean pwdIsTrue = false;
		{
			// 密码比较
			String smmPWD = user.getPassword();

			if (password.equals(smmPWD)) {
				pwdIsTrue = true;
			} else {
				pwdIsTrue = false;
			}

			// 在限定次数内
			String project_loginLimit = ProjectProperties.getProperty(
					"project.LoginLimit", "true");
			if ("true".equals(project_loginLimit)) {
				if (!LoginLimit.verifyCount(loginname, pwdIsTrue,
						responseMessage)) {// 密码错误次数验证
					return false;
				}
				if (!pwdIsTrue) {
					responseMessage.setMessage("用户登录名或者密码错误，请重试!");
					return false;
				}

			} else {
				if (!pwdIsTrue) {
					responseMessage.setMessage("用户登录名或者密码错误，请重试!");
					return false;
				}
			}

		}
		Boolean isAdmin=false;
		//后台管理员登录
		if(SystemConstants.Group_type_0.toString().equals(userLoginForm.getGrouptype())){
			Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().getCurrentSession();
			String sql="";
			List tmpList = s.createSQLQuery("select {t1.*} from px_usergrouprelation t0,px_group {t1} where {t1}.type="+SystemConstants.Group_type_0+" and t0.groupuuid={t1}.uuid and t0.useruuid='"+user.getUuid()+"'")
					.addEntity("t1",Group.class).list();
			if(tmpList.size()==0){
				responseMessage.setMessage("不是合法用户,不能登录云平台管理");
				return false;
			}
			
			isAdmin=true;
			
			
		}

		// 创建session
		HttpSession session = SessionListener
				.getSession((HttpServletRequest) request);

		if (session != null) {
			User userInfo = (User) session
					.getAttribute(RestConstants.Session_UserInfo);
			if (userInfo != null && loginname.equals(userInfo.getLoginname())) {
				// 当前用户,在线直接返回当前用户.
				this.logger.info("userInfo is online,loginName=" + loginname);
				// 返回用户信息
				UserInfoReturn userInfoReturn = new UserInfoReturn();
				try {
					BeanUtils.copyProperties(userInfoReturn, user);
				} catch (Exception e) {
					e.printStackTrace();
				}
				model.put(RestConstants.Return_JSESSIONID, session.getId());
				model.put(RestConstants.Return_UserInfo, userInfoReturn);
				session.setAttribute(RestConstants.Session_isAdmin, isAdmin);
				return true;
			}
		}

		// 更新登陆日期,最近一次登陆日期
		this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
				"update User set login_time=?,last_login_time=? where uuid=?",
				TimeUtils.getCurrentTimestamp(), user.getLogin_time(),
				user.getUuid());
		session = request.getSession(true);
		// this.nSimpleHibernateDao.getHibernateTemplate().evict(user);
		SessionListener.putSessionByJSESSIONID(session);
		session.setAttribute(RestConstants.Session_UserInfo, user);
		session.setAttribute(RestConstants.Session_isAdmin, isAdmin);
		// 返回客户端用户信息放入Map
		// putUserInfoReturnToModel(model, request);

		model.put(RestConstants.Return_JSESSIONID, session.getId());
		Session s = this.nSimpleHibernateDao.getHibernateTemplate().getSessionFactory().getCurrentSession();
		
		List tmpList1 = s.createSQLQuery("select t1.rightname from px_roleuserrelation t0,px_rolerightrelation t1 where  t0.roleuuid=t1.roleuuid and t0.useruuid='"+user.getUuid()+"'")
				.list();
		
		//测试数据,拥有所有权限
		if("true".equals(ProjectProperties.getProperty(
				"Debug_All_role", "false"))){
			this.logger.warn("调试模式下面,用户有所有角色权限.");
			tmpList1 = s.createSQLQuery("select name from px_right").list();
		}
		
		session.setAttribute(RestConstants.Session_UserInfo_rights, tmpList1);
		session.setAttribute(RestConstants.Session_isAdmin, isAdmin);

		return true;
	}

	/**
	 * 是否用户名已被占用
	 * 
	 * @param loginname
	 * @return
	 */
	private boolean isExitSameUserByLoginName(String loginname) {
		String attribute = "loginname";
		Object user = nSimpleHibernateDao.getObjectByAttribute(User.class,
				attribute, loginname);

		if (user != null)// 已被占用
			return true;
		else
			return false;

	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return User.class;
	}

	/**
	 * 查询所有机构列表
	 * 
	 * @return
	 */
	public List<User> query() {
		return (List<User>) this.nSimpleHibernateDao.getHibernateTemplate()
				.find("from User", null);
	}

	/**
	 * 查询指定机构的用户列表
	 * 
	 * @return
	 */
	public List<User> getUserByGroupuuid(String uuid) {
		Session s = this.nSimpleHibernateDao.getHibernateTemplate()
				.getSessionFactory().openSession();
		String sql = "";
		Query q = s
				.createSQLQuery(
						"select {t1.*} from px_usergrouprelation t0,px_user {t1} where t0.useruuid={t1}.uuid and t0.groupuuid='"
								+ uuid + "'").addEntity("t1", User.class);

		return q.list();
	}

	/**
	 * 
	 * @param disable
	 * @param useruuid
	 */
	public boolean updateDisable(String disable, String useruuids,
			ResponseMessage responseMessage) {
		// 更新用户状态
		// Group_uuid昵称验证
		if (StringUtils.isBlank(useruuids)) {
			responseMessage.setMessage("useruuid不能为空！");
			return false;
		}

		if (StringUtils.isBlank(disable)) {
			responseMessage.setMessage("disable不能为空！");
			return false;
		}

		int disable_i = USER_disable_default;
		try {
			disable_i = Integer.parseInt(disable);
			if (disable_i != USER_disable_true)// 不是禁用时，默认都是0
				disable_i = USER_disable_default;
		} catch (Exception e) {
			e.printStackTrace();
		}

		this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
				"update User set disable=? where uuid in(?)", disable_i,
				PxStringUtil.StringDecComma(useruuids));
		return true;
	}

	/**
	 * 根据角色ID取权限列表
	 * 
	 * @param uuid
	 */
	public List<RoleUserRelation> getRoleuuid(String uuid) {
		if (StringUtils.isBlank(uuid))
			return null;

		return (List<RoleUserRelation>) this.nSimpleHibernateDao
				.getHibernateTemplate().find(
						"from RoleUserRelation where useruuid=?", uuid);

	}

	/**
	 * 
	 * @param roleuuid
	 * @param rightuuids
	 */
	public boolean updateRoleRightRelation(String roleuuids, String useruuid,String type,
			ResponseMessage responseMessage) {
		if (StringUtils.isBlank(useruuid)) {
			responseMessage.setMessage("useruuids不能为空");
			return false;
		}
		String whereType="";
		if (!StringUtils.isBlank(type)) {
			
			 whereType=" and roleuuid in (select uuid from Role where type="+type+" ) ";
		}
		// 删除原有角色权限
		int tmpCout=this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
				"delete from RoleUserRelation where useruuid =? "+whereType, useruuid);
		this.logger.info("delete from RoleUserRelation count="+tmpCout);
		if (StringUtils.isNotBlank(roleuuids)) {
			String[] str = PxStringUtil.StringDecComma(roleuuids).split(",");
			for (String s : str) {
				RoleUserRelation r = new RoleUserRelation();
				r.setRoleuuid(s);
				r.setUseruuid(useruuid);
				this.nSimpleHibernateDao.getHibernateTemplate().save(r);
			}
		}

		return true;
	}

	/**
	 * 
	 * @param disable
	 * @param useruuid
	 */
	public boolean updatePassword(UserRegJsonform userRegJsonform,
			ResponseMessage responseMessage) {
		// 更新用户状态
		// Group_uuid昵称验证
		if (StringUtils.isBlank(userRegJsonform.getUuid())) {
			responseMessage.setMessage("useruuid不能为空！");
			return false;
		}

		if (StringUtils.isBlank(userRegJsonform.getOldpassword())) {
			responseMessage.setMessage("Oldpassword不能为空！");
			return false;
		}

		if (StringUtils.isBlank(userRegJsonform.getPassword())) {
			responseMessage.setMessage("Password不能为空！");
			return false;
		}

		User user = (User) this.nSimpleHibernateDao.getObject(User.class,
				userRegJsonform.getUuid());
		if (user == null) {
			responseMessage.setMessage("user不存在！");
			return false;
		}

		if (!user.getPassword().equals(userRegJsonform.getOldpassword())) {
			responseMessage.setMessage("Oldpassword不匹配！");
			return false;
		}

		this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
				"update User set password=? where uuid =?",
				userRegJsonform.getPassword(), userRegJsonform.getUuid());
		return true;
	}
}
