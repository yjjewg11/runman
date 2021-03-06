
//
var AMUIReact_Table=AMUIReact.Table;
var AMUIReact_ButtonToolbar=AMUIReact.ButtonToolbar;
var AMUIReact_Button=AMUIReact.Button;
var AMUIReact_Sticky=AMUIReact.Sticky;
var AMUIReact_Panel=AMUIReact.Panel;
var AMUIReact_Gallery=AMUIReact.Gallery;



//userinfo reg
var Div_userinfo_reg = React.createClass({displayName: "Div_userinfo_reg", 
	
	render: function() {
	return (
		React.createElement("div", null, 
		React.createElement("div", {className: "header"}, 
		  React.createElement("div", {className: "am-g"}, 
		    React.createElement("h1", null, "老师注册")
		  ), 
		  React.createElement("hr", null)
		), 
		React.createElement("div", {className: "am-g"}, 
		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
		    React.createElement("form", {id: "regform", method: "post", className: "am-form"}, 
		     React.createElement("input", {type: "hidden", name: "type", value: "1"}), 
		    React.createElement("div", {className: "am-form-group"}, 
		    
		    React.createElement("select", {id: "reg_group_uuid", name: "group_uuid", "data-am-selected": "{btnSize: 'sm'}"}, 
		      this.props.group_list.map(function(event) {
		          return (React.createElement("option", {value: event.uuid}, event.company_name));
		        })
		      )
		        ), 
		      
		      React.createElement("label", {htmlFor: "tel"}, "手机号码:"), 
		      React.createElement("input", {type: "text", name: "tel", id: "tel", placeholder: ""}), 
		      React.createElement("br", null), 
		      React.createElement("label", {htmlFor: "name"}, "昵称:"), 
		      React.createElement("input", {type: "text", name: "name", id: "name", placeholder: "必填，不超过15位"}), 
		      React.createElement("br", null), 
		       React.createElement("label", {htmlFor: ""}, "Email:"), 
		      React.createElement("input", {type: "email", name: "email", id: "email", placeholder: "输入邮箱", placeholder: ""}), 
		      React.createElement("br", null), 
		      React.createElement("label", {htmlFor: "password"}, "密码:"), 
		      React.createElement("input", {type: "password", name: "password", id: "password"}), 
		      React.createElement("br", null), 
		      
		      React.createElement("label", {htmlFor: "password1"}, "重复密码:"), 
		      React.createElement("input", {type: "password", name: "password1", id: "password1"}), 
		      React.createElement("br", null), 
		      React.createElement("button", {type: "button", onClick: ajax_userinfo_reg, className: "am-btn am-btn-primary"}, "注册"), 
		      React.createElement("button", {type: "button", onClick: menu_userinfo_login_fn, className: "am-btn am-btn-primary"}, "返回")
		    ), 
		    React.createElement("hr", null)
		  
		  )
		)
		)
	);
	}
}); 

//userinfo reg end

//kd group reg
var Div_kd_group_reg = React.createClass({displayName: "Div_kd_group_reg", 
	
	render: function() {
	return (
		React.createElement("div", null, 
			React.createElement("div", {className: "header"}, 
			  React.createElement("div", {className: "am-g"}, 
			    React.createElement("h1", null, "幼儿园注册")
			  ), 
			  React.createElement("hr", null)
			), 
			React.createElement("div", {className: "am-g"}, 
			  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
			    React.createElement("form", {id: "kd_group_reg_form", method: "post", className: "am-form"}, 
			    React.createElement("input", {type: "hidden", name: "type", value: "1"}), 
			      React.createElement("label", {htmlFor: "brand_name"}, "品牌名:"), 
			      React.createElement("input", {type: "email", name: "brand_name", id: "brand_name", placeholder: "必填，不超过45位"}), 
			      React.createElement("br", null), 
			       React.createElement("label", {htmlFor: "company_name"}, "机构全称:"), 
			      React.createElement("input", {type: "text", name: "company_name", id: "company_name", placeholder: "必填，不超过45位"}), 
			      React.createElement("br", null), 
			       React.createElement("label", {htmlFor: "address"}, "公司地址:"), 
			      React.createElement("input", {type: "text", name: "address", id: "address", placeholder: "必填，不超过64位"}), 
			      React.createElement("br", null), 
			       React.createElement("label", {htmlFor: "map_point"}, "地址坐标:"), 
			      React.createElement("input", {type: "text", name: "map_point", id: "map_point", placeholder: "拾取坐标后，复制到这里。格式：1.1,1.1"}), 
			      React.createElement("a", {href: "http://api.map.baidu.com/lbsapi/getpoint/index.html", target: "_blank"}, "坐标拾取"), 
			      React.createElement("br", null), 
			       React.createElement("label", {htmlFor: "link_tel"}, "公司电话:"), 
			      React.createElement("input", {type: "text", name: "link_tel", id: "link_tel", placeholder: ""}), 
			      React.createElement("br", null), 
			      
			      React.createElement("legend", null, React.createElement("b", null, "管理人员")), 
			     
			      React.createElement("label", {htmlFor: "tel"}, "手机号码:"), 
			      React.createElement("input", {type: "text", name: "tel", id: "tel", placeholder: ""}), 
			      React.createElement("br", null), 
			      React.createElement("label", {htmlFor: "name"}, "昵称:"), 
			      React.createElement("input", {type: "text", name: "name", id: "name", placeholder: "必填，不超过15位"}), 
			      React.createElement("br", null), 
			       React.createElement("label", {htmlFor: ""}, "Email:"), 
			      React.createElement("input", {type: "email", name: "email", id: "email", placeholder: "name@xx.com"}), 
			      React.createElement("br", null), 
			      React.createElement("label", {htmlFor: "password"}, "密码:"), 
			      React.createElement("input", {type: "password", name: "password", id: "password"}), 
			      React.createElement("br", null), 
			      
			      React.createElement("label", {htmlFor: "password1"}, "重复密码:"), 
			      React.createElement("input", {type: "password", name: "password1", id: "password1"}), 
			      React.createElement("br", null), 
			      React.createElement("button", {type: "button", onClick: ajax_kd_group_reg, className: "am-btn am-btn-primary"}, "注册"), 
			      React.createElement("button", {type: "button", onClick: menu_userinfo_login_fn, className: "am-btn am-btn-primary"}, "返回")
			     ), 
			    React.createElement("hr", null)
			  
			  )
			)
		)
	);
	}
}); 

//kd group reg end

//login
var Div_login = React.createClass({displayName: "Div_login", 
	 getInitialState: function() {
		    return this.props;
		  },
	 handleChange: function(event) {
		 var o=$('#login_form').serializeJson();
		 	o.pw_checked=cbox.prop("checked")?"checked":"";
		    this.setState();
	  },
render: function() {
	  var o = this.state;
 return (
 		React.createElement("div", null, 
 		React.createElement("div", {className: "header"}, 
 		  React.createElement("div", {className: "am-g"}, 
 		 React.createElement("h1", null, "PX_老师登录"), 
 	    React.createElement("p", null, "PX Background Management System", React.createElement("br", null), "快捷管理，大数据分析")
 		  ), 
 		  React.createElement("hr", null)
 		), 
 		React.createElement("div", {className: "am-g"}, 
 		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
 		 React.createElement("form", {id: "login_form", method: "post", className: "am-form"}, 
 	      React.createElement("label", {htmlFor: "loginname"}, "手机号:"), 
 	      React.createElement("input", {type: "email", name: "loginname", id: "loginname", value: o.loginname, onChange: this.handleChange}), 
 	      React.createElement("br", null), 
 	      React.createElement("label", {htmlFor: "password"}, "密码:"), 
 	      React.createElement("input", {type: "password", name: "password", id: "password", value: o.password, onChange: this.handleChange}), 
 	      React.createElement("br", null), 
 	      React.createElement("label", {htmlFor: "pw_checked"}, 
 	        React.createElement("input", {id: "pw_checked", name: "pw_checked", type: "checkbox", checked: o.pw_checked=="checked"?"checked":"", onChange: this.handleChange}), 
 	        "记住密码"
 	      ), 
 	      React.createElement("br", null), 
 	      React.createElement("div", {className: "am-cf"}, 
 	        React.createElement("input", {id: "btn_login", onClick: ajax_userinfo_login, type: "button", name: "", value: "登 录", className: "am-btn am-btn-primary am-btn-sm am-fl"}), 
 	        React.createElement("input", {type: "button", name: "", value: "忘记密码 ^_^? ", className: "am-btn am-btn-default am-btn-sm am-fr"})
 	      ), 
 	      React.createElement("a", {href: "javascript:menu_kd_group_reg_fn();"}, "幼儿园注册"), "|", 
 	      React.createElement("a", {href: "javascript:void();"}, "培训机构注册"), 
 	      React.createElement("br", null), 
 			React.createElement("a", {href: "javascript:menu_userinfo_reg_fn();"}, "老师注册")
 	    ), 
 	    React.createElement("hr", null), 
 	    React.createElement("p", null, "© 2015 PX, Inc. ")

 	     )
 	   )
 	   
 	   )
 );
}
}); 

//end login


//group
var Group_EventRow = React.createClass({displayName: "Group_EventRow", 
  render: function() {
    var event = this.props.event;
    var className = event.highlight ? 'am-active' :
      event.disabled ? 'am-disabled' : '';

    return (
      React.createElement("tr", {className: className}, 
      React.createElement("td", null, 
      React.createElement("input", {type: "checkbox", value: event.uuid, name: "table_checkbox"})
      ), 
      React.createElement("td", {onClick: ajax_group_edit.bind(this,event)}, event.brand_name), 
        React.createElement("td", {onClick: ajax_group_edit.bind(this,event)}, event.company_name), 
        React.createElement("td", {onClick: ajax_group_edit.bind(this,event)}, " ", event.link_tel), 
        React.createElement("td", {onClick: ajax_group_edit.bind(this,event)}, event.address), 
        React.createElement("td", {onClick: ajax_group_edit.bind(this,event)}, event.create_time)
      ) 
    );
  }
}); 

var Group_EventsTable = React.createClass({displayName: "Group_EventsTable",
	handleClick: function(m) {
		 if(this.props.handleClick){
			 this.props.handleClick(m);
		 }
	  },
	  handleChange_checkbox_all:function(){
		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
	  },
  render: function() {
    return (
    React.createElement("div", null, 
    React.createElement(AMUIReact_Sticky, null, 
    React.createElement(AMUIReact_ButtonToolbar, null, 
	    React.createElement(AMUIReact_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "add_group"), round: true}, "添加分校")
	  )
	 ), 
	  React.createElement("hr", null), 
      React.createElement(AMUIReact_Table, React.__spread({},  this.props), 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
          React.createElement("th", null, 
          React.createElement("input", {type: "checkbox", id: "id_checkbox_all", onChange: this.handleChange_checkbox_all})
          ), 
            React.createElement("th", null, "品牌名"), 
            React.createElement("th", null, "机构全称"), 
            React.createElement("th", null, "电话"), 
            React.createElement("th", null, "公司地址"), 
            React.createElement("th", null, "创建时间")
          )
        ), 
        React.createElement("tbody", null, 
          this.props.events.map(function(event) {
            return (React.createElement(Group_EventRow, {key: event.id, event: event}));
          })
        )
      )
      )
    );
  }
});
    
var Group_edit = React.createClass({displayName: "Group_edit", 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editGroupForm').serializeJson());
	  },
  render: function() {
	  var o = this.state;
    return (
    		React.createElement("div", null, 
    		React.createElement("div", {className: "header"}, 
    		  React.createElement("div", {className: "am-g"}, 
    		    React.createElement("h1", null, "编辑")
    		  ), 
    		  React.createElement("hr", null)
    		), 
    		React.createElement("div", {className: "am-g"}, 
    		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
    		  
    		React.createElement("form", {id: "editGroupForm", method: "post", className: "am-form"}, 
    		React.createElement("input", {type: "hidden", name: "uuid", value: o.uuid}), 
    	    React.createElement("input", {type: "hidden", name: "type", value: o.type}), 
    	      React.createElement("label", {htmlFor: "brand_name"}, "品牌名:"), 
    	      React.createElement("input", {type: "email", name: "brand_name", id: "brand_name", value: o.brand_name, onChange: this.handleChange, placeholder: "不超过45位"}), 
    	      React.createElement("br", null), 
    	       React.createElement("label", {htmlFor: "company_name"}, "机构全称:"), 
    	      React.createElement("input", {type: "text", name: "company_name", id: "company_name", value: o.company_name, onChange: this.handleChange, placeholder: "不超过45位"}), 
    	      React.createElement("br", null), 
    	       React.createElement("label", {htmlFor: "address"}, "公司地址:"), 
    	      React.createElement("input", {type: "text", name: "address", id: "address", value: o.address, onChange: this.handleChange, placeholder: "不超过64位"}), 
    	      React.createElement("br", null), 
    	       React.createElement("label", {htmlFor: "map_point"}, "地址坐标:"), 
    	      React.createElement("input", {type: "text", name: "map_point", id: "map_point", value: o.map_point, onChange: this.handleChange, placeholder: "拾取坐标后，复制到这里。格式：1.1,1.1"}), 
    	      React.createElement("a", {href: "http://api.map.baidu.com/lbsapi/getpoint/index.html", target: "_blank"}, "坐标拾取"), 
    	      React.createElement("br", null), 
    	       React.createElement("label", {htmlFor: "link_tel"}, "公司电话:"), 
    	      React.createElement("input", {type: "text", name: "link_tel", id: "link_tel", value: o.link_tel, onChange: this.handleChange, placeholder: ""}), 
    	      React.createElement("br", null), 
    	      React.createElement("button", {type: "button", onClick: ajax_group_save, className: "am-btn am-btn-primary"}, "提交")
    	     )

    	     )
    	   )
    	   
    	   )
    );
  }
}); 

//userinfo
/**
 * ajax_userinfo_edit
 */

var Userinfo_EventRow = React.createClass({displayName: "Userinfo_EventRow", 
  render: function() {
    var event = this.props.event;
    var className = event.highlight ? 'am-active' :
      event.disabled ? 'am-disabled' : '';

    return (
      React.createElement("tr", {className: className}, 
      React.createElement("td", null, 
      React.createElement("input", {type: "checkbox", value: event.uuid, name: "table_checkbox"})
      ), 
        React.createElement("td", null, event.loginname), 
        React.createElement("td", null, event.name), 
        React.createElement("td", null, event.tel), 
        React.createElement("td", null, event.email), 
        React.createElement("td", null, event.sex=="0"?"男":"女"), 
        React.createElement("td", {className: "px_disable_"+event.disable}, event.disable=="1"?"禁用":"正常"), 
        React.createElement("td", null, event.login_time), 
        React.createElement("td", null, event.create_time)
      ) 
    );
  }
}); 

var Userinfo_EventsTable = React.createClass({displayName: "Userinfo_EventsTable",
	handleClick: function(m) {
		 if(this.props.handleClick){
			 if(m=="add_userinfo"){
				 this.props.handleClick(m,$('#selectgroup_uuid').val());
				 return;
			 }
			 var uuids=null;
			 $($("input[name='table_checkbox']")).each(function(){
				　if(this.checked){
					 if(uuids==null)uuids=this.value;
					 else
					　uuids+=','+this.value ;    //遍历被选中CheckBox元素的集合 得到Value值
				　}
				});
			  if(!uuids){
				  alert("请勾选复选框！");
				  return;
			  }
			  
			 this.props.handleClick(m,$('#selectgroup_uuid').val(),uuids);
		 }
	  },
	  handleChange_checkbox_all:function(){
		  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
	  },
	  //
	  handleChange_selectgroup_uuid:function(){
		  ajax_uesrinfo_listByGroup($('#selectgroup_uuid').val());
	  },
  render: function() {
    return (
    React.createElement("div", null, 
    React.createElement(AMUIReact_Sticky, null, 
    React.createElement(AMUIReact_ButtonToolbar, null, 
	    React.createElement(AMUIReact_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "add_userinfo"), round: true}, "添加老师"), 
	    React.createElement(AMUIReact_Button, {amStyle: "success", onClick: this.handleClick.bind(this, "add_enable"), round: true}, "启用"), 
	    React.createElement(AMUIReact_Button, {amStyle: "danger", onClick: this.handleClick.bind(this, "add_disable"), round: true}, "禁用"), 
	    React.createElement(AMUIReact_Button, {amStyle: "success", onClick: this.handleClick.bind(this, "add_enable"), round: true}, "分配权限")
	    )
	), 
	  React.createElement("hr", null), 
	  React.createElement("div", {className: "am-form-group"}, 
      React.createElement("select", {id: "selectgroup_uuid", name: "group_uuid", "data-am-selected": "{btnSize: 'sm'}", value: this.props.group_uuid, onChange: this.handleChange_selectgroup_uuid}, 
      this.props.group_list.map(function(event) {
          return (React.createElement("option", {value: event.uuid}, event.company_name));
        })
      )
    ), 
	  
      React.createElement(AMUIReact_Table, React.__spread({},  this.props), 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
          	React.createElement("th", null, 
            React.createElement("input", {type: "checkbox", id: "id_checkbox_all", onChange: this.handleChange_checkbox_all})
            ), 
            React.createElement("th", null, "帐号"), 
            React.createElement("th", null, "昵称"), 
            React.createElement("th", null, "电话"), 
            React.createElement("th", null, "邮箱"), 
            React.createElement("th", null, "性别"), 
            React.createElement("th", null, "状态"), 
            React.createElement("th", null, "登录时间"), 
            React.createElement("th", null, "创建时间")
          )
        ), 
        React.createElement("tbody", null, 
          this.props.events.map(function(event) {
            return (React.createElement(Userinfo_EventRow, {key: event.id, event: event}));
          })
        )
      )
      )
    );
  }
});
    
var Userinfo_edit = React.createClass({displayName: "Userinfo_edit", 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editUserinfoForm').serializeJson());
	  },
  render: function() {
	  var o = this.state;
    return (
    		React.createElement("div", null, 
    		React.createElement("div", {className: "header"}, 
    		  React.createElement("div", {className: "am-g"}, 
    		    React.createElement("h1", null, "编辑")
    		  ), 
    		  React.createElement("hr", null)
    		), 
    		React.createElement("div", {className: "am-g"}, 
    		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
    		  React.createElement("form", {id: "editUserinfoForm", method: "post", className: "am-form"}, 
    		     React.createElement("input", {type: "hidden", name: "type", value: "1"}), 
    		    React.createElement("div", {className: "am-form-group"}, 
    		          React.createElement("select", {id: "group_uuid", name: "group_uuid", "data-am-selected": "{btnSize: 'sm'}", value: o.group_uuid, onChange: this.handleChange}, 
    		          this.props.group_uuid_data.map(function(event) {
    		              return (React.createElement("option", {value: event.uuid}, event.company_name));
    		            })
    		          )
    		        ), 
    		      React.createElement("label", {htmlFor: "tel"}, "手机号码:"), 
    		      React.createElement("input", {type: "text", name: "tel", id: "tel", value: o.tel, onChange: this.handleChange, placeholder: ""}), 
    		      React.createElement("br", null), 
    		      React.createElement("label", {htmlFor: "name"}, "昵称:"), 
    		      React.createElement("input", {type: "text", name: "name", id: "name", value: o.name, onChange: this.handleChange, placeholder: "不超过15位"}), 
    		      React.createElement("br", null), 
    		       React.createElement("label", {htmlFor: ""}, "Email:"), 
    		      React.createElement("input", {type: "email", name: "email", id: "email", value: o.email, onChange: this.handleChange, placeholder: "输入邮箱", placeholder: ""}), 
    		      React.createElement("br", null), 
    		      React.createElement("label", {htmlFor: "password"}, "密码:"), 
    		      React.createElement("input", {type: "password", name: "password", id: "password", value: o.password, onChange: this.handleChange}), 
    		      React.createElement("br", null), 
    		      
    		      React.createElement("label", {htmlFor: "password1"}, "重复密码:"), 
    		      React.createElement("input", {type: "password", name: "password1", id: "password1", value: o.password1, onChange: this.handleChange}), 
    		      React.createElement("br", null), 
    		      React.createElement("button", {type: "button", onClick: ajax_userinfo_save, className: "am-btn am-btn-primary"}, "提交")
    		    )

    	     )
    	   )
    	   
    	   )
    );
  }
}); 
//end userinfo




//class

var Class_EventRow = React.createClass({displayName: "Class_EventRow", 
render: function() {
  var event = this.props.event;
  var className = event.highlight ? 'am-active' :
    event.disabled ? 'am-disabled' : '';

  return (
    React.createElement("tr", {className: className}, 
    React.createElement("td", null, 
    React.createElement("input", {type: "checkbox", value: event.uuid, name: "table_checkbox"})
    ), 
      React.createElement("td", null, React.createElement("a", {herf: "javascript:react_ajax_class_students_manage("+event.uuid+")"}, event.name)), 
      React.createElement("td", null, event.createUser), 
      React.createElement("td", null, Store.getGroupNameByUuid(event.groupuuid)), 
      React.createElement("td", null, event.create_time)
    ) 
  );
}
}); 
var Class_EventsTable = React.createClass({displayName: "Class_EventsTable",
render: function() {
  return (
  React.createElement("div", null, 
  React.createElement(AMUIReact_Sticky, null, 
  React.createElement(AMUIReact_ButtonToolbar, null, 
	    React.createElement(AMUIReact_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "add_class"), round: true}, "添加班级"), 
	    React.createElement(AMUIReact_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "edit_class"), round: true}, "编辑"), 
	    React.createElement(AMUIReact_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "graduate_class"), round: true}, "毕业")
	  )
	  ), 
	  React.createElement("hr", null), 
	  React.createElement("div", {className: "am-form-group"}, 
    React.createElement("select", {id: "selectgroup_uuid", name: "group_uuid", "data-am-selected": "{btnSize: 'sm'}", value: this.props.group_uuid, onChange: this.handleChange_selectgroup_uuid}, 
    this.props.group_list.map(function(event) {
        return (React.createElement("option", {value: event.uuid}, event.company_name));
      })
    )
  ), 
	  
    React.createElement(AMUIReact_Table, React.__spread({},  this.props), 
      React.createElement("thead", null, 
        React.createElement("tr", null, 
        	React.createElement("th", null, 
          React.createElement("input", {type: "checkbox", id: "id_checkbox_all", onChange: this.handleChange_checkbox_all})
          ), 
          React.createElement("th", null, "班级"), 
          React.createElement("th", null, "创建人"), 
          React.createElement("th", null, "学校"), 
          React.createElement("th", null, "创建时间")
        )
      ), 
      React.createElement("tbody", null, 
        this.props.events.map(function(event) {
          return (React.createElement(Class_EventRow, {key: event.id, event: event}));
        })
      )
    )
    )
  );
},
handleClick: function(m) {
	 if(this.props.handleClick){
		 
		 if(m=="add_class"){
			 this.props.handleClick(m,$('#selectgroup_uuid').val());
			 return;
		 }
		 var uuids=null;
		 $($("input[name='table_checkbox']")).each(function(){
			
			　if(this.checked){
				 if(uuids==null)uuids=this.value;
				 else
				　uuids+=','+this.value ;    //遍历被选中CheckBox元素的集合 得到Value值
			　}
			});
		  if(!uuids){
			  alert("请勾选复选框！");
			  return;
		  }
		  
		 this.props.handleClick(m,$('#selectgroup_uuid').val(),uuids);
	 }
 },
 handleChange_checkbox_all:function(){
	  $('input[name="table_checkbox"]').prop("checked", $("#id_checkbox_all")[0].checked); 
 },
 //
 handleChange_selectgroup_uuid:function(){
	  ajax_class_listByGroup($('#selectgroup_uuid').val());
 }
});
  
var Class_edit = React.createClass({displayName: "Class_edit", 
	 getInitialState: function() {
		    return this.props.formdata;
		  },
	 handleChange: function(event) {
		    this.setState($('#editClassForm').serializeJson());
	  },
render: function() {
	  var o = this.state;
  return (
  		React.createElement("div", null, 
  		React.createElement("div", {className: "header"}, 
  		  React.createElement("div", {className: "am-g"}, 
  		    React.createElement("h1", null, "编辑")
  		  ), 
  		  React.createElement("hr", null)
  		), 
  		React.createElement("div", {className: "am-g"}, 
  		  React.createElement("div", {className: "am-u-lg-6 am-u-md-8 am-u-sm-centered"}, 
  		  React.createElement("form", {id: "editClassForm", method: "post", className: "am-form"}, 
  		     React.createElement("input", {type: "hidden", name: "type", value: "1"}), 
  		    React.createElement("div", {className: "am-form-group"}, 
  		          React.createElement("select", {id: "groupuuid", name: "groupuuid", "data-am-selected": "{btnSize: 'sm'}", value: o.groupuuid, onChange: this.handleChange}, 
  		          this.props.group_uuid_data.map(function(event) {
  		              return (React.createElement("option", {value: event.uuid}, event.company_name));
  		            })
  		          )
  		        ), 
  		    
  		      React.createElement("label", {htmlFor: "name"}, "班级:"), 
  		      React.createElement("input", {type: "text", name: "name", id: "name", value: o.name, onChange: this.handleChange, placeholder: "不超过45位！"}), 
  		      React.createElement("br", null), 
  		   
		      React.createElement("label", {htmlFor: "name"}, "班主任:"), 
	  		    React.createElement("input", {type: "hidden", name: "headTeacher", id: "headTeacher", value: o.headTeacher, onChange: this.handleChange}), 
			      React.createElement("input", {type: "text", id: "headTeacher_name", value: o.headTeacher_name, onChange: this.handleChange, onClick: w_ch_user.open.bind(this,"headTeacher","headTeacher_name",$('#selectgroup_uuid').val()), placeholder: ""}), 
			      React.createElement("br", null), 
			      React.createElement("label", {htmlFor: "name"}, "其他老师:"), 
		  		    React.createElement("input", {type: "hidden", name: "teacher", id: "teacher", value: o.teacher, onChange: this.handleChange}), 
				      React.createElement("input", {type: "text", id: "teacher_name", value: o.teacher_name, onChange: this.handleChange, onClick: w_ch_user.open.bind(this,"teacher","teacher_name",$('#selectgroup_uuid').val()), placeholder: ""}), 
				      React.createElement("br", null), 
  		      React.createElement("button", {type: "button", onClick: ajax_class_save, className: "am-btn am-btn-primary"}, "提交")
  		    )

  	     )
  	   )
  	   
  	   )
  );
}
}); 




var Class_students_manage = React.createClass({displayName: "Class_students_manage",
	render: function() {
	  return (
	  React.createElement("div", null, 
	  React.createElement(AMUIReact_Sticky, null, 
	  React.createElement(AMUIReact_ButtonToolbar, null, 
		    React.createElement(AMUIReact_Button, {amStyle: "primary", onClick: this.handleClick.bind(this, "add_class"), round: true}, "添加学生")
		  )
		  ), 
		  React.createElement("hr", null), 
		  React.createElement(AMUIReact_Panel, null, 
		  "班级:", o.name, ",班主任:", o.headTeacher_name, ",其他老师:", o.teacher_name
		  ), 
		  React.createElement(AMUIReact_, {data: o.students})
	    )
	  );
	}
	});
//end class
