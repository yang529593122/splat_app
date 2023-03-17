<template>
	<view class="content" :style="{ 'padding-top': paddiingTop + 'px' }">
		<header-top :isFixed="true">
			<template v-slot:content>
				<view class="header-title">学生日程</view>
			</template>
		</header-top>
<view class="rl-content">
		<view class="tl-top">
			<view class="title">
				{{ curTime }} 课程统计
			</view>
			<view class="list">
				<text>待上课数  <text style="color: #FDA33B;">{{ wait_list.length }}</text> </text>
				<text style="color: #A7C9DF;"> ｜ </text>
				<text>已完成数   <text style="color: #3E87B6;">{{ finish_list.length }}</text> </text>
			</view>
		</view>
		<view
			class="rl-box"
			:class="{
				'expansion_calendar': is_expansion_calendar
			}"
		>
			<u-calendar
				:showMonth="false"
				:selected="selected_list"
				@change="change"
			/>
		</view>
		<view class="rl-zk-btn"> <image @click="set_expansion_calendar" src="@/static/schedule/zk.png" mode=""></image> </view>
		<view class="rl-bottom">
			<view class="Wait-for-class text">待上课</view>
			<view class="finish-class text">已完成</view>
		</view>
		</view>
		<!-- 学生 -->
		<blockquote>
			<view class="course-box-list"><schedule-course-card v-for="(item, index) in list" :key="index" :data="item" @cancel="cancelFn"/></view>
		</blockquote>
		
		
			<!-- <view class="course-box-list"><schedule-course-card v-for="(item, index) in 5" :key="index" /></view>
			<view class="course-box-list"><schedule-course-card v-for="(item, index) in 5" :key="index" /></view> -->
			
			
	</view>
</template>

<script setup>
import { onReachBottom, onLoad } from '@dcloudio/uni-app';
import { MAY_INFO_NAVS, MAY_APP_NAVS } from '@/common/constStatic.js';
import { SUCCESS_CODE } from '@/common/request/httpStatus.js';
import { ref,reactive, computed } from 'vue';
import { autoEnrolllogGetRichengList, autoCourseGetTeacherRicheng,autoEnrolllogEnroll } from '@/common/request/api.js';
const paddiingTop = getApp().globalData.statusBarHeight + 45;




const initData = reactive({
	page: 1,
	list_rows: 5
});
const last_page = ref(1);

const list = ref([]);
const wait_list = ref([])
const finish_list = ref([])
const selected_list = ref([])

const curTime = computed(()=>{
	let year = new Date().getFullYear()
	let month = new Date().getMonth()+1
	return year + '年' + month + "月"
})

onLoad(() => {
	init(initData);
});
// 页面触底加载更多
onReachBottom(() => {
	if (initData.page < last_page.value) {
		initData.page = initData.page + 1;
		init(initData);
	}
});

// 获取发布
const init = async params => {
	const data = await autoEnrolllogGetRichengList({ ...params });
	if (data.code === SUCCESS_CODE) {
		list.value = [...list.value, ...data.data.data];
		last_page.value = data.data.last_page;
		wait_list.value = list.value.filter(item => item.status === 1)
		finish_list.value = list.value.filter(item => item.status === 2)
		let arr = []
		list.value.forEach(item => {
			arr.push({
					date: item.lesson_time.split(' ')[0],
					info: '',
					status: item.status,
					data: { custom: '', name: '' }
			})
			
		})
		selected_list.value = arr
	}
};


const change = val => {
	console.log(val);
};


const is_expansion_calendar = ref(false);
const set_expansion_calendar = () => {
	is_expansion_calendar.value = !is_expansion_calendar.value;
};


// 取消报名
const cancelFn = (data) => {
	uni.showModal({
		title: '提示',
		content: '确认取消报名么',
		success: res => {
			if (res.confirm) {
				httpCancelFn(data);
			} else if (res.cancel) {
				console.log('用户点击取消');
			}
		}
	});
};
// 取消报名请求
const httpCancelFn = async (item) => {
	const data = await autoEnrolllogEnroll({
		course_id: item.aid
	});
	if (data.code === SUCCESS_CODE) {
		list.value = []
		initData.page = 1,
		last_page.value = 1
		init(initData);
	} else {
		uni.showToast({
			icon: 'none',
			title: data.msg
		});
	}
	
};

</script>

<style lang="scss" scoped>
.content {
	background: #d4efee;
	box-sizing: border-box;
	min-height: 100vh;
	box-sizing: border-box;
	padding: 0 30rpx;
	padding-bottom: 10rpx;
	.rl-content{
		background: #fff;
		padding: 20rpx;
		margin-bottom: 20rpx;
		border-radius: 16rpx;
	}
	.tl-top{
		background: #EDF4F9;
		border-radius: 26rpx;
		overflow: hidden;
		.title{
			height: 72rpx;
			line-height: 72rpx;
			color: #fff;
			font-size: 24rpx;
			padding-left: 24rpx;
			background: url('@/static/schedule/title.png') no-repeat;
			background-size: contain;
		}
		.list{
			display: flex;
			justify-content: space-around;
			padding: 20rpx;
			font-size: 32rpx;
		}
	}
	.rl-box {
		height: 300rpx;
		overflow: hidden;
	}
	.expansion_calendar {
		height: auto;
		overflow: inherit;
	}
	.rl-zk-btn {
		background: #fff;
		text-align: center;
		padding: 24rpx;
		display: flex;
		justify-content: center;
		image{
			display: block;
			width: 32rpx;
			height: 32rpx;
		}
	}
	.rl-bottom {
		display: flex;
		padding: 20rpx;
		border-top: 1rpx solid #EEEEEE;
		background: #fff;
		.text{
			color: #666666;
			position: relative;
			padding: 0 20rpx;
			&.Wait-for-class::before{
				content: "";
				width: 12rpx;
				height: 12rpx;
				background: #FDA33B;
				border-radius: 50%;
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
			}
			&.finish-class::before{
				content: "";
				width: 12rpx;
				height: 12rpx;
				background: #03C049;
				border-radius: 50%;
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
			}
		}
		
	}
}
</style>
