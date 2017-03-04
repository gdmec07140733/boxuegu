define(['jquery','common','nprogress','template','region','datepicker','datepickerZhCN','ckeditor','uploadify'], function(
	$,undefined,nprogress,template,region,datepicker,undefined,ckeditor,uploadify) {


	nprogress.done();
	//չʾ������Ϣ����
	$.get('/v6/teacher/profile', function (data) {
		if(data.code==200){

			$('#profile').html(template("profileForm",data.result));

			$('.hometown').region({
				url:"/lib/region/region.json"
			});

			 //�������ڲ��
			$('.datepicker').datepicker({
				language: 'zh-CN',
				format: 'yyyy-mm-dd',
				endDate: new Date()
			});


			console.log(ckeditor);
			//���ø��ı��༭��
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

			// ����ͷ���ϴ����
			$('#upfile').uploadify({
				swf: '/lib/uploadify/uploadify.swf', //swf��ʽ�ļ�
				uploader: '/v6/uploader/avatar',//����˿�·��
				fileObjName: 'tc_avatar',//�ӿ�
				fileTypeExts: '*.gif; *.jpg; *.png',//ͼƬ��ʽ
				height: $('.preview').height(),//��Ԫ�صĸ߶�
				buttonText: '',
				// ͷ���ϴ��ɹ��󣬽����ַ������ݣ�Ȼ����ϴ��ĵ�ַ���õ����У����ύ��ͬʱ�����û�ͷ���Ԥ����
				onUploadSuccess: function(file, data) {
					var data = JSON.parse(data);
					//$('#avatar-input').val(data.result.path);
					$('.preview img').attr('src', data.result.path);
				}
			});


			// �����ύ�¼�
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
