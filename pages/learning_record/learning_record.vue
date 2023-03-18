<template>
	<view class="home" :style="{ 'padding-top': paddingTop + 'px' }">
		<header-custom-content bg="#D4EFEE" :isFixed="true">
			<template v-slot:left>
				<view class="returnbtn" ><image src="../../static/rt.png" mode="aspectFill"></image></view>
			</template>
			<template v-slot:content>
				<view class="title">学习记录</view>
			</template>
			<template v-slot:ctx>
				<view class="nav">
					<list-navs @change='onChangeFn' :list="LEARNING_RECORD_NAV_DATA"></list-navs>
				</view>
			</template>
		</header-custom-content>
	
		<!-- 课程表 -->
		<view class="course-box">
			<view class="course-box-list"><learning-member-card :list="list"  @delete='deleteItem' /></view>
		</view>

	</view>
</template>

<script setup>
import { onReachBottom, onLoad } from '@dcloudio/uni-app';
import { autoEnrolllogGetStudyLog,autoEnrolllogDelEnrolllog } from '@/common/request/api.js';
import { SUCCESS_CODE } from '@/common/request/httpStatus.js';
import { LEARNING_RECORD_NAV_DATA } from "@/common/constStatic.js"
import { reactive, ref } from 'vue';
const paddingTop = getApp().globalData.statusBarHeight + 100;


onLoad(() => {
	// 初始化
	init(pageDatas);
});

const pageDatas = reactive({
	page: 1,
	list_rows: 5,
	type:0
});
const last_page = ref(1)

onReachBottom(() => {
	if (pageDatas.page < last_page.value) {
		pageDatas.page++;
		autoEnrolllogGetStudyLogData(pageDatas);
	}
});

const init = (params) => {
	autoEnrolllogGetStudyLogData(params);
};



// 获取课程
const list = ref([]);
const autoEnrolllogGetStudyLogData = async params => {
	const data = await autoEnrolllogGetStudyLog(params);
	if (data.code === SUCCESS_CODE) {
		list.value = [...list.value, ...data.data.data];
		last_page.value = data.data.last_page;
	}
};

const goDetails = (item) => {
	uni.navigateTo({
		url:`/pages/details/details?id=${item.aid}&user_id=${item.user_id_2}`
	})
}

const onChangeFn = (item) => {
	pageDatas.page = 1
	pageDatas.type = item.status
	list.value = []
	autoEnrolllogGetStudyLogData(pageDatas)
}

// 删除记录
const deleteItem = async ({ data,index }) => {
	const result = await autoEnrolllogDelEnrolllog({
		course_id:data.course_id
	});
	if (result.code === SUCCESS_CODE) {
		pageDatas.page = 1
		list.value = []
		autoEnrolllogGetStudyLogData(pageDatas)
	}
	
}
</script>

<style lang="scss" scoped>
.home {
	min-height: 100vh;
	background: #d4efee;
	box-sizing: border-box;
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
