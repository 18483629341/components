/*前端验证*/
let postObj = {
	user: "",
	password: "",
	isSave: null
}

$(function () {
	autoFit();
})
window.onresize = function () {
	autoFit();
}
/**  当点击登录按钮  或 按enter 键时   */
$('body').on('click', '#login', function () {
	postFun()
})
$("body").keydown(function (e) {
	var e = window.event ? window.event : e;    
	var keyCode = e.which ? e.which : e.keyCode;     
	if (keyCode == 13) { //按下的键盘序号为13，即为‘enter’键时     	
		postFun()   
	}  
});

function postFun(){
	var flag = valid();
	if (flag) { //如果flag为true，则发送信息
		console.log('表单验证通过', postObj);
		// $.post('url',{info:postObj},function(data){//！！！！！这里需要后台添加
		//})
	}
}
function valid() { //格式验证，以及获取输入框信息

	/*   获取输入框信息   */
	let user = trim($('input[name="userName"]').val()) || null;
	let password = trim($('input[name="password"]').val()) || null;
	let isSave = $('.checkBox').hasClass('active');
	let userFlag = true; //表示用户名的前端验证是否通过
	let passFlag = true; //表示密码的前端验证是否通过
	/*   前端  格式验证用户名   */
	if (!user) {
		$('.user').addClass('error');
		$('.user').siblings('.helpBolck').addClass('error');
		$('.user').siblings('.helpBolck').html('输入的用户名不能为空哦！');
		userFlag = false;
	} else {
		$('.user').removeClass('error');
		$('.user').siblings('.helpBolck').removeClass('error');
		userFlag = true;
		postObj.user = user;
	}

	/*   前端验证密码   */
	if (!password) {
		$('.password').addClass('error');
		$('.password').siblings('.helpBolck').addClass('error');
		$('.password').siblings('.helpBolck').html('输入的密码不能为空哦！');
		passFlag = false;
	} else {
		$('.password').removeClass('error');
		$('.password').siblings('.helpBolck').removeClass('error');
		passFlag = true;
		postObj.password = password;
	}
	postObj.isSave = isSave;
	return (userFlag && passFlag);
}
$('body').on('click', '.checkBox', function () {
	$(this).toggleClass('active');
})
$('body').on('mouseover', '.inputP', function () {
	$(this).removeClass('error');
	$(this).siblings('.helpBolck').removeClass('error');
})
/** 去除首尾的空格 **/
function trim(str) {
	return str.replace(/^[' '||' ']*/i, '').replace(/[' '||'  ']$/i, ''); //去除首尾的空格
}
/** 判断是否为邮箱地址 **/

function isEmail(emailStr) {
	var reg = /^[a-zA-Z0-9]+([._-]*[a-zA-Z0-9]*)*@[a-zA-Z0-9]+.[a-zA-Z0-9]{2,5}$/;
	return reg.test(emailStr);
}
//isEmail('714402934@qq.com')

/** 判断是否为手机 **/

function isPhone(phone) {
	var reg = /^1\d{10}$/;
	return reg.test(phone);
}
//isPhone(18483629341);
var swidth = null;
var W = null;
//header部分里面的所有元素的宽高全自适应方法

function autoFit() {
	swidth = $(window).width();
	if (swidth > 1320 || swidth === 1320) {
		resize();
	}
}

//部分模块等比缩放


function resize() {
	var winratio = $(window).width() / 1920;
	var height = $(window).height();
	//console.log(winratio);
    if(winratio<1){
		$('.header').css({
			height:150*winratio + "px"
		});
		$('.main').css({
			height:529*winratio + "px",
		});
		$('.footer').css({
			height:150*winratio + "px",
			lineHeight:150*winratio-2 + "px"
		});
		$('.headerMain').css({
			transform: "scale(" + winratio + ")",
			transformOrigin: "left top",
			height:150*winratio + "px"
		});
		$('.login_content').css({
		  transform: "scale("+winratio+")",
		  transformOrigin: "right center"
		});
		$('.themeBox').css({
			transform: "scale("+winratio+")",
			transformOrigin: "left center"
		});
	}
	
	
	
	
}