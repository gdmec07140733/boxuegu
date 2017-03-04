define(['jquery','jqueryCookie'], function($,undefined) {

    $(".navs a").on("click", function () {
        $(this).next().slideToggle();
    });

    
    $(document).on("ajaxStart", function () {
        $('.overlay').show();
    }).on("ajaxStop", function () {
        $('.overlay').hide();
    });



    var pathname=window.location.pathname;

    $(".navs a").removeClass("active").filter("[href='"+pathname+"']").addClass("active").parents("ul").show();


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
    $('.aside .avatar img').attr('src', portrait.tc_avatar? '/img/IMG_0564.JPG': '/img/IMG_0564.JPG');
    //$('.aside .avatar img').attr('src','/img/IMG_0564.JPG');

});
