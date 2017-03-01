define(['jquery','common','nprogress','util','template','datepicker','datepickerZhCN'], function($,undefined,nprogress,util,template,datepicker,undefined) {

	nprogress.done();
	
	var tcID=util.getQueryString("tc_id");


	if(tcID){
		$.get("/v6/teacher/edit",{tc_id:tcID}, function (data) {
			if(data.code==200){
				var html=template("teacher-form-edit",data.result)
				$('.teacher-add').html(html);
				$('#datepicter').datepicker({
					language: 'zh-CN',
					endDate: new Date(),
					format: 'yyyy-mm-dd'
				});
			}
		})
	}else{
		var html=template("teacher-form-edit",{})
		$('.teacher-add').html(html);
		$('#datepicter').datepicker({
			language: 'zh-CN',
			endDate: new Date(),
			format: 'yyyy-mm-dd'
		});
	}


	$(".teacher-add").on("submit", "#teacher-add-form",function () {
		$.ajax({
			url:"/v6/teacher/"+(tcID?'update':"add"),
			type:"post",
			data:$(this).serialize()+ ( tcID? '&tc_id=' + tcID : '' ),
			success: function (data) {
				if(data.code==200){
					location.href="/html/teacher/list.html";
				}
			}
		})
		return false;
	});


});
