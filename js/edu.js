window.onload=function(){
	
	edu.app.showFollow(); //头部关注按钮转换
	
	edu.app.closeTop();  //关闭顶部通知条
	
	edu.app.showLogIn(); //显示登陆页面
	
	edu.app.toBanner();  //广告图片淡入淡出轮播图
	
    edu.app.toRun();     //办公场景介绍图片无缝滚动图
	
	edu.app.showVideo(); //显示视频
	
	edu.app.showLesson();//显示课程列表
	
	edu.app.hotList();   //显示最热排行
	 
};




/*
 * 命名空间
 */
var edu={} 




/*
 * 工具
 */
edu.tools={};
//获取元素样式，兼容IE浏览器
edu.tools.getStyle=function(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
};
//通过class属性获取元素，兼容IE浏览器
edu.tools.getByClass=function(element, names) {
    if (element.getElementsByClassName) {
        return element.getElementsByClassName(names);
    } else {
        var elements = element.getElementsByTagName("*");
        var result = [];
        var  childElement,
             classNameStr,
             flag;
        names = names.split(" ");
        for (var i = 0;  childElement = elements[i]; i++) {
            classNameStr = " " +  childElement.className + " ";
            flag = true;
            for (var j = 0, name; name = names[j]; j++) {
                if (classNameStr.indexOf(" " + name + "") == -1) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                result.push( childElement);
            }
        }
        return result;
    }
}
//事件绑定,兼容IE浏览器
edu.tools.addEvent=function(obj,type,fn){
	if(obj.addEventListener){
		obj.addEventListener(type,fn,false);
	}else if(obj.attachEvent){
		obj.attachEvent("on"+type,fn);
	}else{
		obj["on"+type]=fn;
	}
};
//设置cookie
edu.tools.setCookie=function(name,value,iDay){
	var oDate = new Date();
	oDate.setDate(oDate.getDate()+iDay);
	document.cookie=name+"="+value+";expires"+oDate;
}
//获取cookie
edu.tools.getCookie=function(name){
	var arr=document.cookie.split("; ");
	var i=0;
	for(i=0;i<arr.length;i++){
		var arr2=arr[i].split("=");
		if(arr2[0]==name){
			return arr2[1];
		}
	}
	return "";
}
//删除cookie
edu.tools.removeCookie=function(name){
	edu.tools.setCookie(name,"1",-1);
}
//ajax，兼容IE浏览器
edu.tools.ajax=function(method,url,data,success){
	var xhr = null;
	
	try {
		xhr = new XMLHttpRequest();
	} catch (e) {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	if (method == 'get' && data) {
		url += '?' + data;
	}
	
	xhr.open(method,url,true);
	if (method == 'get') {
		xhr.send();
	} else {
		xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
		xhr.send(data);
	}
	
	xhr.onreadystatechange = function() {
		if ( xhr.readyState == 4 ) {
			if ( xhr.status == 200 ) {
				success && success(xhr.responseText);
			} else {
				alert('出错了,Err：' + xhr.status);
			}
		}
	}
}
//阻止事件默认行为
 edu.tools.preventDefault=function(){
	    if (event.preventDefault) {
	        event.preventDefault();
	    } else {
	        event.returnValue=false;
	    }
	 }


/*
 * ui组件
 */
edu.ui={}
//图片淡入
edu.ui.fadeIn=function(obj){
		var iCur=edu.tools.getStyle(obj,"opacity");
		if(iCur==1){return false;}
		
		var value = 0;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var iSpeed=10;
			if(value!=100){
				value += iSpeed;
				obj.style.opacity=value/100;
				obj.style.filter="alpha(opacity="+value+")";//兼容IE浏览器
			}else{
				clearInterval(obj.timer);
			}
		},50);
	};
//图片淡出
edu.ui.fadeOut=function(obj){
	var iCur=edu.tools.getStyle(obj,"opacity");
	if(iCur == 0){return false};
	
	var value =100;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var iSpeed = 10;
		if(value!=0){
		value -= iSpeed;
		obj.style.opacity = value/100;
		obj.style.filter="alpha(opacity="+value+")";//兼容IE浏览器
	}else{
		clearInterval(obj.timer);
	}
	},50)
  };
//向右轮播图
edu.ui.moveLeft=function(oUl,iSpeed){
	if(oUl.offsetLeft<-oUl.offsetWidth/2){
		oUl.style.left=0;
	  }else if(oUl.offsetLeft>0){
		oUl.style.left=-oUl.offsetWidth/2+"px";
	 }
     oUl.style.left=oUl.offsetLeft+iSpeed+"px";
  };
//创建遮罩层
edu.ui.createMask=function(){
	//获取页面高度和宽度
	var sHight=document.documentElement.scrollHeight;
	var sWidth=document.documentElement.scrollWidth;
	var oMask=document.createElement("div");
	oMask.id="mask";
	oMask.style.height=sHight+"px";
	oMask.style.width=sWidth+"Px";
	document.body.appendChild(oMask);
}
//创建课程内容
edu.ui.createLession=function(data,wrap,wcon,str){
	var oPrice=data.price+".00";
	wrap.innerHTML=str;
	wcon.appendChild(wrap);
}


/*
 * 应用
 */
edu.app={}
//关闭顶部通知条
edu.app.closeTop=function(){
	var oTop=document.getElementById("top");
	var closeT=oTop.getElementsByTagName("img")[0];
	if(edu.tools.getCookie("closeTop")){
		oTop.style.display="none";
	}else{
		oTop.style.display="block";
	}
	edu.tools.addEvent(closeT,"click",function(){
		oTop.style.display="none";
		edu.tools.setCookie("closeTop","123",14);
	});
}
//淡入淡出轮播图
edu.app.toBanner=function(){
	var oBanner=document.getElementById("banner");
	var oBUl=oBanner.getElementsByTagName("ul")[0];
	var aBLi=oBanner.getElementsByTagName("li");
    var aPointer=oBanner.getElementsByTagName("span");
	var iNow = 0;
	var liNow=0;
	
	clearInterval(timer);
	var timer=setInterval(auto,5000)
	
	aBLi[0].style.opacity=1;//轮播图一开始会全部变为透明，5000ms后再开始正常轮播，找不到原因，只好加一句这个让其正常运行。
	aBLi[0].style.filter="alpha(opacity=100)";//兼容IE浏览器。
	
	function auto(){
		if(iNow == aBLi.length-1){
			iNow = 0;
		}else{
			iNow++;
		}
		for(var i=0;i<aBLi.length;i++){
			edu.ui.fadeOut(aBLi[i]);
			aBLi[i].index=i;
			aPointer[aBLi[i].index].className="";
		}
		edu.ui.fadeIn(aBLi[iNow]);
		aPointer[iNow].className="active";
	};
	
	for(var i=0;i<aPointer.length;i++){
		aPointer[i].index=i;
		liNow=i;
		
		edu.tools.addEvent(aPointer[i],"mouseover",function(){
			
			var pointNow=0;
			for(var j=0;j<aPointer.length;j++){
				edu.ui.fadeOut(aBLi[j]);
				aPointer[j].className="";
			    
			}
			
			this.className="active";
			
			console.log(this.index);
			edu.ui.fadeIn(aBLi[this.index]);
	});
	}
	
	for(var i=0;i<aBLi.length;i++){
		edu.tools.addEvent(aBLi[i],"mouseover",function(){
			clearInterval(timer);
		});
		edu.tools.addEvent(aBLi[i],"mouseout",function(){
			timer=setInterval(auto,5000);
		});
	}
}
//办公场景滚动图
edu.app.toRun=function(){
	var oIntro=document.getElementById("intro");
	var oRUl=oIntro.getElementsByTagName("ul")[0];
	var aLi=oIntro.getElementsByTagName("img");
	var timer=null;
	var iSpeed=2;
	
	oRUl.innerHTML += oRUl.innerHTML;//布局虽然父元素overflow：hidden了，但是第五张图片居然掉了，不知原因，于是为了填补空白，做了多于两个的ul。
	oRUl.innerHTML += oRUl.innerHTML;
	oRUl.style.width=aLi.length*aLi[0].offsetWidth+"px";
	
	clearInterval(timer);
	setInterval(function(){
		edu.ui.moveLeft(oRUl,iSpeed);
	},30);
}
//点击创建播放器页面
edu.app.showVideo=function(){
	var oP=document.getElementById("side");
	var oVideo=edu.tools.getByClass(oP,"video")[0];
	var oImg=oVideo.getElementsByTagName("img")[0];
	var ovideo=document.getElementById("video");
	var oviDeo=document.getElementsByTagName("video")[0];
	var closeV=document.getElementById("v-close");
	
	edu.tools.addEvent(oImg,"click",function(){
		edu.ui.createMask();
		ovideo.style.display="block";
		oviDeo.style.display="block";
	});
	edu.tools.addEvent(closeV,"click",function(){
		var Mask=document.getElementById("mask");
		Mask.remove();
		ovideo.style.display="none";
		oviDeo.style.display="none";
	})
}

//页面初始化关注按钮显示
edu.app.showFollow=function(){
	var oHead=document.getElementById("header");
	var unFollow=edu.tools.getByClass(oHead,"unFollow")[0];
	var follow=edu.tools.getByClass(oHead,"follow")[0];
	var setFollow=edu.tools.getCookie("followSuc");
	
	if(setFollow == "on"){
		unFollow.style.display="none";
		follow.style.display="block";
		
		var cancelFollow = edu.tools.getByClass(oHead,"follow")[0].getElementsByTagName("a")[0];
		edu.tools.addEvent(cancelFollow,"click",function(){
			edu.tools.removeCookie("followSuc");
			unFollow.style.display="block";
		    follow.style.display="none";
		})
	}else{
		unFollow.style.display="block";
		    follow.style.display="none";
	}
}

//点击关注按钮
edu.app.showLogIn=function(){
	var oHeader=document.getElementById("header");
	var unFollow=edu.tools.getByClass(oHeader,"unFollow")[0];
	var follow=edu.tools.getByClass(oHeader,"follow")[0];
	
	edu.tools.addEvent(unFollow,"click",function(){
		edu.tools.ajax("get","https://study.163.com/webDev/attention.htm","",function(data){
			if(data==1){ 
				var oFollow=edu.tools.getCookie("followSuc");
				var oLogIn=edu.tools.getCookie("loginSuc");
				if(oLogIn=="on"){  //已登陆
					edu.tools.setCookie("followSuc","on");
				    unFollow.style.display="none";
				    follow.style.display="block";
				}else{  
					//未登陆时，设置登陆框与遮罩层
					edu.ui.createMask();
             	    var oLogIn=document.createElement("div");
      		        oLogIn.id="logIn";
     		        oLogIn.innerHTML="<div class='head'>登陆网易云课堂</div><div class='con'><div class='txt'><input type='text'></div><div class='pass'><input type='text'></div><div class='submit' ><input type='submit' value='登陆'></div><img src='img/loginX.png'> </div>"
     	            document.body.appendChild(oLogIn);
     	            //输入框功能实现
		            var oTxt=edu.tools.getByClass(oLogIn,"txt")[0].getElementsByTagName("input")[0];
		            var oPass=edu.tools.getByClass(oLogIn,"pass")[0].getElementsByTagName("input")[0];
		            var flag=0;
		            oTxt.value="账号";
		            oPass.type="text";
		            oPass.value="密码";
		            edu.tools.addEvent(oTxt,"focus",function(){  //账号输入框获焦事件
		            	var str1="账号";
		            	var str2="请输入您的账号";
		            	if(oTxt.value==str1||oTxt.value==str2){
		            		oTxt.value="";
		            	}
		            });
		            edu.tools.addEvent(oTxt,"blur",function(){   //账号输入框失焦事件
		            	if(oTxt.value==""){
		            		oTxt.value="请输入您的账号";
		            	}else{
		            		flag++;
		            	}
		            })
		            	edu.tools.addEvent(oPass,"focus",function(){
		            		var str1="密码";
		            		var str2="请输入你的密码";
		            		if(oPass.value==str1||oPass.value==str2){
		            			oPass.value="";
		            			oPass.type="password";
		            		}
		            	});
		            	edu.tools.addEvent(oPass,"blur",function(){
		            		if(oPass.value==""){
		            			oPass.type="text";
		            			oPass.value="请输入你的密码";
		            		}
		            	})
		            //点击登陆按钮
		            var oSubmit=edu.tools.getByClass(oLogIn,"submit")[0].getElementsByTagName("input")[0];
		            edu.tools.addEvent(oSubmit,"click",function(){
		            	if(flag!=0&&flag!=1){
		            			edu.tools.ajax("get","http://study.163.com/webDev/login.htm","userName="+hex_md5(encodeURI(oTxt.value))+"&password=" + hex_md5(oPass.value),function(data){
		            				if(data==1){
		            					edu.tools.setCookie("followSuc","on",14);
		            					edu.tools.setCookie("loginSuc","on",14);
		            					var oMask=document.getElementById("mask");
		            					oMask.remove();
		            					oLogIn.remove();
		            					unFollow.style.display="none";
		            					follow.style.display="block";
		            					
		            					var cancelFollow=follow.getElementsByTagName("a")[0];
		            					edu.tools.addEvent(cancelFollow,"click",function(){
		            						unFollow.style.display="block";
		            						follow.style.display="none";
		            						edu.tools.setCookie("followSuc","off");
		            					})
		            				}
		            			})
		            	}else{
		            		alert("您的输入有误，请重新输入");
		            		return false;
		            	}
		            })
     	            //点击关闭按钮，移除遮罩层与登陆框
     	            var closeL=oLogIn.getElementsByTagName("img")[0];edu.tools.addEvent(closeL,"click",function(){
			        var oMask=document.getElementById("mask");
		            oMask.remove();
		            oLogIn.remove();
	        });
				}	
			}
		});//ajax结束
	})//点击事件结束
}

//创建课程列表
edu.app.showLesson=function(){
	var oMain=document.getElementById("main");
	var oLesson=edu.tools.getByClass(oMain,"con")[0];
	var oPage=document.getElementById("page");
	//创建课程内容
	function createLesson(data,wrap){
		var oPrice=data.price+".00";
		wrap.innerHTML='<div class="preview"><img src='+data.middlePhotoUrl+'><p>'+data.name+'</p><em>音频帮</em><span>'+data.learnerCount+'</span><strong>¥'+oPrice+'</strong><div class="con_abs clear"><img src='+data.middlePhotoUrl+'><div><h3>'+data.name+'</h3><span>'+data.learnerCount+'人在学</span><em>发布者：'+data.provide+'<br />分类：'+data.categoryName+'</em></div><p>'+data.description+'</p></div></div>';
		//console.log("this is"+wrap.innerHTML);
        oLesson.appendChild(wrap);
	}
	//获取课程内容
	function getLesson(data){
		var oMain=document.getElementById("main");
		console.log(oMain);
	    var oLesson=edu.tools.getByClass(oMain,"con")[0];
	    //console.log(oLesson);
	    oLesson.innerHTML="";//保证每次调用时上一次的数据已经清空
	    for(var n=0;n<data.length;n++){
	    	var oProduct=document.createElement("div");
	    	oProduct.className="conList";
	    	createLesson(data[n],oProduct);
	    }  
	    
	    var aCon=edu.tools.getByClass(oLesson,"conList");
	    //课程内容hover效果
	    for(var i=0;i<aCon.length;i++){
	    	aCon[i].index=i;
	    	edu.tools.addEvent(aCon[i],"mousemove",(function(obj){
	    		return function(){
	    			var oDetail=edu.tools.getByClass(obj,"con_abs")[0];
	    			console.log(oDetail.className);
	    		    oDetail.style.display="block";
	    		};
	    	})(aCon[i]));
	    	edu.tools.addEvent(aCon[i],"mouseout",(function(obj){
	    		return function(){
	    			var oDetail=edu.tools.getByClass(obj,"con_abs")[0];
	    			oDetail.style.display="none";
	    		};
	    	})(aCon[i]));
	    }
	}
	//通过ajax获取数据
	function changeLesson(iPage,iType){
		if(document.body.clientWidth>1205){
			iPsize=20;
		}else{
			iPsize=15;
		}
		edu.tools.ajax("get","http://study.163.com/webDev/couresByCategory.htm","pageNo="+iPage+"&psize="+iPsize+"&type="+iType,function(data){
			var oData=JSON.parse(data);
			var aList=oData.list;
			getLesson(aList);
			oPage.innerHTML="";
			//页面加载时创建分页页码切换
			page({
				id:"page",
				pageNow:oData.pagination.pageIndex,
				pageAll:oData.totalPage
			});
		});
	}
	changeLesson(1,10);//页面加载时
	
	var flag=true;
	//课程切换
	var oTab=edu.tools.getByClass(oMain,"tab")[0];
	var aTLi=oTab.getElementsByTagName("li");
	edu.tools.addEvent(oTab,"click",function(e){
		for(var i=0;i<aTLi.length;i++){
			aTLi[i].className="";
		}
		e=e||window.event;
		var target=e.target||e.srcElement;
		if(target&&target.nodeName.toUpperCase()=="LI"){
			target.className="active";
			oPage.innerHTML="";
			var index=target.getAttribute("index");
			if(index=="10"){
				changeLesson(1,10);
			}else{
				changeLesson(1,20);
				flag=false;
			}
		}
	});
	//分页代码
	function page(opt){
		if(!opt.id){return false};
		
		var obj=document.getElementById(opt.id);
		var pageNow=opt.pageNow||1;
		var pageAll=opt.pageAll;
		var childLen=5;//? 分页列表最多显示5项
		var callBack=opt.callback||function(){};
		var pageList=Math.ceil(childLen/2)+1;
		//页数生成
		function creatPage(i){
			var oA=document.createElement("a");
			oA.href="#"+i;
			oA.innerHTML=i;
			if(pageNow==i){
				oA.className="active";
			}
			return oA;
		}
		//当前页码不为1时，上页可点
		var oA=document.createElement("a");
		oA.innerHTML="&lt";
		oA.id="prev";
		if(pageNow!=1){
			oA.href="#"+(pageNow-1);
		}
		obj.appendChild(oA);
		
		//生成具体页数
		if(pageAll < childLen){
			for(var i=1;i<=pageAll;i++){
				oA=creatPage(i);
				obj.appendChild(oA);
			}
		}else{
			for(var i=1;i<=childLen;i++){
				if(pageNow<pageList){
					oA=creatPage(i);
				}else if(pageAll-pageNow<=pageList){
					oA=creatPage(pageAll-childLen+i)
				}else{
					oA=creatPage(pageNow-pageList+i);
				}
				obj.appendChild(oA);
			}
		}
		//当前页不是最后一页时显示下一页
		var oA=document.createElement("a");
		oA.innerHTML = "&gt";
		oA.id="next";
		if(pageAll-pageNow!=0){
			oA.href="#"+(pageNow+1);
		}
		obj.appendChild(oA);
		
		callBack(pageNow);
		var aA=obj.getElementsByTagName("a");
		for(var n=0;n<aA.length;n++){
			edu.tools.addEvent(aA[n],"click",(function(object){
				return function(){
					var pageNow=parseInt(object.getAttribute("href").substring(1));
					object.innerHTML="";
					page({
						id:opt.id,
						pageNow:pageNow,
						pageAll:pageAll,
						callback:function(pageNow){
							if(flag){
								changeLesson(pageNow,10);
							}else{
								changeLesson(pageNow,20);
							}
						}
					});
					edu.tools.preventDefault();
				}
			})(aA[n]));
			
		}
	}
}

//最热排行
edu.app.hotList=function(){
	var oHotWrap=edu.tools.getByClass(document,"hotList")[0];
	var oHotUl=edu.tools.getByClass(document,"hotUl")[0];
	//创建列表
	function getList(data,wrap){
		wrap.innerHTML='<img src='+data.smallPhotoUrl+'img/ranking1.png"><p>'+data.name+'</p><span>'+data.learnerCount+'</span>';
		oHotUl.appendChild(wrap);
	}
	//获取列表数据
	function changeList(){
		edu.tools.ajax("get","https://study.163.com/webDev/hotcouresByCategory.htm","",function(data){
			var oData=JSON.parse(data);
			for(var n=0;n<oData.length;n++){
				var oHotLi=document.createElement("li");
				getList(oData[n],oHotLi);
			}
		});
	}
	changeList();
	
	var aLi=oHotUl.getElementsByTagName("li");
	var hotRoll=null;
	var stri;
	stri=oHotUl.innerHTML+oHotUl.innerHTML;
	oHotUl.innerHTML=stri;
	//每5秒滚动一次
//	function hotScoll(){
//		hotRoll=setInterval(function(){
//			var t=oHotUl.offsetTop;
//			if(t<=-oHotUl.offsetHeight/2){
//				t=0;
//			}
//			oHotUl.style.top=t-70+"px";
//		},5000);
//	}
//	//鼠标移入停止滚动
//	edu.tools.addEvent(oHotUl,"mouseover",function(){
//		clearInterval(hotRoll);
//	});
//	//鼠标移出开始滚动
//	edu.tools.addEvent(oHotUl,"mouseout",function(){
//		clearInterval(hotRoll);
//		hotScoll();
//	})
}
