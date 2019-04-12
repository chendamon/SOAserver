$(function(){
	//注册时用户名只能包含字母数字，且开头为字母
	jQuery.validator.addMethod("legaltest_name",function(value,element){
		return /^[A-Za-z]+[A-Za-z0-9]+$/.test(value);
		},"用户名只能包含字母及数字！");
	//注册时用户真实姓名只能包含汉字或字母，且开头为汉字
	jQuery.validator.addMethod("legaltest_truename",function(value,element){
		return /^[\u4e00-\u9fa5]+[A-Za-z]*$/.test(value);
		},"用户名只能包含字母及数字！");
		jQuery.validator.addMethod("legaltest_password",function(value,element){
			return /^[A-Za-z0-9!@#$_]*$/.test(value);
			},"用户名只能包含字母及数字！");
	//更改密码时新旧密码不能相同
	jQuery.validator.addMethod("notEqual",function(value,element,param){
		return value != $(param).val();
	},"不能相同");
	jQuery.validator.addMethod("legaltest_clientname",function(value,element,param){
		return  /^[\u4e00-\u9fa5]*[A-Za-z]*$/.test(value);
	},"something");
	//(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?
	//是否为URL
	jQuery.validator.addMethod("legaltest_url",function(value,element,param){
		return  /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(value);
	},"something");
});
