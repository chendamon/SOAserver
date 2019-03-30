$().ready(function() {
	$("#login_form").validate({
		rules: {
			username: "required",
			userpass: {
				required: true,
				minlength: 6
			},
		},
		messages: {
			username: "请输入用户名",
			userpass: {
				required: "请输入密码",
				minlength: "密码不能小于6个字符",
			},
		}
	});
	$("#register_form").validate({
		rules: {
			username: {
				required:true,
				legaltest:true,
				minlength:3,
			},
			password: {
				required: true,
				minlength: 6
			},
			rpassword: {
				equalTo: "#password"
			},
			email: {
				required: true,
				email: true
			}
		},
		messages: {
			username: {
				required: "请输入您的用户名",
				legaltest:"用户名不合法",
				minlength:"用户名不能少于3个字符",

			},
      truename:"请输入您的真实姓名",
			password: {
				required: "请输入您的密码",
				minlength: "密码不能小于6个字符",
			},
			rpassword: {
        required:"请确认您的密码",
				equalTo: "密码不一致！",
			}
		}
	});
});
