$().ready(function() {
	$("#login_form").validate({
		rules: {
			username: "required",
			password: {
				required: true,
				minlength: 6,
				maxlength:12,
			},
		},
		messages: {
			username: "请输入用户名",
			password: {
				required: "请输入密码",
				minlength: "密码不能小于6个字符",
				maxlength: "密码不能多于12个字符",
			},
		}
	});
	$("#passwd_form").validate({
		rules:{
			oldPassword: {
				required: true,
				legaltest_password:true,
				minlength: 6,
				maxlength:12,
			},
			newPassword: {
				required: true,
				legaltest_password:true,
				minlength: 6,
				maxlength:12,
				notEqual:"#oldPassword",
			},
			newrPassword:{
				required:true,
				equalTo: "#newPassword"
			}
		},
		messages:{
			oldPassword:{
				required: "请输入您的原始密码",
				minlength: "密码不能小于6个字符",
				maxlength: "密码不能多于12个字符",
				legaltest_password:"密码不合法",
			},
			newPassword:{
				required: "请输入您的新密码",
				minlength: "密码不能小于6个字符",
				maxlength: "密码不能多于12个字符",
				legaltest_password:"密码不合法",
				notEqual:"新密码不能与原始密码相同",
			},
			newrPassword:{
				required:"请确认您的密码",
				equalTo: "密码不一致",
			}
		}

	});
	$("#client_add_form").validate({
		rules:{
			clientid:{
				required:true,
				minlength:3,
				maxlength:12,
				legaltest_name:true,
			},
			clientname:{
				required:true,
				minlength:3,
				maxlength:12,
				legaltest_clientname:true,
			},
			clienturl:{
				required:true,
				legaltest_url:true,
			},
			redirecturl:{
				required:true,
				legaltest_url:true,
			},
			clientsecret:{
				required:true,
				minlength:10,
				maxlength:20,
				legaltest_password:true,
			},
			rsecret:{
				required:true,
				equalTo:"#password",
			}
		},
		messages:{
			clientid:{
				required:"请输入客户端ID",
				minlength:"客户端ID不能少于3个字符",
				maxlength:"客户端ID不能多于12个字符",
				legaltest_name:"客户端ID不合法",
			},
			clientname:{
				required:"请输入客户端名称",
				minlength:"客户端名称不能少于3个字符",
				maxlength:"客户端名称不能多于12个字符",
				legaltest_clientname:"客户端名称不合法",
			},
			clienturl:{
				required:"请输入客户端URL",
				legaltest_url:"客户端URL不合法",
			},
			redirecturl:{
				required:"请输入重定向URL",
				legaltest_url:"重定向URL不合法",
			},
			clientsecret:{
				required:"请输入客户端秘钥",
				minlength:"客户端秘钥不能少于10个字符",
				maxlength:"客户端秘钥不能多于20个字符",
				legaltest_password:"客户端秘钥不合法",
			},
			rsecret:{
				required:"请确认客户端秘钥",
				equalTo:"秘钥不一致",
			}
		}
	});
	$("#register_form").validate({
		rules: {
			username: {
				required:true,
				minlength:3,
				maxlength:12,
				legaltest_name:true,
			},
			truename:{
				required:true,
				legaltest_truename:true,
				minlength:2,
				maxlength:12,
			},
			password: {
				required: true,
				legaltest_password:true,
				minlength: 6,
				maxlength:12,
			},
			rpassword: {
				required:true,
				equalTo: "#password"
			},
		},
		messages: {
			username: {
				required: "请输入您的用户名",
				minlength:"用户名不能少于3个字符",
				legaltest_name:"用户名不合法",
				minlength: "用户名不能小于3个字符",
				maxlength: "用户名不能多于12个字符",
			},
      truename:{
				required: "请输入您的真实姓名",
				legaltest_truename:"真实姓名不合法",
				minlength: "真实姓名不能小于2个字符",
				maxlength: "真实姓名不能多于12个字符",
			},
			password: {
				required: "请输入您的密码",
				minlength: "密码不能小于6个字符",
				maxlength: "密码不能多于12个字符",
				legaltest_password:"密码不合法",
			},
			rpassword: {
        required:"请确认您的密码",
				equalTo: "密码不一致",
			}
		}
	});
});
