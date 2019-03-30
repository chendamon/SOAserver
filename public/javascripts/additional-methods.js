
$.validator.addMethod("legaltest",function(value,element){
	var regex = /^[a-zA-Z]+[a-zA-Z0-9]+$/;
  if(regex.test(value))
    return true;
  else return false;
	//return this.optional(element)||(regex.test(value));
},"用户名只能包含字母及数字");
//判断注册用户名是否已经存在
// $.validator.addMethod("alreExit",function(value,element){
// 	User.getByName(value,(err,user)=>{
// 		if(user == null)
// 			return true;
// 		else return false;
// 	});
// 	//return this.optional(element)||(regex.test(value));
// },"用户名已存在");
