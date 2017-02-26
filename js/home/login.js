define(['jquery'], function($) {
	$("#form_data").on("submit", function () {


		$.ajax({
			url:"/v6/login",
			type:"post",
			data:$(this).serialize(),
			success: function (data) {
				if (data.code===200){
					location.href="/";
				}
			},
			error: function () {
				console.log(data);
			}

		})

		return false;
	});
});
