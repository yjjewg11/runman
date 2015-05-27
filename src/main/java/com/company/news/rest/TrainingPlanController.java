package com.company.news.rest;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.company.news.query.NSearchContion;
import com.company.news.rest.util.RestUtil;
import com.company.news.service.TrainingPlanService;
import com.company.news.springMVC.beans.propertyeditors.CustomTimestampEditor;
import com.company.news.vo.ResponseMessage;

@Controller
public class TrainingPlanController {

  @InitBinder  
  public void initBinder(WebDataBinder binder) {   
      // 忽略字段绑定异常   
      // binder.setIgnoreInvalidFields(true);   

      DateFormat format = new SimpleDateFormat(RestConstants.SimpleDateFormat);   
      format.setLenient(true);   
      binder.registerCustomEditor(Date.class, new CustomDateEditor(format, true));    

      DateFormat formatTime = new SimpleDateFormat(RestConstants.SimpleTimestampFormat);   
      binder.registerCustomEditor(Timestamp.class, new CustomTimestampEditor(formatTime, true));    

//      binder.registerCustomEditor(Date.class, "birthday",   
//              new CustomDateEditor(format, true));   
  }   

  @Autowired
  private TrainingPlanService trainingPlanService;
  /**
   * 保存（创建或更新）
   * @param model
   * @param request
   * @return
   */
  @RequestMapping(value = "/trainingPlan/save", method = RequestMethod.POST)
  public String save( ModelMap model, HttpServletRequest request) {
    String bodyJson=RestUtil.getJsonStringByRequest(request);
      try {
        trainingPlanService.save(bodyJson, model, request);
      } catch (Exception e) {
        e.printStackTrace();
        ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
        responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
        responseMessage.setMessage(e.getMessage());
      }
      return "";
  }
  
  @RequestMapping(value = "/trainingPlan/{uuid}", method = RequestMethod.GET)
  public String get(@PathVariable("uuid") String uuid, ModelMap model,HttpServletRequest request) {
    try {
      trainingPlanService.get(uuid, model,request);
    } catch (Exception e) {
      e.printStackTrace();
      ResponseMessage responseMessage = RestUtil.addResponseMessageForModelMap(model);
      responseMessage.setStatus(RestConstants.Return_ResponseMessage_failed);
      responseMessage.setMessage(e.getMessage());
    }
    
    return "";
  }
  
  @RequestMapping(value = "/trainingPlan/my", method = RequestMethod.GET)
   public String indexMy(NSearchContion sc, ModelMap model,HttpServletRequest request) {
    sc.setType("my");
    trainingPlanService.index(sc, model,request);
    return "";
  }
  
  /**
   * 查询发布状态
   * @param sc
   * @param model
   * @param request
   * @return
   */
  @RequestMapping(value = "/trainingPlan/queryPublish", method = RequestMethod.GET)
  public String queryPublish(NSearchContion sc, ModelMap model,HttpServletRequest request) {
    sc.setType("queryPublish");
   trainingPlanService.index(sc, model,request);
   return "";
 }
  
  @RequestMapping(value = "/trainingPlan/my/{ids}", method = RequestMethod.DELETE)
  public String delete(@PathVariable("ids") String ids,HttpServletRequest request, ModelMap model) {
    // TODO Auto-generated method stub
    trainingPlanService.delete(ids, request,model);  
    return "";
  }
}