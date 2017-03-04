define(['jquery','common','nprogress','template','region','datepicker','datepickerZhCN','ckeditor','uploadify'], function(
	$,undefined,nprogress,template,region,datepicker,undefined,ckeditor,uploadify) {


	nprogress.done();
	//展示个人信息到表单
	$.get('/v6/teacher/profile', function (data) {
		if(data.code==200){

			$('#profile').html(template("profileForm",data.result));

			$('.hometown').region({
				url:"/lib/region/region.json"
			});

			 //配置日期插件
			$('.datepicker').datepicker({
				language: 'zh-CN',
				format: 'yyyy-mm-dd',
				endDate: new Date()
			});


			console.log(ckeditor);
			//配置富文本编辑器
			ckeditor.replace('ckeditor', {
				toolbarGroups: [
					{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
					{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
					{ name: 'insert' },
					{ name: 'tools' },
					{ name: 'styles' },
					{ name: 'colors' },
				]
			});

			// 配置头像上传插件
			$('#upfile').uploadify({
				swf: '/lib/uploadify/uploadify.swf', //swf格式文件
				uploader: '/v6/uploader/avatar',//请求端口路径
				fileObjName: 'tc_avatar',//接口
				fileTypeExts: '*.gif; *.jpg; *.png',//图片格式
				height: $('.preview').height(),//父元素的高度
				buttonText: '',
				// 头像上传成功后，解析字符串数据，然后把上传的地址设置到表单中，供提交；同时更新用户头像的预览。
				onUploadSuccess: function(file, data) {
					var data = JSON.parse(data);
					//$('#avatar-input').val(data.result.path);
					$('.preview img').attr('src', data.result.path);
				}
			});


			// 监听提交事件
			$(".form-horizontal").on("submit", function () {

				var hometown=$('.hometown select').map(function () {
					return $(this).find("option:selected").text();

				}).toArray().join("|");

				//var d=$("#d").find("option:selected").text();
				//var p=$("#p").find("option:selected").text();
				//var c=$("#c").find("option:selected").text();
				//
				//var hometown=p+'|'+c+'|'+d;

				$.ajax({
					url:'/v6/teacher/modify',
					type:'post',
					data:$(this).serialize() + '&tc_hometown='+hometown,
					success: function (data) {
						if(data.code==200){
							console.log(data);
							location.reload();
						}
					}
				})

				return false;
			});

		}

	})

});
