<template>
	<view class="content" :style="{ 'padding-top':paddiingTop+'px' }">
		<header-top  :isFixed="true">
			<template v-slot:content>
			  <view class="header-title">
			  	个人中心
			  </view>
			</template>
			<template v-slot:right>
			  <view class="seting">
			  	<image src="../../static/seting.png" mode=""></image>
			  </view>
			</template>
		</header-top>
		
		<view class="user">
			<view class="user-left">
				<view class="user-img">
					<image src="../../static/act.png" mode=""></image>
				</view>
				<view class="user-names">
					<view class="user-names-title">
						你好
					</view>
					<view class="user-names-text">
						学习能力 23 ｜ 分享 12
					</view>
				</view>
			</view>
			<view class="user-right">
				<image src="../../static/my/right.png" mode="aspectFill" @click="myData"></image>
			</view>
		</view>
		
		<view class="member">
			<view class="member-box">
				<view class="member-left">
					<view class="member-left-one">
						啊黑色的看法好看
					</view>
					<view class="member-left-two">
						啊黑色的看法好看
					</view>
				</view>
				<view class="member-right">
					<view class="btn">
						立即购买
					</view>
				</view>
			</view>
		</view>
		
		<view class="list">
			<!-- 你好手机客户端个卡号上公开 {{ paddiingTop }} -->
			<view class="item">
				<user-card :list="navs_list" @clickEvent='clickEvent'></user-card>
			</view>
			<view class="item">
				<user-card :list='app_navs_list' @clickEvent='clickEvent'></user-card>
			</view>
			
		</view>
	</view>
</template>

<script setup>
	import { onReachBottom,onReady } from '@dcloudio/uni-app'
	import { MAY_INFO_NAVS,MAY_APP_NAVS } from "@/common/constStatic.js"
	import { ref } from "vue"
	const navs_list = ref(MAY_INFO_NAVS)
	const app_navs_list = ref(MAY_APP_NAVS)
	
	const paddiingTop = getApp().globalData.statusBarHeight+45;
	
	onReachBottom(()=>{
		console.log(uni.getSystemInfoSync().windowHeight)
	})
	onReady(()=>{
		// const query = uni.createSelectorQuery().in(this);
		// query.select('#header').boundingClientRect(data => {
		//   // console.log("得到布局位置信息" + JSON.stringify(data));
		//   // console.log("节点离页面顶部的距离为" + data.top);
		// 	console.log(getApp().globalData,222)
			
		// 	paddiingTop.value =  getApp().globalData.statusBarHeight+45
		// }).exec();
	})
	const myData = () => {
		uni.navigateTo({
			url:'/pages/my_data/my_data'
		})
	}
	const clickEvent = (data) => {
		uni.navigateTo({
			url:data.data.page
		})
	}
</script>

<style lang="scss" scoped>
.content{
	background: #D4EFEE;
	box-sizing: border-box;
	min-height: 100vh;
	.user{
		padding: 10rpx 30rpx 30rpx 30rpx;
		display: flex;
		justify-content: space-between;
		.user-left{
			display: flex;
			flex: 1;
			.user-img{
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				image{
					display: block;
					width: 100%;
					height: 100%;
				}
			}
			.user-names{
				padding-left: 20rpx;
				font-size: 24rpx;
				.user-names-title{
					font-size: 32rpx;
				}
				.user-names-text{
					padding-top: 10rpx;
				}
			}
		}
		.user-right{
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				display: block;
				width: 30rpx;
				height: 50rpx;
			}
		}
	}
	.member{
		padding:0 30rpx;
		.member-box{
			display: flex;
			background: #18232C;
			padding: 30rpx;
			border-radius: 20rpx;
			justify-content: space-between;
			.member-left{
				.member-left-one{
					font-size: 32rpx;
					color: #FFD1A5;
				}
				.member-left-two{
					padding-top: 10rpx;
					font-size: 24rpx;
					color: #AF9E94;
				}
			}
			
			.member-right{
				display: flex;
				align-items: center;
				justify-content: center;
				.btn{
					font-size: 24rpx;
					background: yellow;
					padding: 6rpx 8rpx;
					border-radius: 10rpx;
				}
			}
		}
	}
	.list{
		padding: 30rpx;
		.item{
			margin-bottom: 30rpx;
			background: #fff;
			border-radius: 20rpx;
		}
	}
	.header-title{
		color: #fff;
	}
	.seting{
		width: 50rpx;
		height: 50rpx;
		image{
			display: block;
			width: 100%;
			height: 100%;
		}
	}
}
</style>
