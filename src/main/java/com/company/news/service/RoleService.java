package com.company.news.service;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.company.news.commons.util.PxStringUtil;
import com.company.news.entity.Right;
import com.company.news.entity.Role;
import com.company.news.entity.RoleRightRelation;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class RoleService extends AbstractServcice {
	/**
	 * 新增角色
	 * 
	 * @param name
	 * @param description
	 * @param responseMessage
	 * @return
	 */
	public Role add(String name, String description,
			ResponseMessage responseMessage) {
		if (StringUtils.isBlank(name) || name.length() > 45) {
			responseMessage.setMessage("权限名不能为空！，且长度不能超过45位！");
			return null;
		}

		if (StringUtils.isBlank(description) || description.length() > 45) {
			responseMessage.setMessage("描述不能为空！，且长度不能超过45位！");
			return null;
		}

		if (isExitSameRoleByname(name)) {
			responseMessage.setMessage("存在相同的角色名，");
			return null;
		}

		Role role = new Role();
		role.setDescription(description);
		role.setName(name);
		role.setCreate_time(TimeUtils.getCurrentTimestamp());

		this.nSimpleHibernateDao.getHibernateTemplate().save(role);
		return role;

	}

	/**
	 * 更新角色
	 * 
	 * @param uuid
	 * @param name
	 * @param description
	 * @param responseMessage
	 * @return
	 */
	public Role update(String uuid, String name, String description,
			ResponseMessage responseMessage) {
		if (StringUtils.isBlank(name) || name.length() > 45) {
			responseMessage.setMessage("角色名不能为空！，且长度不能超过45位！");
			return null;
		}

		if (StringUtils.isBlank(description) || description.length() > 45) {
			responseMessage.setMessage("描述不能为空！，且长度不能超过45位！");
			return null;
		}

		if (StringUtils.isBlank(uuid)) {
			responseMessage.setMessage("ID不能为空！");
			return null;
		}

		if (isExitSameRoleByname(name)) {
			responseMessage.setMessage("存在相同的角色名，");
			return null;
		}

		Role role = (Role) this.nSimpleHibernateDao.getObject(Role.class, uuid);
		if (role != null) {
			role.setDescription(description);
			role.setName(name);

			this.nSimpleHibernateDao.getHibernateTemplate().update(role);
		}

		return role;

	}

	/**
	 * 删除 支持多个，用逗号分隔
	 * 
	 * @param uuid
	 */
	public boolean delete(String uuid, ResponseMessage responseMessage) {
		if (StringUtils.isBlank(uuid)) {

			responseMessage.setMessage("ID不能为空！");
			return false;
		}

		if (uuid.indexOf(",") != -1)// 多ID
		{
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"delete from Role where uuid in(?)", uuid);
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"delete from RoleRightRelation where roleuuid in(?)", uuid);
		} else {
			this.nSimpleHibernateDao.deleteObjectById(Role.class, uuid);
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"delete from RoleRightRelation where roleuuid =?", uuid);
		}

		return true;
	}

	/**
	 * 查询所有权限
	 * 
	 * @return
	 */
	public List<Role> query() {
		return (List<Role>) this.nSimpleHibernateDao.getHibernateTemplate()
				.find("from Role", null);

	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return RoleService.class;
	}

	/**
	 * 角色名是否存在
	 * 
	 * @param company_name
	 * @return
	 */
	private boolean isExitSameRoleByname(String name) {
		String attribute = "name";
		Object role = nSimpleHibernateDao.getObjectByAttribute(Role.class,
				attribute, name);

		if (role != null)// 已被占用
			return true;
		else
			return false;

	}
	
	/**
	 * 根据角色ID取权限列表
	 * @param uuid
	 */
	public List<RoleRightRelation> getRightByRoleuuid(String uuid){
		if (StringUtils.isBlank(uuid)) 
			return null;
		
		return (List<RoleRightRelation>) this.nSimpleHibernateDao.getHibernateTemplate().find("from RoleRightRelation where roleuuid=?", uuid);
		
	}
	
	
	/**
	 * 
	 * @param roleuuid
	 * @param rightuuids
	 */
	public boolean updateRoleRightRelation(String roleuuid,String rightuuids,ResponseMessage responseMessage){
		if (StringUtils.isBlank(roleuuid)) 
		{
			responseMessage.setMessage("roleuuid不能为空");
			return false;
		}
		
		//删除原有角色权限
		this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate("delete from RoleRightRelation where roleuuid =?", roleuuid);
		
		if(StringUtils.isNotBlank(rightuuids))
		{
			String[] str=PxStringUtil.StringDecComma(rightuuids).split(",");
			for(String s:str){
				RoleRightRelation r=new RoleRightRelation();
				r.setRightuuid(s);
				r.setRoleuuid(roleuuid);
				this.nSimpleHibernateDao.getHibernateTemplate().save(r);
			}
			
		}
		return true;
	}
	
	
}
