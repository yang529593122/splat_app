<template>
	<view class="bottom-navs">
		<view class="bottom-navs-list">
			<view class="bottom-navs-item" @click="selectNav(0,'/pages/home/home')">
				<view class="bottom-navs-item-icon">
					<image v-if="active===0" src="../../static/act.png" mode="aspectFill"></image>
					<image v-else src="../../static/logo.png" mode="aspectFill"></image>
				</view>
				<view class="bottom-navs-item-text" :class="[active === 0 ? 'actived' :'']">
					首页
				</view>
			</view>
			<view class="bottom-navs-item" @click="selectNav(1,'/pages/schedule/schedule')">
				<view class="bottom-navs-item-icon">
					<image v-if="active===1" src="../../static/act.png" mode="aspectFill"></image>
					<image v-else src="../../static/logo.png" mode="aspectFill"></image>
				</view>
				<view class="bottom-navs-item-text" :class="[ active === 1 ? 'actived' :'']">
					日程
				</view>
			</view>
			<view class="bottom-navs-item" @click="selectNav(2,'/pages/release/release')">
				<view class="bottom-navs-item-icon">
					<image v-if="active===2" src="../../static/act.png" mode="aspectFill"></image>
					<image v-else src="../../static/logo.png" mode="aspectFill"></image>
				</view>
				<view class="bottom-navs-item-text" :class="[active === 2 ? 'actived' :'']">
					发布
				</view>
			</view>
			<view class="bottom-navs-item" @click="selectNav(3,'/pages/message/message')">
				<view class="bottom-navs-item-icon">
					<image v-if="active===3" src="../../static/act.png" mode="aspectFill"></image>
					<image v-else src="../../static/logo.png" mode="aspectFill"></image>
				</view>
				<view class="bottom-navs-item-text" :class="[active === 3 ? 'actived' :'']">
					消息
				</view>
			</view>
			<view class="bottom-navs-item" @click="selectNav(4,'/pages/my/my')">
				<view class="bottom-navs-item-icon">
					<image v-if="active===4" src="../../static/act.png" mode="aspectFill"></image>
					<image v-else src="../../static/logo.png" mode="aspectFill"></image>
				</view>
				<view class="bottom-navs-item-text" v-bind:class="[ active === 4 ? 'actived' :'']">
					我的
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {ref} from "vue"
	const active = ref(0)
	const selectNav = (val,url) => {
		console.log(active.value)
		active.value  = val
		uni.switchTab({
			url:url
		})
	}
</script>

<style lang="scss" scoped>
	image{
		display: block;
		width: 100%;
		height: 100%;
	}
.bottom-navs{
	position: fixed;
	left: 0;
	width: 100%;
	bottom: env(safe-area-inset-bottom);
	.bottom-navs-list{
		display: flex;
		justify-content: space-around;
		background: #fff;
		padding: 20rpx 0 10rpx 0 ;
		.bottom-navs-item{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.bottom-navs-item-icon{
				width: 40rpx;
				height: 40rpx;
			}
			.bottom-navs-item-text{
				font-size: 24rpx;
				padding-top: 10rpx;
				&.actived{
					color: red;
				}
			}
		}
	}
	
}
</style>