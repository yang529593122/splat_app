<template>
	<view class="header"  :class="[ isFixed ? 'isFixed' : '' ]" :style="{ 'background': bg }">
		<view class="header-bar"></view>
		<view class="header-content">
			<view class="header-content-left">
				<slot name="left"></slot>
			</view>
			<view class="header-content-center">
				<slot name="content"></slot>
			</view>
			<view class="header-content-right">
				<slot name="right"></slot>
			</view>
		</view>
		<view class="header-content-bottom">
			<slot name="ctx"></slot>
		</view>
	</view>
</template>

<script setup>
	defineProps(['bg','isFixed'])
</script>

<style lang="scss" scoped>
.header{
	background: #D4EFEE;
	&.isFixed{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
	}
	.header-bar{
		height: var(--status-bar-height)
	}
	.header-content{
		padding: 0 20rpx;
		min-height: 88rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
</style>