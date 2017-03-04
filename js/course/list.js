define(['jquery','common','nprogress','template'], function($,undefined,nprogress,template) {




	nprogress.done();

	$.get("/v6/course", function (data) {
		if(data.code==200){
			$(".courses").append(template('course-tpl',{list:data.result}));
		}
	});
});
