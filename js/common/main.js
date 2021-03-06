requirejs.config({
	baseUrl: '/',
	paths: {
		
		// 第三方库的路径配置
		jquery: 'lib/jquery/jquery.min',
		bootstrap: 'lib/bootstrap/js/bootstrap.min',
		jqueryCookie:'lib/jquery-cookie/jquery.cookie',
		nprogress:'lib/nprogress/nprogress',
		template:'lib/artTemplate/template',
		datepicker:'lib/bootstrap-datepicker/js/bootstrap-datepicker',
		datepickerZhCN:'lib/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
		region:"lib/region/jquery.region",
		ckeditor:"lib/ckeditor/ckeditor",
		echarts:"lib/echarts/echarts.min",
		uploadify: 'lib/uploadify/jquery.uploadify',
		// 自己写的路径配置

		advertAdd:'js/advert/add',
		advertList:'js/advert/list',

		courseAdd: 'js/course/add',
		courseAdd_step1: 'js/course/add_step1',
		courseAdd_step2: 'js/course/add_step2',
		courseAdd_step3: 'js/course/add_step3',
		courseCategory: 'js/course/category',
		courseCategory_add: 'js/course/category_add',
		courseList: 'js/course/list',
		courseTopic: 'js/course/topic',

		homeLogin: 'js/home/login',
		homeRepass: 'js/home/repass',
		homeSettings: 'js/home/settings',

		teacherAdd: 'js/teacher/add',
		teacherList: 'js/teacher/list',

		userList: 'js/user/list',
		userProfile: 'js/user/profile',

		common: 'js/common/common',
		util: 'js/common/util',
		index:'js/index'
	},
	shim: {
		bootstrap: {
			deps: ['jquery']
		},
		datepickerZhCN:{
			deps: ['jquery','datepicker']
		},
		ckeditor:{
			exports:'CKEDITOR'
		},
		uploadify:{
			deps: ['jquery']
		}
	}
});

require(['nprogress'], function (nprogress) {
	nprogress.start();
})

// 所有的页面都需要这两个js，先加载他们。
require(['jquery', 'bootstrap','common']);

/*
 *这里获取页面的pathname，然后对应的加载js。
 * */
(function(window) {
	var pathname = window.location.pathname;

	//登陆页
	//没有SESSID，不用管
	//有SESSID，跳转到首页
	//
	//其它页
	//没有SESSID，跳转到登陆页
	//有SESSID，不用管
	require(['jquery','jqueryCookie'], function ($,undefined) {
		var sessionID= $.cookie("PHPSESSID");
		if(pathname === "/html/home/login.html" && sessionID){
			location.href="/";
		}else if(pathname !== "/html/home/login.html" && !sessionID){
			location.href="/html/home/login.html";
		}

		switch(pathname) {
			case '/html/advert/add.html':
				require(['advertAdd']);
				break;
			case '/html/advert/list.html':
				require(['advertList']);
				break;
			case '/html/course/add.html':
				require(['courseAdd']);
				break;
			case '/html/course/add_step1.html':
				require(['courseAdd_step1']);
				break;
			case '/html/course/add_step2.html':
				require(['courseAdd_step2']);
				break;
			case '/html/course/add_step3.html':
				require(['courseAdd_step3']);
				break;
			case '/html/course/category.html':
				require(['courseCategory']);
				break;
			case '/html/course/category_add.html':
				require(['courseCategory_add']);
				break;
			case '/html/course/list.html':
				require(['courseList']);
				break;
			case '/html/course/topic.html':
				require(['courseTopic']);
				break;
			case '/html/home/login.html':
				require(['homeLogin']);
				break;
			case '/html/home/repass.html':
				require(['homeRepass']);
				break;
			case '/html/home/settings.html':
				require(['homeSettings']);
				break;
			case '/html/teacher/add.html':
				require(['teacherAdd']);
				break;
			case '/html/teacher/list.html':
				require(['teacherList']);
				break;
			case '/html/user/list.html':
				require(['userList']);
				break;
			case '/html/user/profile.html':
				require(['userProfile']);
				break;
			case '/':
				require(['index']);
				break;
		}

	});


})(window);
