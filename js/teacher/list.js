define(['jquery','common','nprogress','template'], function($,undefined,nprogress,template) {

	nprogress.done();


	//讲师列表数据缓存
	var teacher=null;

	try{
		teacher=JSON.parse(localStorage.getItem('teacher'));
	}catch(e){}

	//讲师列表请求
	if(teacher){
		$("#teacher-list-tbody").html(template("teacher_list",{list:teacher}));
	}else{
		$.get("/v6/teacher",function (data) {
			if(data.code==200){

				localStorage.setItem('teacher',JSON.stringify(data.result));
				$("#teacher-list-tbody").html(template("teacher_list",{list:data.result}));
			}
		});
	}



	//讲师信息请求
	$("#teacher-list-tbody").on("click",".teacher-view", function () {
		$.get("/v6/teacher/view",{tc_id:$(this).parent().attr("data-id")}, function (data) {
			if(data.code==200){
				$("#teacherModal").html(template("teacher_view",data.result));
			}
		})

	})

	//讲师状态请求
	$("#teacher-list-tbody").on("click",".teacher-status", function () {
		var _this=$(this);
		$.ajax({
			url:"/v6/teacher/handle",
			type:"post",
			data:{
				tc_status:$(this).parent().attr("data-status"),
				tc_id:$(this).parent().attr("data-id")
			},
			success: function (data) {
				if(data.code==200){
					_this.html(data.result.tc_status==0?"开启":"注销");
					_this.parent().attr("data-status",data.result.tc_status);
				}
			}
		})

	})
});

