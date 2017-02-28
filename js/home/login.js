define(['jquery','jqueryCookie','nprogress'], function($,undefined,nprogress) {



	var userLnfo =null;

	try	{
		userLnfo=JSON.parse($.cookie("userInfo"));
	}catch(e){
		userLnfo={};
	}

	$(".login .avatar img").attr('src', userLnfo.tc_avatar? userLnfo.tc_avatar: '/img/IMG_0564.JPG');





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

	nprogress.done();
});
