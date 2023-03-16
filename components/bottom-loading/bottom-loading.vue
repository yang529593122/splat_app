<template>
	<view class="loading">
		<image src="../../static/home/loading.png" mode="aspectFill"></image>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped >
.loading{
	display: flex;
	justify-content: center;
	align-items: center;
	padding-bottom: 40rpx;
	image{
		display: block;
		width: 56rpx;
		height: 56rpx;
	}
}
</style>