define(['jquery','common','nprogress','template'], function($,undefined,nprogress,template) {

	nprogress.done();


	//讲师列表模版请求
	$.get("/v6/teacher", function (data) {
		if(data.code==200){
			$("#teacher-list-tbody").html(template("teacher_list",{list:data.result}));
		}
	});

	$("#teacher-list-tbody").on("click",".teacher-view", function () {
		$.get("/v6/teacher/view",{tc_id:$(this).parent().attr("data-id")}, function (data) {
			if(data.code==200){
				$("#teacherModal").html(template("teacher_view",data.result));
			}
		})


	})

});

