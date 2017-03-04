define(['jquery','common','nprogress'], function($,undefined,nprogress) {




	nprogress.done();

	$("#form-add").on("submit", function () {
		$.post('/v6/course/create',$(this).serialize(), function (data) {
			if(data.code==200){
				location.href="/html/course/add_step1.html?cs_id="+data.result.cs_id;
			}
		});
		return false;
	})
});
