define(['jquery','common','nprogress'], function($,undefined,nprogress) {




	nprogress.done();
	
	$("#form-pwd").on("submit", function () {
		$.ajax({
			url:'/v6/teacher/repass',
			type:"post",
			data:$(this).serialize(),
			success: function (data) {
				if(data.code==200){
					$("#logout").trigger("click");
				}
			}
		})
		return false;
	})
});
