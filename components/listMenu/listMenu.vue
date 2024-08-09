<template>
	<view>
		<view class="roww center_center  background1 border_bottom" style="padding:20rpx 10rpx;width: 730rpx;"
		@click="click" >
			<image class="images" :src="leftIcon"></image>
			<view style="font-size: 25rpx;">{{ title }}</view>
			<view class="allline"></view>
			<view style="font-size: 25rpx;">{{ rightTxt }}</view>
			<view>  </view>
			<image class="youjiantou" src="../../static/youjiantou12.png" v-if="isright"></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	// 此处定义传入的数据
	props: {
		'leftIcon':{
			type: String,
			value: ''
		},
		title: {
			type: String,
			value: ''
		},
		rightTxt: {
			type: String,
			value: ''
		},
		isright: {
			type: String,
			value: ''
		},
	},
	methods:{
		click(){
			this.$emit("click",{})
		}
	}
};
</script>

<style>
.images {
	width: 50rpx;
	height: 50rpx;
	margin-right: 15rpx;
}
.youjiantou {
	width: 30rpx;
	height: 30rpx;
	margin-bottom:10rpx;
}
</style>
