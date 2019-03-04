var appid = clearValue(decodeURI(getQueryString("appid")));
var times = new Date().getTime();
$.get("../../template/yyzx/appdl.html", function(template) {
	var ractive = new Ractive({
		el: "#wd_templateId",
		template: template,
		oncomplete: function() {
			//加载国际化文件
			loadProperties(ractive, "yyzx_appdl", getLanguageFromCookie("language"));
			//应用详细信息
			$.ajax({
				type: "get",//"http://192.168.6.59:8089/ptyyzx/rest/yyzx
				url: requestAddressAction + "/yyzxhome/appInfo?time="+times,
				data: {
					"appid": appid
				},
				success: function(data) {
					var appinfo = data.rows;
					$(".lm-topinfo-tip1").hide();
					if(IsPC() && typeof(IsPC())=="boolean"){	
						$(".lm-android").show();
						$(".lm-ios").show();
						if(clearValue(appinfo.ios.fileId) != ""){
							$("#iosdl").bind("click", function(){
								savedltimes(appid);
								window.open(appinfo.ios.fileId);
							});
						}else{
							$(".lm-ios").hide();
							$(".lm-topinfo-tip1").show();
							$(".lm-topinfo-tip1>i").html("IOS");
						}
						if(clearValue(appinfo.andriodAPK.fileId) != ""){
							$("#androiddl").bind("click", function(){
								savedltimes(appid);
								window.open(requestFileAction + appinfo.andriodAPK.fileId+"?filename="+appinfo.andriodAPK.fileName);
							});
							/*$("#appcenterdl").bind("click", function(){
								//window.open(requestFileAction + appinfo.andriodAPK.fileId);
								//savedltimes(appid);
							});*/
						}else{
							$(".lm-android").hide();
							$(".lm-topinfo-tip1").show();
							$(".lm-topinfo-tip1>i").html("Android");					
						}
					}else if(IsPC()=="iPhone" || IsPC()=="iPad"){// ios 
						$(".lm-android").hide();
						$(".lm-ios").show();
						if(clearValue(appinfo.ios.fileId) != ""){
							$("#iosdl").bind("click", function(){
								savedltimes(appid);
								window.open(appinfo.ios.fileId);
							});
						}else{
							$(".lm-ios").hide();
							$(".lm-topinfo-tip1").show();
							$(".lm-topinfo-tip1>i").html("IOS");
						}
					}else{
						$(".lm-ios").hide();
						$(".lm-android").show();
						if(clearValue(appinfo.andriodAPK.fileId) != ""){
							$("#androiddl").bind("click", function(){
								savedltimes(appid);
								window.open(requestFileAction + appinfo.andriodAPK.fileId+"?filename="+appinfo.andriodAPK.fileName);
							});
							/*$("#appcenterdl").bind("click", function(){
								//window.open(requestFileAction + appinfo.andriodAPK.fileId);
								//savedltimes(appid);
							});*/
						}else{
							$(".lm-android").hide();
							$(".lm-topinfo-tip1").show();
							$(".lm-topinfo-tip1>i").html("Android");					
						}
					}
			
					$("#appioc").attr("src", showdelimg(appinfo.yyico));
					$("#appname").html(autoAddEllipsis(appinfo.appname, 16));
					$("#appname").attr("title", appinfo.appname);
					$("#appstart").css("width", appinfo.avgFraction*20+"px");
					$("#appsize").html(changeFileSizeFun(appinfo.andriodAPK.fileSize));
					$("#appdlnum").html(numChangeFun(appinfo.downCount, ractive));
					$("#appdesc").html(appinfo.appDesc);
					$("#appxtx").html(appinfo.features);
					var appoinfostr = "";
					appoinfostr += ractive.get("string_kfs")+"："+appinfo.partnerName+"<br>";
					appoinfostr += ractive.get("string_gxrq")+"："+appinfo.updateTime+"<br>";
					appoinfostr += ractive.get("string_banben")+"："+appinfo.curVersion;
					$("#appoinfo").html(appoinfostr);
					if(appinfo.curVersion!=""){
						$("#appv").html("V"+appinfo.curVersion);
					}
					$("#apptime").html(appinfo.updateTime);
					$("#apppartner").html(autoAddEllipsis(appinfo.partnerName, 13));
					$("#apppartner").attr("title", appinfo.partnerName);
					
				}
			});
			$("#more").on('click', function() {
				$("#appdesc").toggleClass("lm-appdesc");
				$("#more").toggleClass("rotate");
			})
		}
	});
});
//记录下载
function savedltimes(appid){
	var times = new Date().getTime();
	$.ajax({
		type: "GET",//requestAddressAction + 
		url: requestAddressAction + "/qd/download?time=" + times,
		data: {		
			"appid": appid
		},
		success: function(data) {
		},
		error: function() {}
	});
}
