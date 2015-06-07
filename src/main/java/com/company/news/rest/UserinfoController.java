package com.company.news.rest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.company.news.form.UserLoginForm;
import com.company.news.jsonform.UserRegJsonform;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.UserinfoService;
import com.company.news.vo.ResponseMessage;
import com.company.web.listener.SessionListener;

@Controller
@RequestMapping(value = "/userinfo")
public class UserinfoController extends AbstractRESTController{

	@Autowired
	private UserinfoService userinfoService;

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String login(UserLoginForm userLoginForm, ModelMap model, HttpServletRequest request) {

	
		return "";
	}
	
	/**
	 * 教师注册
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/reg", method = RequestMethod.POST)
    public String reg( ModelMap model,HttpServletRequest request) {
		//返回消息体
		ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
		//请求消息体
		String bodyJson=RestUtil.getJsonStringByRequest(request);
		UserRegJsonform userRegJsonform;
		try {
			userRegJsonform = (UserRegJsonform)this.bodyJsonToFormObject(bodyJson, UserRegJsonform.class);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(error_bodyJsonToFormObject);
			return "";
		}
		try {
			boolean flag=userinfoService.reg(UserinfoService.USER_type_teacher, userRegJsonform, responseMessage);
		    if(!flag)//请求服务返回失败标示
		    	return "";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			responseMessage.setMessage(e.getMessage());
			return "";
		}
        
		responseMessage.setStatus(RestConstants.Return_ResponseMessage_success);
		responseMessage.setMessage("注册成功");
        return "";
    }


	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public String logout(ModelMap model, HttpServletRequest request) {
		// 创建session
		HttpSession session = SessionListener.getSession(request);
		if (session != null) {
			// UserInfo
			// userInfo=(UserInfo)session.getAttribute(RestConstants.Session_UserInfo);
			session.invalidate();
		}

		ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
		// responseMessage.setMessage(new Message("失败消息!", "Failure message"));
		return "";
	}




    /**
     * 获取用户信息
     * @param model
     * @param request
     * @return
     */
    @RequestMapping(value = "/getUserinfo", method = RequestMethod.GET)
    public String getUserinfo( ModelMap model, HttpServletRequest request) {
        model.clear();
        RestUtil.addResponseMessageForModelMap(model);
        HttpSession session = SessionListener.getSession(request);
        // 返回用户信息
        this.putUserInfoReturnToModel(model, request);
        model.put(RestConstants.Return_JSESSIONID, session.getId());
        //model.put(RestConstants.Return_UserInfo, userInfoReturn);
        return "";
    }
}
