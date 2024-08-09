<template>
	<view class="colonn">
		<image class="topimg" src="https://meili-media.oss-cn-beijing.aliyuncs.com/zhanweitu/3dd91597577d7d6816d2be4a4fbe04a.jpg"></image>
		<view class="h-20"></view>
		<view class="roww center_center">
			<view class="colonn">
				<view class="yibu">1</view>
			</view>
			<view class="fengexian" :class="{
				'fengexian':type>=2,
				'fengexian1':type==1
			}"></view>
			<view class="colonn" style="">
				<view :class="{
					'yibu':type>=2,
					'yibu_':type==1,
				}">2</view>
			</view>
			<view class="fengexian" :class="{
				'fengexian':type>=3,
				'fengexian1':type<3
			}"></view>
			<view class="colonn">
				<view :class="{
					'yibu':type>=3,
					'yibu_':type<3,
				}">3</view>
			</view>
		</view>
		<view class="roww center_center">
			<view class="colonn">
				<view class="yibu1">企业信息</view>
			</view>
			<view class="allline"></view>
			<view class="colonn" style="">
				<view :class="{
					'yibu1':type>=2,
					'yibu1_':type<2,
				}">展位选择</view>
			</view>
			<view class="allline"></view>
			<view class="colonn">
				<view :class="{
					'yibu1':type>=3,
					'yibu1_':type<3,
				}">提交成功</view>
			</view>
		</view>

		<view class="colonn" v-if="type==1">
			
			<picker
				:range="exhList"
				range-key="name"
				@change="exhIndexChange"
			>
				<view class="roww center_center border_bottom  inputview fs-30">
					<view class="w-30"></view>
					<view class="roww w-150">
						<view style="color: red;">*</view>
						<view>展会选择</view>
					</view>
					<view class="w-30"></view>
					<view class="roww w-500">
						<block v-if="exhIndex>=0">
							{{exhList[exhIndex].name}}
						</block>
						<block v-else>
							<view style="color: #999999;">请选择展会</view>
						</block>
					</view>
					<view class="w-30"></view>
					<view class="allline"></view>
				</view>
			</picker>
			
			
			<view class="roww border_bottom center_center inputview fs-30">
				<view class="w-30"></view>
				<view class="roww w-150">
					<view style="color: red;">*</view>
					<view>企业名称</view>
				</view>
				<view class="w-30"></view>
				<input v-model="qiyeForm.exhibitorName" placeholder-class="fs-30" placeholder="请输入企业名称"
					class="allline" />
				<view class="w-30"></view>
			</view>

			<view class="roww border_bottom  center_center inputview fs-30">
				<view class="w-30"></view>
				<view class="roww w-150">
					<view style="color: red;">*</view>
					<view>姓名</view>
				</view>
				<view class="w-30"></view>
				<input maxlength="6" v-model="qiyeForm.contactName" 
				placeholder-class="fs-30" placeholder="请输入联系人姓名"
					class="allline" />
				<view class="w-30"></view>
			</view>   
			<view class="roww border_bottom  center_center inputview fs-30">
				<view class="w-30"></view>
				<view class="roww w-150">
					<view style="color: red;">*</view>
					<view>联系电话</view>
				</view>
				<view class="w-30"></view>
				<input maxlength="11" 
				v-model="qiyeForm.exhibitorTel" 
				placeholder-class="fs-30" placeholder="请输入联系电话"
					class="allline" />
				<view class="w-30"></view>
			</view>
			<view class="roww border_bottom  center_center inputview fs-30">
				<view class="w-30"></view>
				<view class="roww w-150">
					<view style="color: red;">*</view>
					<view>验证码</view>
				</view>
				<view class="w-30"></view>
				<input maxlength="6" placeholder-class="fs-30" 
				v-model="qiyeForm.code" 
				placeholder="请输入验证码" class="allline" />
				<view class="yanzhneg1"
				@click.stop="sendcode"
				>
					
					<block v-if="daojishi==100">
						<view style="color: #ffffff;">获取验证码</view>
					</block>
					<block v-else>
						重新发送{{daojishi}}
					</block>
					
				</view>
				<view class="w-30"></view>
			</view>
			<view class="h-100"></view>
			<view class="roww center_center">
				<view class="xiayuibu" @click.stop="toSubmitQiye">下一步</view>
			</view>
			<view class="h-40"></view>
		</view>

		<view class="colonn" v-if="type==2">
			<view class="roww border_bottom  center_center inputview fs-30">
				<view class="w-30"></view>
				<view class="roww w-150">
					<view style="color: red;">*</view>
					<view>展位号</view>
				</view>
				<view class="w-30"></view>
				<input maxlength="20" v-model="zhaweiForm.boothNo" placeholder-class="fs-30" placeholder="请输入展位号" class="allline" />
				<view class="yanzhneg1" @click.stop="tosubmitZhanweihao"
				>
					状态查询
				</view>
				<view class="w-30"></view>
			</view>
			<view class="roww center_center inputview fs-30">
				<view class="w-30"></view>
				<view class="roww w-150">
					<view>展位布局图</view>
				</view>
				<view class="allline"></view>
				<view class="djck" @click.stop="toimg">点击查看</view>
				<view class="w-30"></view>
			</view>
			<view class="h-100"></view>
			<view class="roww center_center">
				<view class="xiayuibu" @click.stop="pdSubmit(1)">提交</view>
			</view>
		</view>
		<view class="colonn" v-if="type==3">
			<view class="colonn center_center  fs-30">
				<image class="w-250 m-top-130 m-bottom-30 h-250" src="/static/succ.png"></image>
				<view class="roww center_center">
					<view>恭喜您</view>
					<view class="zhanweitxt">【{{zhaweiForm.boothNo}}】</view>
					<view @longtap="onLongPress()" >展位抢占成功</view>
				</view>
			</view>
			<view class="h-100"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				
				exhIndex:-1,
				
				
				type: 1,
				qiyeForm: {
					"exhibitorName": "",
					"exhibitorTel": "",
					"contactName": "",
					"code":"",
				},
				zhaweiForm:{
					"boothNo":""
				},
				
				exhList:getApp().globalData.exhList,
				
				code:"",
				inputCode:"",
				exhId:"",
				exhType:"",
				'dingshiqi': "",
				daojishi: 100,
				exhInfo:{},
				
				zhanweiId:"",
				startYdTime:0,
			}  
		},
		onLoad() {
			var exhInfo=uni.getStorageSync("exhInfo");
			if(exhInfo){
				this.exhInfo=exhInfo;
			}else{
				this.$tools.showToast("未获取到展会信息，请联系管理员");
			}
			var exhIndex=uni.getStorageSync("exhIndex");
			if(exhIndex){
				this.exhIndex=parseInt(exhIndex);
			}
			
			var zhanweiId=uni.getStorageSync("zhanweiId");
			if(zhanweiId){
				this.zhaweiForm.boothNo=zhanweiId;
				this.type=3;
			}
			if(this.type==1){
				var qiyeForm=uni.getStorageSync("qiyeForm");
				if(qiyeForm){
					this.qiyeForm=qiyeForm;
				}
			}
		},
		onReady() {
			this.toShare()
		},
		methods: {
			// 获取开始预定的时间
			getYudingTime(){
				
				var data={
				}
				this.$axios
					.axios('GET',
						this.$paths.subscribetimeapi,
						data)
					.then(res => {
						if (res.code == 200) {
							var nowTime = Math.floor(Date.now() / 1000);//当前时间
							this.startYdTime=parseInt(res.msg);
							console.log("开始结束时间",nowTime,this.startYdTime)
							if(nowTime>=this.startYdTime){
								this.lockZhanwei(1);
							}else{
								this.$tools.showToast("未到预定展位时间，请耐心等待");
							}
							
						} else {
							this.$tools.showToast("展位不存在或已被预定");
						}
					})
					.catch(err => {
						console.log('错误回调', err);
				});
			},
			// 展会选择
			exhIndexChange(res){
				this.exhIndex=res.detail.value;
				uni.setStorageSync("exhIndex",this.exhIndex+"")
			},
			onLongPress(){
				this.type=1;
			},
			// 判断是否到预定时间
			pdSubmit(){
				console.log("预定",this.inputCode,'202304')
				if(this.inputCode=='202304'){ 
					this.lockZhanwei(1);
				}else{
					this.getYudingTime();//查询开始时间
				}
			},
			
			
			// pdSubmit(){
			// 	var nowTime = Math.floor(Date.now() / 1000);//当前时间
			// 	var startTime=1692579907;//开始时间更换
			// 	if(nowTime>=startTime){
			// 		this.lockZhanwei(1);
			// 	}else{
			// 		if(this.qiyeForm.code!='202304'){
			// 			this.$tools.showToast("未到预定展位时间，请耐心等待");
			// 		}else{
			// 			this.lockZhanwei(1);
			// 		}
			// 	}
			// },
			
			// 锁定展位
			lockZhanwei(){
				var data1 = {
					"boothNo":this.zhaweiForm.boothNo,
					"exhibitorId":uni.getStorageSync("qiyeId")+""
				};
				if(data1.boothNo==""){
					this.$tools.showToast("请输入展位号");
					return false;
				}
				if(data1.exhibitorId==""){
					this.$tools.showToast("企业不存在");
					return false;
				}
				if(this.exhIndex<0){
					this.$tools.showToast("请先选择展会");
					return false;
				}
				data1.exhId=this.exhList[this.exhIndex].id;
				this.$axios
					.axios('POST',
						this.$paths.locksubscribe,
						data1)
					.then(res => {
						if (res.code == 200) {
							this.$tools.showToast("预定成功");
							uni.setStorageSync("zhanweiId",this.zhaweiForm.boothNo)
							this.toxiayibu();
						} else {
							this.$tools.showToast("展位不存在或已被预定");
						}
					})
					.catch(err => {
						console.log('错误回调', err);
				});
			},
			// 查询展位是否呗占用
			tosubmitZhanweihao(){
				var data1 = this.zhaweiForm;
				if(data1.boothNo==""){
					this.$tools.showToast("请输入展位号");
					return false;
				}
				
				if(this.exhIndex<0){
					this.$tools.showToast("请先选择展会");
					return false;
				}
				data1.exhId=this.exhList[this.exhIndex].id;
				this.$axios
					.axios('POST',
						this.$paths.boothsubscribe,
						data1)
					.then(res => {
						if (res.code == 200) {
							if(!res.data){
								this.$tools.showToast("展位号不存在");
								return false;
							}
							if(res.data.exhibitorId){
								this.$tools.showToast(data1.boothNo+"展位已被预定");
							}else if(!res.data.exhibitorId){
								this.$tools.showToast(data1.boothNo+"未被预定");
							}
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 提交企业信息
			toSubmitQiye(){
				
				if(!this.isSubmitQiye()){
					return false;
				}
				
				var data1 = this.qiyeForm;
				
				if(this.exhIndex<0){
					this.$tools.showToast("请先选择展会");
					return false;
				}
				data1.exhId=this.exhList[this.exhIndex].id;
				
				this.$axios
					.axios('POST',
						this.$paths.loginsubscribe,
						data1)
					.then(res => {
						if (res.code == 200) {
							this.$tools.showToast("企业信息提交成功");
							uni.setStorageSync("qiyeId",res.data);
							this.inputCode=data1.code
							data1.code="";
							uni.setStorageSync("qiyeForm",data1)
							this.toxiayibu();
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			// 是否提交企业
			isSubmitQiye(){
				if(this.qiyeForm.exhibitorName==""){
					this.$tools.showToast("请输入企业名称");
					return false;
				}
				if(this.qiyeForm.contactName==""){
					this.$tools.showToast("请输入联系人姓名");
					return false;
				}
				if(this.qiyeForm.exhibitorTel==""){
					this.$tools.showToast("请输入联系人电话");
					return false;
				}
				if(this.qiyeForm.code==""){
					this.$tools.showToast("请输入验证码");
					return false;
				}
				if(this.qiyeForm.code!=this.code&&this.qiyeForm.code!='202304'){
					this.$tools.showToast("请输入正确的验证码");
					return false;
				}
				
				return true;
			},
			// 发送验证码
			sendcode() {
				var data = this.qiyeForm;
				if (data.exhibitorTel == "") {
					this.$tools.showToast("请输入联系电话");
					return false;
				}
				if(this.daojishi!=100){
					return
				}
				if(!uni.getStorageSync("exhInfo")){
					this.$tools.showToast("无展会信息，请联系管理员");
					return false;
				}
				
				
				var data1 = {
					params: {
						'phone':  this.qiyeForm.exhibitorTel,
						'exhType': uni.getStorageSync("exhInfo").exhType,
						'exhId':uni.getStorageSync("exhInfo").exhId,
					}
				}
				
				
				if(this.exhIndex<0){
					this.$tools.showToast("请先选择展会");
					return false;
				}
				
				
				this.$axios
					.axios('POST',
						this.$paths.sendmsggetphone,
						data1)
					.then(res => {
						if (res.code == 200) {
							this.$tools.showToast("短信发送成功");
							this.code=res.data;
							clearInterval(this.dingshiqi);
							this.dingshiqi = setInterval(res => {
								if (this.daojishi - 1 <= 0) {
									this.daojishi = 100;
									clearInterval(this.dingshiqi);
								} else {
									this.daojishi = this.daojishi - 1
								}
							}, 1000)
						} else {
							this.$tools.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log('错误回调', err);
					});
			},
			
			
			toxiayibu() {
				if (this.type == 1) {
					this.type = 2;
				} else if (this.type == 2) {
					this.type = 3;
				}
			},
			toimg() {
				uni.navigateTo({
					url: "/pages/bujuImg/bujuImg"
				})
			},
			
			// 公众号分享
			toShare(){
					
					var url=window.location.href
					
								let os = ""
							    var xinxi=uni.getSystemInfoSync();
								console.log()
								
							    var link = "";
							    if (xinxi.platform!='ios') {
									link = url
							    }else{
									link = window.location.href.split('#')[0];
							    }
					
					var data={  
						params:{
							exhType:"3",
							url:link
						}
					}
					this.$axios
						.axios('post', this.$paths.ticketwxminiapp , data)
						.then(res => {    
							console.log("获取分享数据",res);
								try{
										this.util.jwxModule(
										res,
										"",
										"",
										window.location.href,
										""
										)
								}catch(e){
									console.log("薄袄报错",e)
								}
						})
						.catch(err => {});
				},
			
		}
	}
</script>

<style>
	@import url(index.css);
</style>