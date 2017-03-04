define(['jquery','common','nprogress',"util","template","ckeditor"], function($,undefined,nprogress,util,template,ckeditor) {




	nprogress.done();
	var csid=util.getQueryString("cs_id");
	console.log(csid);
	$.get("/v6/course/basic",{cs_id:csid}, function (data) {
		if(data.code==200){
			$('.steps').html(template("form-step",data.result));

			var cke=ckeditor.replace('ckeditor');


			$("#category_top").on("change", function () {
				var topld=$(this).val();

				$.get("/v6/category/child", {cg_id:topld},function (data) {
					if(data.code==200){
						var optionHTML=
						"{{ each list}}\
							<option value='{{$value.cg_id}}'>{{$value.cg_name}} </option>\
						{{ /each}}";

						var render=template.compile(optionHTML);

						$('#category_child').html(render({list:data.result}));



					}
				})
			});

			$("#form-step1").on("submit", function () {
				cke.updateElement();
				$.ajax({
					url:"/v6/course/update/basic",
					type:"post",
					data:$(this).serialize()+'&cs_id='+csid,
					success: function (data) {
						if(data.code==200){
							location.href="/html/course/add_step2.html?cs_id="+csid;
						}
					}
				})
				return false;

			})
		}



	});
});
