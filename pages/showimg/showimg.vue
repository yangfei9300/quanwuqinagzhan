<template>
	<view>
		<scroll-view scroll-x 
		:style="{
			'height':height1+'vh'
		}"
		>
			<image 
			:style="{
				'height':height1+'vh'
			}"
			mode="heightFix" 
			:src="imginfo.img"></image>
		</scroll-view>
		<view class="roww xuanfu"
		>
			<view class="btn" @click="suoxiaoClick(1)">缩小</view>
			<view class="btn1" @click="suoxiaoClick(2)">放大</view>
		</view>
	</view>
</template>

<script>
	export default {  
		data() {
			return {
				imginfo:{},
				height1:100,
			}
		},
		onLoad() {
			this.imginfo=uni.getStorageSync("imginfo")
		},
		methods: {
			suoxiaoClick(type){
				if(type==2){
					this.height1=this.height1+10;
				}else if(type==1){
					if(this.height1>20){
						this.height1=this.height1-10;
					}
				}
			},
		}
	}
</script>

<style>
.btn{
	width: 150rpx;
	height: 50rpx;
	background-color: #009581;
	text-align: center;
	line-height: 50rpx;
	font-size: 30rpx;
	border-radius: 50rpx 0rpx 0rpx 50rpx;
}
.btn1{
	width: 150rpx;
	height: 50rpx;
	background-color: #009581;
	text-align: center;
	line-height: 50rpx;
	font-size: 30rpx;
	color: white;
	border-radius: 0rpx 50rpx 50rpx 0rpx;
}
.xuanfu{
	position: fixed;
	bottom: 20rpx;
	left: 20rpx;
}
</style>
