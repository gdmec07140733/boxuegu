define(['jquery','common','nprogress',"util","template","uploadify"], function($,undefined,nprogress,util,template,uploadify) {




	nprogress.done();

	var csid=util.getQueryString("cs_id");

	$.get("/v6/course/picture", {cs_id:csid},function (data) {
		if(data.code==200){
			$(".steps").html(template("form-step2",data.result));


			$("#uploading").uploadify({
				swf:'/lib/uploadify/uploadify.swf',
				uploader: '/v6/uploader/cover',
				fileObjName: 'cs_cover_original',
				fileTypeExts: '*.gif; *.jpg; *.png',
				fileSizeLimit:'2MB',
				formData:{cs_id:csid},
				buttonText: '上传封面',
				buttonClass:"btn btn-success btn-sm",
				height:"100%",
				width:"100%",
				onUploadSuccess: function (flie,data) {
					data=JSON.parse(data);
					$(".cover-img").attr("src",data.result.path);
				}
			})

		}
	})

});
