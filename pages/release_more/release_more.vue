<template>
	<view class="content" :style="{ 'padding-top': paddingTop + 'px' }">
		<view class="content-header">
			<header-top bg="#D4EFEE" :isFixed="true">
				<template v-slot:left>
					<view class="returnbtn" @click="returnPage"><image src="../../static/rt.png" mode="aspectFill"></image></view>
				</template>
				<template v-slot:content>
					<view class="title">查看更多</view>
				</template>
			</header-top>
		</view>

		<view class="content-box">
			<view class="item" v-for="(item, index) in list" :key="index" @click="goDetails(item)">
				<image :src="item.thumb[0]" mode=""></image>
				<text>{{ item.name }}</text>
				<view class="icon">待上课</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onReachBottom, onLoad } from '@dcloudio/uni-app';
import { getRelease } from '@/common/request/api.js';
import { SUCCESS_CODE } from '@/common/request/httpStatus.js';
import { reactive, ref } from 'vue';
const paddingTop = getApp().globalData.statusBarHeight + 45;

const initData = reactive({
	page: 1,
	list_rows: 10
});
const last_page = ref(1);

const list = ref([]);

onLoad(() => {
	release(initData);
});
// 页面触底加载更多
onReachBottom(() => {
	if (initData.page < last_page.value) {
		initData.page = initData.page + 1;
		console.log(initData);
		release(initData);
	}
});

// 获取发布
const release = async params => {
	const data = await getRelease({ ...params });
	if (data.code === SUCCESS_CODE) {
		list.value = [...list.value, ...data.data.data];
		last_page.value = data.data.last_page;
	}
};

// 详情
const goDetails = item => {
	uni.navigateTo({
		url:`/pages/details/details?id=${item.aid}&user_id=${item.user_id_2}`
	});
};
const returnPage = () => {
	uni.navigateBack({
		delta: 1
	});
};
</script>

<style lang="scss" scoped>
.content {
	background: #d4efee;
	min-height: 100vh;
	padding: 0 32rpx;
	box-sizing: border-box;

	.content-header {
		.returnbtn {
			width: 40rpx;
			height: 40rpx;
			image {
				display: block;
				width: 100%;
				height: 100%;
			}
			&.rightbtn {
				width: 48rpx;
				height: 48rpx;
			}
		}

		.title {
			color: #333333;
		}
	}
	.content-box {
		.item {
			display: flex;
			padding: 32rpx 24rpx;
			background: #c3e8e9;
			align-items: center;
			margin-bottom: 20rpx;
			border-radius: 16rpx;
			image {
				display: block;
				width: 100rpx;
				height: 100rpx;
			}
			text {
				padding-left: 24rpx;
				font-size: 32rpx;
				color: #151515;
			}
			.icon {
				color: #fff;
				font-size: 24rpx;
				padding: 0rpx 16rpx;
				background: #50d5a1;
				margin-left: 12rpx;
				height: 40rpx;
				line-height: 40rpx;
				border-radius: 20rpx 20rpx 20rpx 0;
			}
		}
	}
}
</style>
