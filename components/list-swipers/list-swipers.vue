<template>
		<swiper class="swiper" :style="`height: ${height || 300}rpx;`" circular :indicator-dots="data.indicatorDots" :autoplay="data.autoplay" :interval="data.interval"  :duration="data.duration">
			<swiper-item v-for="(item,index) in list" :key="index">
				<view class="swiper-item" :style="`height: ${height || 300}rpx;`">
					<image :src="item.thumb" mode="aspectFill"></image>
					
				</view>
			</swiper-item>
		</swiper>
</template>

<script setup>
	import { reactive } from "vue";
	defineProps(['height','list'])
	const data=reactive({
		indicatorDots: false,
		autoplay: true,
		interval: 2000,
		duration: 500,
	})
</script>

<style lang="scss" scoped>
	.swiper{
		.swiper-item{
			image{
				display: block;
				width: 100%;
				height: 100%;
			}
			
		}
		// ::v-deep .uni-swiper-dots { // 指示点整个区域
		//     bottom: 150rpx;
		// }
		// ::v-deep .uni-swiper-dots-horizontal{
		// 	left: 50%;
		// }
		// ::v-deep .uni-swiper-dot { // 指示点元素默认样式
		//     width: 40rpx;
		//     height: 20rpx;
		//     border: 1rpx solid #E0B079;
		// 		border-radius: 10rpx;
		// }
		// ::v-deep .uni-swiper-dot-active { // 指示点元素激活（当前选中）状态样式
		//     background: #CD9763;
		// }
		
	}

</style>