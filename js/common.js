define(['jquery','jqueryCookie'], function($,undefined) {

    $(".navs a").on("click", function () {
        $(this).next().slideToggle();
    });

    $("#logout").on("click", function () {

        $.ajax({
            url:"/v6/logout",
            type:"post",
            data:{},
            success: function (data) {
                if(data.code == "200") {
                    location.href = '/html/home/login.html';
                }
            }
        });
        return false;
    });

    var portrait =null;

    try{
        portrait=JSON.parse($.cookie("userInfo"));
    }catch(e){
        portrait={};
    }

    $('.aside .profile h4').html(portrait.tc_name?'邱东岳':portrait.tc_name);
    $('.aside .profile img').attr('src', portrait.tc_avatar? portrait.tc_avatar: '/img/IMG_0564.JPG');
});
