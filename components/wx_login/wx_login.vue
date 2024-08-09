<template>
	<view>
		<view class='topView1' style="display:aa;" catchtouchmove="preventTouchMove">
			<view class='getinfoView center_center rowsbl'>
				<text class='text padding1'>微信授权</text>
				<view class='iconimg userinfo-avatar'>
					<open-data type="userAvatarUrl"></open-data>
				</view>
				<view class='text1 padding1'>
					<open-data type="userNickName"></open-data>
				</view>
				<button class='button1' hover-class="btn_hover"
				 catchtap="getuserinfo_btn"
				 >点击登陆</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"wx_login",
		data() {
			return {
				 getinfoisshow: "none",
			};
		}
	}
</script>

<style>

.topView1{         
  position:fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index:10000;
}

.getinfoView{                    
  position: fixed;
  width: 60%;
  height:600rpx;
  margin-left: 20%;
  margin-right: 20%;
  background-color: white;
 padding: 20px 10px 20px 10px;
  border-radius: 10px;
  margin-top: 30%;
}
.iconimg{
  width:70px;
  height:70px;
  border-radius: 70px;
  
}
 
/* 重写按钮 */
.button1 {
   width: 80%;
  color: red;
  border-radius: 10px;
  border:1px solid red;
  text-align: center;
  font-size: 15px;
  background-color: white;
  margin-bottom: 10px;
	padding:-10rpx 0rpx;

}
.btn_hover{
  box-shadow: 0 0 3px #f00;
}
.userinfo-avatar {
  overflow:hidden;
  display: block;
  width: 130rpx;
  height: 130rpx;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
}

.shijianYu{
  font-size: 25rpx;
  color: red;
  text-align: right;
}




</style>
