import siteInfo from '../../siteinfo.js'; //程序基础配置
import QQMapWX from './qqmap-wx-jssdk.min.js';
// #ifdef H5
import jweixin from './jweixin-1.6.0..js';
// import jweixinModule from './jweixin-module.js';
// #endif
var util = {};
// 什么模式下的程序
util.getProvider = function (cb) {
	uni.getProvider({
		service: 'oauth',
		success: function (res) {
			typeof cb == 'function' ? cb(res.provider) : '';
		}
	});
}
// 获取程序是什么模式
util.getProvider(res => {
	util.provider = res;
})
util.url = function (action) {
	var url = siteInfo.siteroot ;
	return url
}
// ajax请求
util.request = function (option) {
	var option = option ? option : {};
	var url = util.url(url) + '/' + option.url;
	// 可能会发生请求第三方的接口的问题
	if (url.indexOf('http://') == -1 && url.indexOf('https://') == -1) {
		url = util.url(url);
	}
	if(!option.method || option.method == 'GET'){
		if(option.data){
			option.data.esdcrftvgy = Date.parse(new Date())
		}
		if(!option.data){
			url = `${url}?esdcrftvgy=${Date.parse(new Date())}`
		}
	}
	uni.showLoading({
		title: '加载中'
	})
	uni.request({
		'url': url,
		'data': option.data ? option.data : {},
		'method': option.method ? option.method : 'GET',
		'header': {
			'content-type': 'application/x-www-form-urlencoded',
			'Access-Control-Allow-Origin': '*'
		},
		success: function (res) {
			if (option.success && typeof option.success == 'function') {
				option.success(res);
			}
			uni.hideLoading()
		},
		fail: function (res) {
			if (option.fail && typeof option.fail == 'function') {
				option.fail(res);
			}
			uni.hideLoading()
		},
		'complete': function (res) {
			if (option.complete && typeof option.complete == 'function') {
				option.complete(res);
			}
		}
	})
}

// 获取用户余额
util.balance = function (balanceback) {
	// #ifdef MP-WEIXIN
	var userDetail = uni.getStorageSync("userInfo") && uni.getStorageSync("userInfo").wxInfo
	// #endif
	// #ifdef H5
	var userDetail = JSON.parse(JSON.stringify(uni.getStorageSync("userInfo")))
	// #endif
	if(uni.getStorageSync("userInfo")){
		return new Promise((resolve, reject) => {
			util.request({
				url: 'api/user/getbalance',
				data: {
					userid: userDetail.userId,
				},
				method: 'POST',
				success: (res) => {
					res.data.data.money = String(res.data.data.money)
					var balance = res.data.data;
					typeof balanceback == 'function' ? balanceback(balance) : '';
					uni.setStorageSync('balance', balance)
					resolve(res)
				},
				fail: (res) => {
					var balance = res.data.data;
					typeof balanceback == 'function' ? balanceback(balance) : '';
				}
			});
		})
	}
}
// 底部tabBar配置接口
util.GetTabBar = function (tabBack) {
	var ios = uni.getStorageSync("ios")
	return new Promise((resolve, reject) => {
		util.request({
			url: '/api/index/bottom_nav',
			data: {
				// #ifdef MP-WEIXIN
				app_type: '1',
				// #endif
				// #ifdef H5
				app_type: '0',
				// #endif
			},
			success: (res) => {
				var tabData = res.data.data;
				typeof tabBack == 'function' ? tabBack(tabData) : '';
				resolve(res)
			},
			fail: (res) => {
				var tabData = res.data.data;
				typeof tabBack == 'function' ? tabBack(tabData) : '';
			}
		});
	})
}
// 上传图片接口
util.unloadImg = function (options) {
	var local_imgs = [], server_imgs = [], num = 0;
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: options.data.count, //默认9
			sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
			success: (res) => {
				options.data.tempFilePaths = res.tempFilePaths;//本地图片集合
				local_imgs = res.tempFilePaths;//本地图片集合
				util.loadimgList(options, num, local_imgs, server_imgs);
			}
		});
	})
}

util.loadimgList = function (options, num, local_imgs, server_imgs) {
	// console.log(options.data.tempFilePaths[num])
	// 请求图片的路径
	var url = util.url() + "c=entry&a=wxapp&do=" + options.data.do + "&s=" + options.data.s  + "&act=" + options.data.act;
	// var url = util.url() + "c=entry&a=wxapp&do=" + options.data.do +  "&act=" + options.data.act;
	// +"&userid="+options.data.userid;

	uni.uploadFile({
		url: url, //仅为示例，非真实的接口地址
		filePath: options.data.tempFilePaths[num],
		name: 'image',		
		formData: {
			userid: options.data.userid
		},
		success: function (res) {
			var res = JSON.parse(res.data);
			server_imgs = res.data;
			num++;//图片第几个开始上传
			if (options.data.tempFilePaths.length > 1 && num < options.data.tempFilePaths.length) {
				console.log(num)
				util.loadimgList(options, num, local_imgs, server_imgs);
			}
			typeof options.success == 'function' ? options.success(num, local_imgs, server_imgs) : '';
		},
		fail: function (res) {
			console.log(res)
			num;//图片第几个开始上传
			if (options.data.tempFilePaths.length > 1 && num < options.data.tempFilePaths.length) {
				console.log(num)
				util.loadimgList(options, num, local_imgs, server_imgs);
			}
			typeof options.fail == 'function' ? options.fail(num, local_imgs, server_imgs) : '';
		},
	});
}


// 预览图片
util.showImage = function (event) {
	var url = event ? event.currentTarget.dataset.preview : '';
	if (!url) {
		return false;
	}
	wx.previewImage({
		urls: [url]
	});
}

// 获取用户信息
util.getUserInfo = function (options) {
	// var login = function () {
		var userInfo = uni.getStorageSync('userInfo')
		uni.login({
			provider: 'weixin',
			success: function (res) {
				console.log(res)
				util.request({
					url: 'api/user/jscode2session',
					data: {
						code: res.code
					},
					success: function (session) {
						if (session.data.code == 1) {
							userInfo.sessionData = session.data.data
							uni.setStorageSync('userInfo', userInfo);
							util.getUserId(userInfo, options)
						}else{
							uni.showToast({
								title: session.data.msg,
								icon: 'none'
							})
						}
					}
				});
			},
			fail: function () {
				uni.showModal({
					title: '获取信息失败',
					content: '请允许授权以便为您提供给服务',
					success: function (res) {
						if (res.confirm) {
							util.getUserInfo();
						}
					}
				})
			}
		});
	// };
	// // 登陆之前的验证   登陆是否失效
	// var app = uni.getStorageSync('userInfo');
	// if (app.sessionData) {
	// 	console.log(app)
	// 	uni.checkSession({
	// 		success: function () {
	// 			console.log("session未过期")
	// 			util.getUserId(app, options)
	// 			typeof options.login_success == "function" && options.login_success(app);
	// 		},
	// 		fail: function () {
	// 			console.log('session过期');
	// 			uni.removeStorageSync('userInfo');
	// 			login();
	// 		}
	// 	})
	// } else {
	// 	//调用登录接口
	// 	console.log('有没有授权session');
	// 	login();
	// }
}

// 获取用户的userId
util.getUserId = function (userInfo, options) {
	util.request({
		url: 'api/user/register',
		data: {
			openid: userInfo.sessionData.openid,
			unionid: userInfo.sessionData.unionid?userInfo.sessionData.unionid:'',
			avatar: userInfo.wxInfo.avatarUrl,
			nickname: userInfo.wxInfo.nickName,
			gender: userInfo.wxInfo.gender,
			pid: uni.getStorageSync("pid") || 0
		},
		method: 'POST',
		success: (res) => {
			console.log(res)
			if (!res.data.errno) {
				userInfo.wxInfo.avatarUrl = userInfo.sessionData.avatar == '' ? userInfo.wxInfo.avatarUrl : userInfo.sessionData.avatar
				userInfo.wxInfo.nickName = userInfo.sessionData.nickname == '' ? userInfo.wxInfo.nickName : userInfo.sessionData.nickname
				userInfo.wxInfo.phone = userInfo.sessionData.phone
				userInfo.wxInfo.userId = res.data.data;
				uni.setStorageSync('userInfo', userInfo);
			}
			typeof options.login_success == "function" && options.login_success(userInfo);
		}, fail: res => {
			typeof options.login_fail == "function" && options.login_fail(userInfo);
		}
	});
}

// 跳转下一页
util.go = function (link) {
	uni.navigateTo({
		url: link
	});
}
// 返回上  num【是返回的层级数】  页
util.back = function (num) {
	uni.navigateBack({
		delta: num
	});
}
// 底部原生tabbar的跳转
util.tab = function (link) {
	uni.switchTab({
		url: link
	});
}
// 重载页面
util.onLoad = function (link) {
	uni.reLaunch({
		url: link
	});
}
// 跳转下一个页面没有，切本页面不会在history中
util.noBack = function (link) {
	uni.redirectTo({
		url: link
	});
}

// 显示 loading 提示框
util.loading = function () {
	uni.showLoading({
		title: '加载中...'
	});
}
// 关闭loading提示框
util.unLoading = function () {
	uni.hideLoading();
}
// 消息提示框 Toast
util.toast = function (msg, icon) {
	uni.showToast({
		title: msg ? msg : "msg",
		duration: 1000,
		icon: icon ? icon : "success"
	});
}
// 微信支付  先配置微信支付数据
util.wxpay = function (options,e,s) {
	console.log(options,    e,s)   
	// 仅作为示例，非真实参数信息。
	uni.requestPayment({
		// #ifdef MP-WEIXIN
		provider: 'wxpay',    
		// #endif  
		// #ifdef MP-ALIPAY
		provider: 'alipay',
		// #endif
		timeStamp: options.timeStamp,
		nonceStr: options.nonceStr,
		package: options.package,
		signType: options.signType,
		paySign: options.paySign,
		success: function (res) {
			console.log("支付成功",res)
			setTimeout(function(){
				if(s == '0'){
					uni.reLaunch({
						url:e
					})
				}else if(s == '1'){
					uni.navigateBack({
					    delta: 1
					});
				}else{
					uni.navigateTo({
						url:e
					})
				}
			},1500)
			util.balance()
			uni.showToast({
				title: '支付成功',
				duration: 1000,
				icon: "none"
			});
			typeof options.success == 'function' ? options.success(res) : '';
		},
		fail: function (res) {
				console.log("支付失败",res)
				uni.navigateTo({
					url:e
				})
			typeof options.fail == 'function' ? options.fail(res) : '';
		}
	});
}
// 公众号支付
util.jwxpay = function (options,e,s) {
	console.log(options)
	if(uni.getStorageSync("logintype") == 1){
		window.location.href = options.mweb_url
	}else{
		
		
		jweixin.config({
			 appId: options.appId, // 必填，公众号的唯一标识
			 timestamp: options.timeStamp, // 必填，生成签名的时间戳
			 nonceStr: options.nonceStr, // 必填，生成签名的随机串
			 signature: options.paySign,// 必填，签名
			 jsApiList: ['chooseWXPay','openAddress'] // 必填，需要使用的JS接口列表
		});
		jweixin.ready(() => {
			jweixin.chooseWXPay({
				timestamp: options.timeStamp, 
				nonceStr:options.nonceStr, // 支付签名随机串，不长于 32 位
				package: options.package, // 统一支付接口返回的prepay_id参数值
				signType: options.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
				paySign: options.paySign, // 支付签名
				success: function(res) {//支付成功回调
					setTimeout(function(){
						if(s == '0'){
							uni.reLaunch({
								url:e
							})
						}else if(s == '1'){
							uni.navigateBack({
							    delta: 1
							});
						}else{
							uni.navigateTo({
								url:e
							})
						}
					},1500)
					util.balance()
					uni.showToast({
						title: '支付成功',
						duration: 1000,
						icon: "none"
					});
				}
			});
		});
	}
}
// 公众号分享
util.jwxModule = function(options,title,desc,link,imgUrl){

	console.log("options",options)
	var exType=uni.getStorageSync("exhInfo").exhType
	if(exType==1){
		title="第9届绿色低碳环保产业国际博览会专业技术论坛";
		desc="展商入场快速登记入口";  
		imgUrl="https://shandongtibohui.zsyflive.com/profile/upload/2022/08/03/6fbca66972154d56b163daab0df6fb87_20220803092533A004.jpg";
	}else if(exType==2){
		title="第四届山东体育用品博览会";
		desc="展商入场快速登记入口";  
		imgUrl="https://shandongtibohui.zsyflive.com/profile/upload/2022/08/03/fe6bbb03f29647538c83eead4613394d_20220803092610A005.jpg";
	}else if(exType==3){
		title="第八届中国（临沂）全屋定制精品展览会";
		desc="展位快速预定入口";  
		imgUrl="https://frdzhtsignup.zsyflive.com/static/logo3.png";
	}else if(exType==4){
		title="2023（第72届）秋季全国五金商品交易会";
		desc="展商入场快速登记入口";  
		imgUrl="https://shandongtibohui.zsyflive.com/profile/upload/2022/08/03/cc7fcbcb6483444aa73501d3a22f3c69_20220803092643A007.png";
	}  else if(exType==7){
		var title="2023中国（西安）国际五金机电博览会"
		desc="展商入场快速登记入口";  
		imgUrl="https://shandongtibohui.zsyflive.com/profile/avatar/2023/03/20/blob_20230320163234A003.jpeg";
	}else if(exType==8){
		var title="首届叶集定制家居暨供应链产业博览会"
		desc="时间：2023年10.13-10.15  地址：安徽叶集·中国中部国际木材交易中心";
		imgUrl="https://frdzlfapi.zsyflive.com/profile/xd/5b7a91c9080c8042574c9ec8763888d.png";
	}else if(exType==9){
		var title="第十八届中国林产品交易会"
		desc="时间：2023年9月19-21日  地址：菏泽国际会展中心";
		imgUrl="https://frdzlfapi.zsyflive.com/profile/xd/04f7e815a9eb25409e8a24090a436cf.jpg";
	}
	// link = link.indexOf('pages') > 0 ? link.slice(0,link.indexOf('/#/')) + '?' + link.slice(link.indexOf('/#/') + 2) + link.slice(link.indexOf('/#/')) :  link
	var username=uni.getStorageSync("username")
	// title="邀您参加"+title;
	title=title;
	if(username){
		console.log("分享标题",username,title)
		title=username+title;
	}
	
	jweixin.config({
		// debug:true,
		 appId: options.appId, // 必填，公众号的唯一标识
		 timestamp: options.timestamp, // 必填，生成签名的时间戳
		 nonceStr: options.noncestr, // 必填，生成签名的随机串
		 signature: options.signature,// 必填，签名
		 jsApiList: ['updateAppMessageShareData','updateTimelineShareData','openAddress',
		 'onMenuShareAppMessage','hideMenuItems'
		 ] // 必填，需要使用的JS接口列表
	});
	  
	
	
	
	
	
	
	var list=[];
	try{
		var exhInfo=uni.getStorageSync("exhInfo")
		var data="exhType="+exhInfo.exhType+"&exhId="+exhInfo.exhId;
		link='https://frdboth.mianshijing.top' +"?"+data
	}catch(e){
		//TODO handle the exception
		console.log("崔哦奥",e);
	}
	
	
	var xinxi=uni.getSystemInfoSync();
	
	
	console.log("分享链接",link)
	
	jweixin.ready(function () {   //需在用户可能点击分享按钮前就先调用
	
	  
	
	jweixin.hideMenuItems({
					       menuList: [
						   "menuItem:share:qq",
						   "menuItem:share:weiboApp",
						   "menuItem:share:facebook",
						   "menuItem:editTag",
						   "menuItem:copyUrl",
						   "menuItem:openWithQQBrowser",
						   "menuItem:openWithSafari",
						   "menuItem:share:QZone",
						   
						   ], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
						   success: function (res) {
						   	console.log('隐藏设置成功',res)
						   },
						   fail:res=>{  
						   	console.log('隐藏设置失败',res)
						   },
					   });
			
			console.log("分享标题",title)
			
		jweixin.updateAppMessageShareData({ 
			title: title, // 分享标题
			desc: desc, // 分享描述
			link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: imgUrl, // 分享图标
			success: function (res) {
				console.log('设置成功',res)
			},
			fail:res=>{
				console.log('设置失败',res)
			},
		})
		
		jweixin.updateTimelineShareData({ 
		    title: title, // 分享标题
		    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		    imgUrl: imgUrl, // 分享图标
		    success:  (res)=> {
				console.log('设置成功2',res)
		      // 设置成功
		    },
			fail:res=>{
				console.log('设置失败2',res)
			},
			
		  })
	});
}
// 公众号扫码
util.qrCode = function (options) {
	jweixin.config({
		 appId: options.appId, // 必填，公众号的唯一标识
		 timestamp: options.timestamp, // 必填，生成签名的时间戳
		 nonceStr: options.nonceStr, // 必填，生成签名的随机串
		 signature: options.signature,// 必填，签名
		 jsApiList: ['scanQRCode','openAddress'] // 必填，需要使用的JS接口列表
	});
	jweixin.ready(() => {
		jweixin.scanQRCode({
		  needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
		  scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
		  success: function (res) {
		    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
		  }
		});
	});
}
// 公众号获取收货地址
util.jwxAddress = function (options) {
	
	options=options.options;
	console.log("地址信息",options)
	console.log("地址",{
		appId: options.appId, // 必填，公众号的唯一标识
		timestamp: options.timestamp, // 必填，生成签名的时间戳
		nonceStr: options.nonceStr, // 必填，生成签名的随机串
		signature: options.signature,// 必填，签名
		jsApiList: ['openAddress'] // 必填，需要使用的JS接口列表
	})
	jweixin.config({
		 appId: options.appId, // 必填，公众号的唯一标识
		 timestamp: options.timestamp, // 必填，生成签名的时间戳
		 nonceStr: options.nonceStr, // 必填，生成签名的随机串
		 signature: options.signature,// 必填，签名
		 jsApiList: ['openAddress'] // 必填，需要使用的JS接口列表
	});
	jweixin.ready(() => {
		jweixin.openAddress({
			success: function (res) {
				console.log("---a---",res)
				typeof options.success == 'function' ? options.success(res) : '';
			},
			fail:res=>{
				typeof options.fail == 'function' ? options.fail(res) : '';
			}
		});
	});
}
// 获取经纬度
util.get_address = function (options) {
	uni.getLocation({
		type: options.type,
		success: function (res) {
			typeof options.success == 'function' ? options.success(res) : '';
		}, fail: res => {
			typeof options.fail == 'function' ? options.fail(res) : '';
		}
	});
}
// 经纬度逆解析
util.getCity = function (option) {
	var qqmapsdk;
	qqmapsdk = new QQMapWX({
		key: option.key
	});
	qqmapsdk.reverseGeocoder({
		location: {
			latitude: option.lat,
			longitude: option.lng,
		},
		success: (res) => {
			typeof option.success == 'function' ? option.success(res) : '';
		},
		fail: (res) => {
			typeof option.fail == 'function' ? option.fail(res) : '';
		}
	})
}
util.save_poster = function (options) {
    uni.saveImageToPhotosAlbum({
        filePath: options.poster,
        success(res) {
            console.log("保存海报", res)
            typeof options.success == 'function' ? options.success(res) : '';
        },
        fail: (err) => {
            console.log("保存海报", err)
            typeof options.fail == 'function' ? options.fail(err) : '';
        }
    })
}

util.isIosX = function(){
	var isIos = false
	uni.getSystemInfo({
		success(res) {
			var modelmes = res.model;
			// 得到安全区域高度
			if (modelmes.search('iPhone X') != -1 || modelmes.search('iPhone 11') != -1) {//IPhoneX底部大约为68rpx
				isIos = true
			}else{
				isIos = false
			}
		}
	})
	return isIos
}

//日期格式化
util.formatDate = function(formatStr, fdate) {
	if (fdate) {
		if (~fdate.indexOf('.')) {
			fdate = fdate.substring(0, fdate.indexOf('.'));
		}
		fdate = fdate.toString().replace('T', ' ').replace(/\-/g, '/');
		var fTime, fStr = 'ymdhis';
		if (!formatStr)
			formatStr = "y-m-d h:i:s";
		if (fdate)
			fTime = new Date(fdate);
		else
			fTime = new Date();
		var month = fTime.getMonth() + 1;
		var day = fTime.getDate();
		var hours = fTime.getHours();
		var minu = fTime.getMinutes();
		var second = fTime.getSeconds();
		month = month < 10 ? '0' + month : month;
		day = day < 10 ? '0' + day : day;
		hours = hours < 10 ? ('0' + hours) : hours;
		minu = minu < 10 ? '0' + minu : minu;
		second = second < 10 ? '0' + second : second;
		var formatArr = [
			fTime.getFullYear().toString(),
			month.toString(),
			day.toString(),
			hours.toString(),
			minu.toString(),
			second.toString()
		]
		for (var i = 0; i < formatArr.length; i++) {
			formatStr = formatStr.replace(fStr.charAt(i), formatArr[i]);
		}
		return formatStr;
	} else {
		return "";
	}
},
util.timetoformat = function (shijianchuo) {
	//shijianchuo是整数，否则要parseInt转换
	function add0(m) {return m<10?'0'+m:m }
	var time = new Date(shijianchuo*1000);
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
},
util.timetodaystr = function (datetime){
	var filmuxtime = new Date(this.formatDate('y/m/d h:i:s',datetime)).getTime()/1000
	var nowuxtime = new Date().getTime()/1000
	var todayuxtime = new Date(this.formatDate('y-m-d 23:59:59',this.timetoformat(nowuxtime))).getTime()/1000
	var ctime = (todayuxtime - filmuxtime)/60/60/24
	var dateyy=new Date(this.formatDate('y/m/d h:i:s',datetime));
	var myddy=dateyy.getDay();
	var weekday=["周日","周一","周二","周三","周四","周五","周六"];
	var datestr = this.formatDate('m月d日',datetime);
	if(ctime <= 1 && ctime > 0){ // 今天
		var str = '今天 '+datestr
	}else if(ctime <= 0 && ctime > -1){ // 明天
		var str = '明天 '+datestr
	}else if(ctime <= -1 && ctime > -2){// 后天
		var str = '后天 '+datestr
	}else if(ctime <= 2 && ctime > 1){// 昨天
		var str = '昨天 '+datestr
	}else if(weekday[myddy]){
		var str = weekday[myddy]+' '+datestr
	}else{
		var str = datestr
	}
	return str
},

module.exports = util;