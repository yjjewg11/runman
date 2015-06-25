package com.company.news.service;

import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.company.news.entity.ClassNews;
import com.company.news.jsonform.ClassNewsJsonform;
import com.company.news.query.PageQueryResult;
import com.company.news.query.PaginationData;
import com.company.news.rest.util.TimeUtils;
import com.company.news.vo.ResponseMessage;

/**
 * 
 * @author Administrator
 * 
 */
@Service
public class ClassNewsService extends AbstractServcice {

	/**
	 * 增加班级
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean add(ClassNewsJsonform classNewsJsonform,
			ResponseMessage responseMessage) throws Exception {
		if (StringUtils.isBlank(classNewsJsonform.getTitle())
				|| classNewsJsonform.getTitle().length() > 128) {
			responseMessage.setMessage("班级名不能为空！，且长度不能超过45位！");
			return false;
		}

		if (StringUtils.isBlank(classNewsJsonform.getClassuuid())) {
			responseMessage.setMessage("groupuuid不能为空！");
			return false;
		}

		ClassNews cn=new ClassNews();

		BeanUtils.copyProperties(cn, classNewsJsonform);

		cn.setCreate_time(TimeUtils.getCurrentTimestamp());
		cn.setUpdate_time(TimeUtils.getCurrentTimestamp());
		cn.setReply_time(TimeUtils.getCurrentTimestamp());
		// 有事务管理，统一在Controller调用时处理异常
		this.nSimpleHibernateDao.getHibernateTemplate().save(cn);

		

		return true;
	}

	/**
	 * 更新班级
	 * 
	 * @param entityStr
	 * @param model
	 * @param request
	 * @return
	 */
	public boolean update(ClassNewsJsonform classNewsJsonform,
			ResponseMessage responseMessage) throws Exception {
		if (StringUtils.isBlank(classNewsJsonform.getTitle())
				|| classNewsJsonform.getTitle().length() > 128) {
			responseMessage.setMessage("班级名不能为空！，且长度不能超过45位！");
			return false;
		}
		
		ClassNews cn=(ClassNews) this.nSimpleHibernateDao.getObjectById(ClassNews.class, classNewsJsonform.getUuid());
		
		if(cn!=null){
			cn.setContent(classNewsJsonform.getContent());
			cn.setTitle(classNewsJsonform.getTitle());
			cn.setUpdate_time(TimeUtils.getCurrentTimestamp());
			
			this.nSimpleHibernateDao.getHibernateTemplate().update(cn);
		}else{
			responseMessage.setMessage("对象不存在");
			return true;
		}

		

		return true;
	}

	/**
	 * 查询所有班级
	 * 
	 * @return
	 */
	public PageQueryResult query(String classuuid, PaginationData pData) {
		String hql="from ClassNews4Q where 1=1";	
		if (StringUtils.isNotBlank(classuuid))
			hql+=" and  classuuid="+classuuid;
		
		hql+=" order by create_time";
		
		PageQueryResult pageQueryResult= this.nSimpleHibernateDao.findByPaginationToHql(hql, pData);
		
		return pageQueryResult;
				
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
					"delete from ClassNews where uuid in(?)", uuid);
			this.nSimpleHibernateDao
					.getHibernateTemplate()
					.bulkUpdate(
							"delete from ClassNewsReply where newsuuid in(?)",
							uuid);
		} else {
			this.nSimpleHibernateDao.deleteObjectById(ClassNews.class, uuid);
			this.nSimpleHibernateDao.getHibernateTemplate().bulkUpdate(
					"delete from ClassNewsReply where newsuuid =?", uuid);
		}

		return true;
	}

	
	public ClassNews get(String uuid) throws Exception {
		return (ClassNews) this.nSimpleHibernateDao.getObjectById(
				ClassNews.class, uuid);	
	}

	@Override
	public Class getEntityClass() {
		// TODO Auto-generated method stub
		return ClassNews.class;
	}

}