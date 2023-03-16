<template>
	<view class="content" :style="{ 'padding-top':paddiingTop+'px' }">
		<header-top  :isFixed="true" bg='#D4EFEE'>
			<template v-slot:left>
			  <view class="seting">
			  	<image src="../../static/act.png" mode=""></image>
			  </view>
			</template>
			<template v-slot:content>
			  <view class="header-title">
			  	消息
			  </view>
			</template>
			<template v-slot:right>
			  <view class="seting">
			  	<image src="../../static/act.png" mode=""></image>
			  </view>
			</template>
		</header-top>
		
		
		
		<view class="list">
			<!-- 你好手机客户端个卡号上公开 {{ paddiingTop }} -->
			<view class="item">
				<user-card :list= "navs_list"></user-card>
			</view>
		</view>
		<view class="mess-list">
			<view class="mess-list-item" v-for="(item,index) in 5">
				<view class="mess-list-item-left">
					<view class="item-img">
						<image src="../../static/logo.png" mode=""></image>
						<view class="item-img-icon">
							老师
						</view>
						<view class="item-img-num">
							12
						</view>
					</view>
					<view class="item-title">
						<view class="item-title-name">
							你好
						</view>
						<view class="item-title-text">
							你好阿克苏结婚的高科技化
						</view>
					</view>
				</view>
				<view class="mess-list-item-right">
					9:00
				</view>
			</view>
			
		</view>
	</view>
</template>

<script setup>
	import { MESSAGE_NAVS } from "@/common/constStatic.js"
 	import { onReachBottom,onReady } from '@dcloudio/uni-app'
	import { ref } from "vue"
	const navs_list = ref(MESSAGE_NAVS)
	
	const paddiingTop = getApp().globalData.statusBarHeight+45;
	
	onReachBottom(()=>{
		console.log(uni.getSystemInfoSync().windowHeight)
	})
	onReady(()=>{
		
	})
</script>

<style lang="scss" scoped>
.content{
	background: #D4EFEE;
	box-sizing: border-box;
	min-height: 100vh;

	.list{
		padding: 30rpx 0;
	}
	.header-title{
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
	.mess-list{
		background: #EDF8F8;
		padding: 0rpx 30rpx 30rpx 30rpx;
		border-radius: 20rpx 20rpx 0 0;
		.mess-list-item{
			border-bottom: 1rpx solid #D9F0EF;
			display: flex;
			justify-content: space-between;
			padding: 30rpx 0;
			.mess-list-item-left{
				display: flex;
				.item-img{
					width: 100rpx;
					height: 100rpx;
					margin-right: 20rpx;
					image{
						display: block;
						width: 100%;
						height: 100%;
					}
					position: relative;
					.item-img-icon{
						position: absolute;
						bottom: -10rpx;
						left: 50%;
						font-size: 20rpx;
						background: #000;
						border-radius: 20rpx;
						width: 80rpx;
						text-align: center;
						color: #fff;
						transform: translateX(-50%);
					}
					.item-img-num{
						position: absolute;
						top: -10rpx;
						right: -10rpx;
						font-size: 24rpx;
						border-radius: 50%;
						background: red;
						color: #fff;
						width: 40rpx;
						height: 40rpx;
						text-align: center;
						line-height: 40rpx;
						font-weight: bold;
					}
				}
				.item-title{
					.item-title-name{
						padding-bottom: 10rpx;
					}
					.item-title-text{
						font-size: 24rpx;
					}
				}
			}
			.mess-list-item-right{
				font-size: 24rpx;
			}
		}
	}
}
</style>
