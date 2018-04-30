var isIE = /msie/i.test(navigator.userAgent) && !window.opera;

// 登录弹窗
function showLogin(){
	$('.index-login').slideDown(0,function(){
		$('.logincon',this).slideDown();
	});
}

$(function(){
	var allheight = $(document.body).height();
	// 点击遮罩退出登录弹窗
	$('.index-login .bg').click(function(e){
		e.stopPropagation();
		$('.index-login').fadeOut();
		$('.logincon').hide();
	});

	// VIP服务-我要申请弹窗
	$('#vip-apply').on('click',function(e){
		if($("#agree").is(':checked') == false){
			alert("您还未同意协议!");
		}else{
			$('#vip-tc').removeClass('hide');
		}
	});
	$('#vip-tc .close').on('click',function(){
		$('#vip-tc').addClass('hide');
	});

	// 点击遮罩退出
	$(".mask").on("click",function(e){
		var target  = $(e.target);
		if(target.closest(".vip-con").length == 0){
		   $('#vip-tc').addClass('hide');
		}e.stopPropagation();
	});

	//协议的弹出层
	$('#agreement .close').on('click',function(){
		$('#agreement').addClass('hide');
	});

	$(".mask").on("click",function(e){
		var target  = $(e.target);
		if(target.closest(".agreement-window").length == 0){
		   $('#agreement').addClass('hide');
		}e.stopPropagation();
	});

	//轮播
	//jQuery(".slideBox").slide({mainCell:".bd ul",effect:"fold",autoPlay:true,delayTime:1000});
	$(".slidebox").slide({mainCell:".bd ul",effect:"leftLoop",autoPlay:true,delayTime:1000});

	//导航滚动变化
	$(window).scroll(function(){
		var _stop = $(this).scrollTop();
		var _hs = allheight - _stop;
		if(_stop >= 70){
			$('header').addClass('fixed');
		}else{
			$('header').removeClass('fixed');
		}

		if(_hs < 1400){
			$('.fixednav').css('display','none');
			return;
		}
		if(_stop >= 350){
			$('.fixednav').css('display','block');
		}else{
			$('.fixednav').css('display','none');
		}

	});


	var s;
		$('.xinlang-hide').mouseenter(function(){
			s = layer.tips('关注我们的微博', '.xinlang', {
			  tips: [1]
			});
		}).mouseleave(function(){
			layer.close(s)
		});

		$('.weibo').mouseenter(function(){
			var _src = $(this).attr('data_src');

			s = layer.tips('<img style="width:190px;" src="' + _src +'" />', '.weibo', {
			  tips: [3] //还可配置颜色
			});
		}).mouseleave(function(){
			layer.close(s)
		});

		$('.douban').mouseenter(function(){

			s = layer.tips('关注我们的豆瓣', '.douban', {
			  tips: [1],
			  skin: 'demo-class'
			});
		}).mouseleave(function(){
			layer.close(s)
		});

		$('.rss-feed').mouseenter(function(){

			s = layer.tips('订阅我们的rss-feed', '.rss-feed', {
			  tips: [1],
			  skin: 'demo-class'
			});
		}).mouseleave(function(){
			layer.close(s)
		});



		$('#returnTop').click(function(){

			$('body,html').animate({
				scrollTop:0
			},300);
			return false;
		});
		$('#returnBot').click(function(){
			$('html,body').animate({
				scrollTop: $('footer').offset().top
			},400);
			return false;
		});

		$('.mycollect>ul>li').each(function(){
			var index = $(this).index()+1;
			if (index%3==0) {
				$(this).css('marginRight','0');
			}
		});

		// 个人主页
		$('.person-con .right li').each(function(){
			var index = $(this).index()+1;
			if (index%2==0) {
				$(this).css('marginRight','0');
			}
		});

		$('.vip-tabs a').each(function(){
			var _index = $(this).index();
			$(this).on('click',function(){
				$(this).addClass('on').siblings().removeClass('on');
				$('.service-vip .detail').eq(_index).addClass('on').siblings().removeClass('on')
			});
		});

		$(".head-right .search").on("click",function(e){
			var target  = $(e.target);
			var height = $(this).find(".search-main").css("height");
			if(height == '0' || height == '0px'){
				$(this).find(".search-main").css("height", "100%");
			} else if(target.closest(".search-main").length == 0) {
				$(this).find(".search-main").css("height", "0");
			}
		});

		$("input.search").on("focus",function(e){
			$(this).parent().addClass("border-logo");
		}).on("blur",function(e){
			$(this).parent().removeClass("border-logo");
		});

});

/*在线编辑器*/
function getEditor(textareaName){
	var editor;
	KindEditor.ready(function(K) {
		K.create('textarea[name="'+textareaName+'"]', {
			filterMode : false
		});
	});
}

function fileChange(target) {
	var fileSize = 0;
	if (isIE && !target.files) {
		var filePath = target.value;
		var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
		var file = fileSystem.GetFile (filePath);
		fileSize = file.Size;
	} else {
		var fileSize = 0;
		var size = 0;
		var allsize = 0;
		var len = target.files.length;
		if(len>20){
			alert("文件个数不能超过20个,请重新选择！");
			target.value = '';
			return false;
		}
		for(var i=0;i<len;i++){
			fileSize = target.files[i].size;
			size = fileSize / 1024 / 1024;
			allsize += size;
			if(size > 2){
				alert("单个文件大小不能大于2M,请重新选择！");
				target.value = '';
				return false;
			}
		}
		if(allsize>18){
			alert("文件总大小不能大于18M,请重新选择！");
			target.value = '';
			return false;
		}
	}
}

function checkSearchForm(){
	var keywords = $("#keywords").val();
	if(!keywords){
		alert("请填写关键字！");
		return false;
	}
	return true;
}