<template>
	<view>
		<view class="colonn" v-if="exhIndex==0">
			<view class="roww border_bottom" style="padding:25rpx 30rpx;" 
			v-for="(item,index) in list"
				>
				<!-- @click.stop="showimg(item)" -->
				<view>{{item.title}}展位图</view>
				<view class="allline"></view>
				<view style="color: #009581;font-weight: bold;"
				@click.stop="imginfoTo(item)"
				>点击查看</view>
			</view>
		</view>
		<view class="colonn" v-if="exhIndex==1">
			<view class="roww border_bottom" style="padding:25rpx 30rpx;" 
			v-for="(item,index) in list1"
				>
				<!-- @click.stop="showimg(item)" -->
				<view>{{item.title}}展位图</view>
				<view class="allline"></view>
				<view style="color: #009581;font-weight: bold;"
				@click.stop="imginfoTo(item)"
				>点击查看</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						title: '1号馆和西广场',
						'img': 'https://meili-media.oss-cn-beijing.aliyuncs.com/zhanweitu/1%E5%8F%B7%E9%A6%86%E5%92%8C%E8%A5%BF%E5%A4%A7%E6%A3%9A.jpg',
					},
					{
						title: '2.1号馆',
						'img': 'https://meili-media.oss-cn-beijing.aliyuncs.com/zhanweitu/2.1%E5%8F%B7%E9%A6%86.jpg',
					}, {
						title: '2.2号馆',
						'img': 'https://meili-media.oss-cn-beijing.aliyuncs.com/zhanweitu/2.2%E5%8F%B7%E9%A6%86.jpg',
					},
					{
						title: '北广场',
						'img': 'https://meili-media.oss-cn-beijing.aliyuncs.com/zhanweitu/%E5%8C%97%E5%B9%BF%E5%9C%BA.jpg',
					}
				],
				
				list1: [{
						title: '1号馆',
						'img': 'https://meili-media.oss-cn-beijing.aliyuncs.com/zhanweitu/j_1%E5%8F%B7%E9%A6%86.jpg',
					},
					{
						title: '2号馆',
						'img': 'https://meili-media.oss-cn-beijing.aliyuncs.com/zhanweitu/j_2%E5%8F%B7%E9%A6%86.jpg',
					}, {
						title: '3号馆',
						'img': 'https://meili-media.oss-cn-beijing.aliyuncs.com/zhanweitu/j_3%E5%8F%B7%E9%A6%86.jpg',
					}
				],
				
				exhList:[],
				exhIndex:-1,
				
			}
		},
		onLoad() {
			this.exhList=getApp().globalData.exhList;
			this.exhIndex=uni.getStorageSync("exhIndex");
		},
		methods: {
			// 图片详情
			imginfoTo(info){
				uni.setStorageSync("imginfo",info);
				uni.navigateTo({
					url:"/pages/showimg/showimg"
				})
			},
			// 显示图片详情
			showimg(info) {
				uni.previewImage({
					urls: [info.img],
					complete: (res) => {
						console.log("撒",res)
					}
				});
			},
		}
	}
</script>

<style>
	@import url(bujuImg.css);
</style>