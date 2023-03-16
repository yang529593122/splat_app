<template>
	<view class="home" :style="{ 'padding-top': paddingTop + 'px' }">
		<header-top :isFixed="true">
			<template v-slot:content>
				<view class="content" @click="goPath">请输入</view>
			</template>
		</header-top>

		<view class="swiper-box">
			<view class="mess">
				<view class="mess-box">
					<image src="../../static/home/gg.png" mode=""></image>
					<view class="mess-box-text">{{ announcementList[0]?.title }}</view>
				</view>
			</view>
			<list-swipers :height="500" :list="bannerLists" />
		</view>
		<!--  -->
		<view class="course-box" v-if="releaseList.length">
			<view class="course-box-title"> <text>我的发布</text> <text style="font-size: 24rpx;font-weight: normal;color: #3E87B6; " @click="moreList">查看更多</text> </view>
			<view class="course-box-fb" @click="goDetails(releaseList[0])">
				<image :src="releaseList[0].thumb[0]" mode="aspectFill"></image>
				<view class="">{{ releaseList[0].name }}</view>
				<view class="tag">待上课</view>
			</view>
		</view>
		<!-- 课程表 -->
		<view class="course-box">
			<view class="course-box-title">课程表</view>
			<view class="course-box-list"><course-card :list="courseList" /></view>
		</view>

	</view>
</template>

<script setup>
import { onReachBottom, onLoad } from '@dcloudio/uni-app';
import { getBanners, getAnnouncement, getRelease, getCourse } from '@/common/request/api.js';
import { SUCCESS_CODE } from '@/common/request/httpStatus.js';
import { reactive, ref } from 'vue';

const paddingTop = getApp().globalData.statusBarHeight + 45;

onLoad(() => {
	// 初始化
	init();
});
const pageDatas = reactive({
	curPage: 1,
	totalPages: 1,
	list_rows: 2
});
onReachBottom(() => {
	if (pageDatas.curPage < pageDatas.totalPages) {
		pageDatas.curPage++;
		course({
			page: pageDatas.curPage,
			list_rows: pageDatas.list_rows
		});
	}
});

const init = () => {
	banners();
	announcement();
	release();
	course({
		page: pageDatas.curPage,
		list_rows: pageDatas.list_rows
	});
};

// 搜索
const goPath = () => {
	uni.navigateTo({
		url: '/pages/search/search'
	});
};
// 获取轮播
const bannerLists = ref([]);
const banners = async () => {
	const data = await getBanners();
	if (data.code === SUCCESS_CODE) {
		bannerLists.value = data.data;
	} else {
	}
};
// 获取公告
const announcementList = ref([]);
const announcement = async () => {
	const data = await getAnnouncement();
	if (data.code === SUCCESS_CODE) {
		announcementList.value = data.data.data;
	} else {
		console.log(data, '公告');
	}
};
// 获取发布
const releaseList = ref([]);
const release = async () => {
	const data = await getRelease();
	if (data.code === SUCCESS_CODE) {
		releaseList.value = data.data.data;
	}
};
// 获取课程
const courseList = ref([]);
const course = async params => {
	const data = await getCourse(params);
	if (data.code === SUCCESS_CODE) {
		courseList.value = [...courseList.value, ...data.data.data];
		pageDatas.totalPages = data.data.last_page;
	}
};
const moreList = () => {
	uni.navigateTo({
		url:'/pages/release_more/release_more'
	})
}
const goDetails = (item) => {
	uni.navigateTo({
		url:`/pages/details/details?id=${item.aid}&user_id=${item.user_id_2}`
	})
}
</script>

<style lang="scss" scoped>
.home {
	min-height: 100vh;
	background: #d4efee;

	.swiper-box {
		padding-top: 10rpx;
		position: relative;
		.mess {
			width: 100%;
			position: absolute;
			left: 0;
			bottom: 0;

			background: rgba(0, 0, 0, 0.6);
			color: #fff;
			font-size: 26rpx;
			padding: 0 30rpx;
			z-index: 12;
			box-sizing: border-box;
			.mess-box {
				display: flex;
				align-items: center;
				height: 80rpx;
				line-height: 80rpx;
				image {
					display: block;
					width: 36rpx;
					height: 36rpx;
				}
				.mess-box-text {
					padding-left: 10rpx;
				}
			}
		}
	}
	.content {
		width: 700rpx;
		box-sizing: border-box;
		padding: 0 50rpx;
		background: #fff;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 30rpx;
		font-size: 24rpx;
		text-align: center;
	}
	.course-box {
		padding: 20rpx;
		.course-box-title {
			font-size: 32rpx;
			font-weight: bold;
			line-height: 80rpx;
			height: 80rpx;
			display: flex;
			justify-content: space-between;
		}
		.course-box-fb {
			border-radius: 20rpx;
			padding: 30rpx;
			background: linear-gradient(to right, #be27fa, #4580fb);
			display: flex;
			align-items: center;
			image {
				display: block;
				width: 100rpx;
				height: 100rpx;
				margin-right: 20rpx;
			}
			font-size: 32rpx;
			font-weight: bold;
			color: #fff;
			.tag {
				height: 46rpx;
				line-height: 46rpx;
				padding: 0 20rpx;
				font-size: 24rpx;
				background: #4ad1a6;
				margin-left: 20rpx;
				border-radius: 23rpx 23rpx 23rpx 0rpx;
			}
		}
	}
}
</style>
