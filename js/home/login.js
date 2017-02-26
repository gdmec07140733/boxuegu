define(['jquery','jqueryCookie'], function($,undefined) {

	$("#form_data").on("submit", function () {

		$.ajax({
			url:"/v6/login",
			type:"post",
			data:$(this).serialize(),
			success: function (data) {
				if (data.code===200){
					$.cookie('userInfo', JSON.stringify(data.result), {path: '/'});
					location.href="/";
				}
			},
			error: function () {
				console.log('error');
			}

		})

		return false;
	});
});
