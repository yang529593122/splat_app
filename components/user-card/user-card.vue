<template>
	<view class="user-card">
		<view class="item" v-for="(item,index) in list" @click='clickEventFn(item,index)'>
			<view class="img">
				<image :src="item.imgUrl" mode=""></image>
			</view>
			<view class="title">
				{{ item.title }}
			</view>
		</view>
	</view>
</template>

<script setup>
	defineProps(["list"])
	const emits = defineEmits([ 'clickEvent' ])
	const clickEventFn = (item,index) => {
		emits('clickEvent', { data:item,index:index })
	}
</script>

<style lang="scss" scoped>
.user-card{
	border-radius: 20rpx;
	padding: 30rpx;
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
	.item{
		padding-top: 10rpx;
		width: 25%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.img{
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			overflow: hidden;
			
			image{
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		.title{
			font-size: 24rpx;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
		}
	}
	
}
</style>