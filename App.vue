<script>
	export default {
		globalData:{
			exhList:[
				{
					'name':'第八届中国（临沂）全屋定制精品展览会',
					'id':'149'
				},
				{
					'name':'第四届中国(临沂)绿色建筑建材产业博览会',
					'id':'150'
				}
			],
		},
		onLoad() {
			//?exhType=3&exhId=149 
		},
		onLaunch: function(res) {
			var url=window.location.href;
			url=url.replace("#/","")
			url=url.split("?")
			
			if(url.indexOf("clear=1")>=0){
				uni.clearStorageSync();  
			}
			
			const str = url[1]; // 原始字符串
			const pairs = str.split("&"); // 将字符串按 & 符号进行拆分，得到一个数组
			const result = {}; // 用于存放键值对
			// 遍历数组中的每个元素，并将其按 = 符号拆分为键和值，存入 result 对象
			for(let i = 0; i < pairs.length; i++) {
			  const pair = pairs[i].split("=");
			  result[pair[0]] = pair[1];  
			}
			var exhInfo=uni.getStorageSync("exhInfo")//目前只是用来指定短信
			if(exhInfo&&result.exhId!=exhInfo.exhId){
				uni.removeStorageSync("zhanshangInfo")
			}
			if(result.clear==1){
				uni.removeStorageSync("zhanshangInfo")
			}else{
				uni.setStorageSync("exhInfo",result)
			}
			console.log("最终的结果",result); 
			
		},
		onShow: function() {	
			console.log('App Show');
		},  
		onHide: function() {
			console.log('App Hide');
		}   
	}  
</script>  

<style  lang="scss">
	/*每个页面公共css */
	@import url("/style/style.css");
	@import url("/style/style_rpx.css");
	@import "/style/ty_style_scss.scss";
</style>
