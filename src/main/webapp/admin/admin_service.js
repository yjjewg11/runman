

function ajax_getUserinfo(isInit) {
	$.AMUI.progress.start();
	var url = hostUrl + "rest/userinfo/getUserinfo.json";
	$.ajax({
		type : "GET",
		url : url,
		async: false,
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				if(data.userinfo)Store.setUserinfo(data.userinfo);
				if(data.list)Store.setGroup(data.list);
				menu_body_fn();
			} else {
				if(!isInit)alert(data.ResMsg.message);
				G_resMsg_filter(data.ResMsg);
			}
			
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+","+textStatus+"="+errorThrown);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
		}
	});
}


function menu_userinfo_login_fn(){
	Queue.push(menu_userinfo_login_fn);
	var loginname = getCookie("bs_loginname");
	var password = getCookie("bs_password");
	var pw_checked = getCookie("pw_checked");
	
	React.render(React.createElement(Div_login,{loginname:loginname,password:password,pw_checked:pw_checked})
			, document.getElementById('div_login'));
	$("#div_seesion_body").hide();
}
//用户登陆
function ajax_userinfo_login() {
	
	 var $btn = $("#btn_login");
	  $btn.button('loading');
	$.AMUI.progress.start();

	var loginname = $("#loginname").val();
	var password = $("#password").val();
	if(password.length!=32){
		 password=$.md5(password); 
	}
	
	var url = hostUrl + "rest/userinfo/login.json?loginname=" + loginname + "&password="
			+ password;
	$.ajax({
		type : "POST",
		url : url,
		data : "",
		dataType : "json",
		success : function(data) {
			 $btn.button('reset');
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				Store.clear();
				//判断是否保存密码，如果保存则放入cookie，否则清除cookie
				setCookie("bs_loginname", loginname);
				if($("#pw_checked")[0].checked){
					setCookie("bs_password", password);
					setCookie("pw_checked", "checked");
				} else {
					setCookie("bs_password", ""); 
					setCookie("pw_checked", "");
				}
				Store.setUserinfo(data.userinfo);
				Store.setGroup(data.list);
				menu_body_fn();
				
				
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			 $btn.button('reset');
			$.AMUI.progress.done();
			alert(url+","+textStatus+"="+errorThrown);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
		}
	});
}



//userinfo

function menu_userinfo_logout_fn(){
	ajax_userinfo_logout();
}
function ajax_userinfo_logout(){
	Queue.clear();
	$.AMUI.progress.start();
	var url = hostUrl + "rest/userinfo/logout.json";
	$.ajax({
		type : "POST",
		url : url,
		data : "",
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			menu_userinfo_login_fn();
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+","+textStatus+"="+errorThrown);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
			 window.location = hostUrl + "login.html";
		}
	});
}

//userinfo end

//right

function ajax_right_button_handleClick(m,type){
	Queue.push(function(){ajax_right_button_handleClick(m,type)});
	if(m=="add_right"){
		ajax_right_edit({type:type},"add");
	}
};

/**
 * operate=add|edit
 * @param formdata
 * @param operate
 */
function ajax_right_edit(formdata,operate){
	Queue.push(function(){ajax_right_edit(formdata,operate)});
	if(typeof(formdata)=='string')formdata=$.parseJSON(formdata);
	React.render(React.createElement(Right_edit,{formdata:formdata}), document.getElementById('div_body'));
};

function ajax_right_save(){
$.AMUI.progress.start();
	
	  var objectForm = $('#editRightForm').serializeJson();
	  var jsonString=JSON.stringify(objectForm);
      var url = hostUrl + "rest/right/save.json";
	$.ajax({
		type : "POST",
		url : url,
		processData: false, //设置 processData 选项为 false，防止自动转换数据格式。
		data:jsonString,
		dataType : "json",
		contentType : false,  
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				//ajax_right_list(); 
				ADStore.setRightList(objectForm.type,null);
				Queue.doBackFN();
				
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
		}
	});
}

//right end


//role
function menu_role_list_fn() {
	Queue.push(menu_role_list_fn);
	ajax_role_list();
};

var role_list_type=null;
function ajax_role_list(type) {
	Queue.push(function(){ajax_role_list(type)});
	if(type)role_list_type=type;
	else type=role_list_type;
	if(!type)type="0";
	$.AMUI.progress.start();
	var url = hostUrl + "rest/role/list.json?type="+type;
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Role_EventsTable, {
					type:type,
					events: data.list,
					handleClick:ajax_role_button_handleClick,
					responsive: true, bordered: true, striped :true,hover:true,striped:true
					}), document.getElementById('div_body'));
				
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+","+textStatus+"="+errorThrown);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
		}
	});
};


function ajax_role_button_handleClick(m,type,uuids){
	if(m=="add_role"){
		ajax_role_edit({type:type},"add");
	}
};

function btn_ajax_updateRight(roleuuid){
	 var uuids=null;
	 $("input[name='table_checkbox_right']").each(function(){
		if(this.checked){
			 if(uuids==null)uuids=this.value;
			 else uuids+=','+this.value ;    //遍历被选中CheckBox元素的集合 得到Value值
		}
		});
	  if(!uuids){
		  alert("请勾选复选框！");
		  return;
	  }
	  
	$.AMUI.progress.start();
      var url = hostUrl + "rest/role/updateRight.json";
      var opt={
    			type : "POST",
    			url : url,
    			processData: true, //设置 processData 选项为 false，防止自动转换数据格式。
    			dataType : "json",
    			data:{roleuuid:roleuuid,rightuuid:uuids},
    			//contentType : false,  
    			success : function(data) {
    				$.AMUI.progress.done();
    				// 登陆成功直接进入主页
    				if (data.ResMsg.status == "success") {
    				
    					Queue.doBackFN();
    				} else {
    					alert(data.ResMsg.message);
    				}
    			},
    			error : function( obj, textStatus, errorThrown ){
    				$.AMUI.progress.done();
    				alert(url+",error:"+textStatus);
    				 console.log(url+',error：', obj);
    				 console.log(url+',error：', textStatus);
    				 console.log(url+',error：', errorThrown);
    			}
    		};
	$.ajax(opt);
}

/**
 * operate=add|edit
 * @param formdata
 * @param operate
 */
function ajax_role_edit(formdata,operate){
	React.render(React.createElement(Role_edit,{formdata:formdata}), document.getElementById('div_body'));
};
/**
 * operate=add|edit
 * @param formdata
 * @param operate
 */
function ajax_role_bind_right(formdata){
	Queue.push(function(){ajax_role_bind_right(formdata)});
	$.AMUI.progress.start();
	var url = hostUrl + "rest/role/getRight.json?uuid="+formdata.uuid;
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				
				React.render(React.createElement(Role_bind_right, {
					formdata:formdata,
					type:formdata.type,
					events: ADStore.getRightList(formdata.type),
					chooselist: JSON.stringify(data.list),
					responsive: true, bordered: true, striped :true,hover:true,striped:true
					}), document.getElementById('div_body'));
				
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+","+textStatus+"="+errorThrown);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
		}
	});
	
};

function ajax_role_save(){
	
	$.AMUI.progress.start();
	  var objectForm = $('#editRoleForm').serializeJson();
	  var jsonString=JSON.stringify(objectForm);
      var url = hostUrl + "rest/role/save.json";
	$.ajax({
		type : "POST",
		url : url,
		processData: false, //设置 processData 选项为 false，防止自动转换数据格式。
		dataType : "json",
		data:jsonString,
		contentType : false,  
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				ajax_role_list();
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
		}
	});
}

//role end



//basedatatype
function menu_basedatatype_list_fn() {
	Queue.push(menu_basedatatype_list_fn);
	ajax_basedatatype_list();
};

function ajax_basedatatype_list() {
	$.AMUI.progress.start();
	var url = hostUrl + "rest/basedatatype/list.json";
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Basedatatype_EventsTable, {
					events: data.list,
					handleClick:ajax_basedatatype_button_handleClick,
					responsive: true, bordered: true, striped :true,hover:true,striped:true
					}), document.getElementById('div_body'));
				
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+","+textStatus+"="+errorThrown);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
		}
	});
};


function ajax_basedatatype_button_handleClick(m){
	if(m=="add_basedatatype"){
		ajax_basedatatype_edit({},"add");
	}
};

/**
* operate=add|edit
* @param formdata
* @param operate
*/
function ajax_basedatatype_edit(formdata,operate){
	React.render(React.createElement(Basedatatype_edit,{formdata:formdata}), document.getElementById('div_body'));
};

function ajax_basedatatype_save(){
$.AMUI.progress.start();
	
	  var objectForm = $('#editBasedatatypeForm').serializeJson();
	  var jsonString=JSON.stringify(objectForm);
    var url = hostUrl + "rest/basedatatype/save.json";
	$.ajax({
		type : "POST",
		url : url,
		processData: false, //设置 processData 选项为 false，防止自动转换数据格式。
		data:jsonString,
		dataType : "json",
		contentType : false,  
		success : function(data) {
			$.AMUI.progress.done();
			// 登陆成功直接进入主页
			if (data.ResMsg.status == "success") {
				ajax_basedatatype_list();
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+",error:"+textStatus);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
		}
	});
}

/**
 * operate=add|edit
 * @param formdata
 * @param operate
 */
function ajax_basedatatype_bind_basedatalist(formdata){
	Queue.push(function(){ajax_basedatatype_bind_basedatalist(formdata)});
	if(typeof(formdata)=='string')formdata=$.parseJSON(formdata);
	$.AMUI.progress.start();
	var url = hostUrl + "rest/basedatalist/getBaseDataListByTypeuuid.json?typeuuid="+formdata.name;
	$.ajax({
		type : "GET",
		url : url,
		dataType : "json",
		async: false,
		success : function(data) {
			$.AMUI.progress.done();
			if (data.ResMsg.status == "success") {
				React.render(React.createElement(Basedatatype_bind_basedatalist, {
					formdata:formdata,
					events: data.list,
					responsive: true, bordered: true, striped :true,hover:true,striped:true
					}), document.getElementById('div_body'));
				
			} else {
				alert(data.ResMsg.message);
			}
		},
		error : function( obj, textStatus, errorThrown ){
			$.AMUI.progress.done();
			alert(url+","+textStatus+"="+errorThrown);
			 console.log(url+',error：', obj);
			 console.log(url+',error：', textStatus);
			 console.log(url+',error：', errorThrown);
		}
	});
	
};
//basedatatype end

//basedatatypelist

function btn_click_basedatatypelist(m,formdata){
	Queue.push(function(){btn_click_basedatatypelist(m,formdata)});
	if(typeof(formdata)=='string')formdata=$.parseJSON(formdata);
	ajax_basedatatypelist_edit(m,formdata);
};

/**
* operate=add|edit
* @param formdata
* @param operate
*/
function ajax_basedatatypelist_edit(m,formdata){
		React.render(React.createElement(Basedatatypelist_edit,{formdata:formdata}), document.getElementById('div_body'));
		return;
	
	
};

function ajax_basedatatypelist_save(){
	var opt={
	 formName:"editBasedatatypelistForm",
	 url:hostUrl + "rest/basedatalist/save.json",
	 cbFN:null,
	 };
	G_ajax_abs_save(opt);
}
//basedatatypelist end

