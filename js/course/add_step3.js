define(['jquery','common','nprogress',"util","template","uploadify"], function($,undefined,nprogress,util,template,uploadify) {




	nprogress.done();
	var csid=util.getQueryString("cs_id");


	$.get("/v6/course/lesson",{cs_id:csid}, function (data) {
		if(data.code==200){
			$(".steps").html(template("form-step3",data.result));
		}
	})



	$(document).on("click", "#lesson-add",function () {
		$("#chapterModal").modal();
	})

	$(document).on("click", "#lesson-edit",function () {
		$("#chapterModal").modal();

	})
});
