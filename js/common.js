define(['jquery'], function($) {

    $(".navs a").on("click", function () {
        $(this).next().slideToggle();
    })
});
