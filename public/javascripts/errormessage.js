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
				minlength: "密码不能多于12个字符",
			},
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
