<template>
	<view class="content" :style="{ 'padding-top': paddingTop + 'px' }">
		<view class="content-header">
			<header-top bg="#D4EFEE" :isFixed="true">
				<template v-slot:left>
					<view class="returnbtn" @click="returnPage"><image src="../../static/rt.png" mode="aspectFill"></image></view>
				</template>
				<template v-slot:content>
					<view class="title">详情</view>
				</template>
				<template v-slot:right>
					<view class="returnbtn rightbtn" @click="returnPage"><image src="../../static/details/fx.png" mode="aspectFill"></image></view>
				</template>
			</header-top>
		</view>

		<view class="content-box" v-if="!detailsData.details"></view>
		<view class="content-box" v-else>
			<view class="swiper-box">
				<swiper class="swiper" :style="`height:  510rpx;`" circular indicator-dots="true" autoplay="true" interval="true" duration="2000">
					<swiper-item v-for="(item, index) in detailsData.details.thumb" :key="index">
						<view class="swiper-item" :style="`height: 510rpx;`"><image :src="item" style="display: block;width: 100%;height: 100%;" mode="aspectFill"></image></view>
					</swiper-item>
				</swiper>
			</view>
			<view class="item" :class="useDetails.user_type === 2 ? 'item-title-teach' : ' '">
				<view class="item-title">
					{{ detailsData.details.name }}
					<view class="sc-box">
						<block v-if="detailsData.details.is_follow === 0">
							<view class="sc-icon" @click=" scFn(true) "><image src="@/static/details/sc.png" mode="aspectFill"></image></view>
							<view class="sc-text">收藏</view>
						</block>
						<block v-if="detailsData.details.is_follow === 1">
							<view class="sc-icon" @click="scFn(false) "><image src="@/static/details/scyes.png" mode="aspectFill"></image></view>
							<view class="sc-text">取消收藏</view>
						</block>
					</view>
				</view>
				<view class="item-title-cont" v-if="useDetails.user_type !== 2">
					<view class="item-title-cont-left" @click="goTeacher">
						<image :src="detailsData.details.head_img" mode="aspectFill"></image>
						<view class="item-title-cont-tea">
							<view class="item-title-cont-teaname">{{ detailsData.details.user_name }}</view>
							<view class="item-title-cont-teasdf">发布时间: {{ detailsData.details.create_time }}</view>
						</view>
					</view>
					<view class="item-title-cont-right">
						<view class="gz" v-if="detailsData.details.is_collection === 0" @click="userFollowFn">关注</view>
						<view class="gz" v-if="detailsData.details.is_collection === 1" @click="userFollowFn">已关注</view>
					</view>
				</view>
			</view>

			<view class="item">
				<view class="mess">
					<view class="mess-icon"><image src="@/static/details/iconuser.png" mode=""></image></view>
					<view class="mess-title">报名人数：{{ detailsData.details.num }}/{{ detailsData.details.enroll }}</view>
				</view>
				<view class="mess">
					<view class="mess-icon"><image src="@/static/details/time.png" mode=""></image></view>
					<view class="mess-title">授课时间：{{ detailsData.details.study_time }}</view>
				</view>
				<view class="mess">
					<view class="mess-icon"><image src="@/static/details/adr.png" mode=""></image></view>
					<view class="mess-title">{{ detailsData.details.learnarea_address }} | {{ detailsData.details.enroll < 4 ? '小教室' : '大教室' }}</view>
				</view>
			</view>

			<view class="item">
				<view class="title">
					<view>课程介绍</view>
					<view></view>
				</view>
				<view class="text-box">{{ detailsData.details.brief }}</view>
			</view>

			<view class="item">
				<view class="title">
					<view>课程详情</view>
					<view></view>
				</view>
				<view class="text-box">{{ detailsData.details.content }}</view>
			</view>

			<!-- 报名 -->
			<view class="item" v-if="detailsData.details.info.length">
				<view class="title">
					<view>已报名人员</view>
					<view>{{ detailsData.details.num }}/{{ detailsData.details.enroll }}</view>
				</view>
				<view class="user_learn">
					<view class="user_learn-item" v-for="(item, index) in detailsData.details.info" :key="index">
						<view class="user_learn-item-img"><image :src="item.user_head_img" mode=""></image></view>
						<view class="user_learn-item-name">{{ item.user_nickname }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content-bottom">
			
			<view class="bottom-box" >
				<!-- 发布课程的老师 与 当前用户老师 是同一个人 -->
				<block v-if="useDetails.user_type === 2 && user_id == useDetails.id">
					<view class="btn bg" style="background: #909FA3;" @click="autoCourseCancelCourseFn">取消课程</view>
					<view class="btn" @click="edtit">编辑</view>
				</block>
				<block v-else>
					<view class="btn bg">联系老师</view>
					<view class="btn" @click="ImmediateRegistration" v-if="detailsData.details?.is_enroll === 0">立即报名</view>
					<view class="btn" @click="ImmediateRegistration" v-if="detailsData.details?.is_enroll === 1">取消报名</view>
				</block>
				
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { onReachBottom, onLoad, onShow } from '@dcloudio/uni-app';
import {
	getCourseDetailsTeacher,
	getCourseDetailsUser,
	autoEnrolllogEnroll,
	userFollow,
	userAddonsSetCollection,
	userAddonsCancelCollection,
	autoCourseCancelCourse
} from '@/common/request/api.js';
import { SUCCESS_CODE } from '@/common/request/httpStatus.js';
import { timeHours } from '@/tools/index.js';
import { HOURS_AFTER_TEXT, HOURS_BEFORE_TEXT } from '@/common/constStatic.js';
import { useStore	} from 'vuex'


const store = useStore()

const paddingTop = getApp().globalData.statusBarHeight + 45;

const aid = ref('');
const user_id = ref('')
const useDetails = ref(null);


onLoad(options => {
	const user = JSON.parse(uni.getStorageSync('user'));
	aid.value = options.id;
	user_id.value = options.user_id
	useDetails.value = user;
	init(user);
});

const init = async (user) => {
	// 初始化详情数据  用户id  与 课程发布老师的id 一致 就走 课程老师的详情  其他都走 普通学生的详情 
	let result = null
	if(user.user_type ===2  && user.id == user_id.value){
		console.log("老师")
	   result = await getCourseDetailsTeacher({
			aid: aid.value
		});
	}else{
		console.log('学生')
		result  = await getCourseDetailsUser({
			aid: aid.value
		});
	}
	if (result.code === SUCCESS_CODE) {
		detailsData.details = result.data;
	}
};
const detailsData = reactive({
	details: null
});
const scFn = async (flag) => {
	let result = null
	if(flag){
		result = await userAddonsSetCollection({
			course_id: detailsData.details.aid
		});
	}else{
		 result = await userAddonsCancelCollection({
			course_id: detailsData.details.aid
		});
	}
	if (result.code === SUCCESS_CODE) {
		const user = JSON.parse(uni.getStorageSync('user'));
		init(user);
	}
}

// 取消课程
const autoCourseCancelCourseFn = () => {
	uni.showModal({
		title: '提示',
		content: timeHours(3, detailsData.details.lesson_time) ? HOURS_BEFORE_TEXT : HOURS_AFTER_TEXT,
		success: res => {
			if (res.confirm) {
				httpAutoCourseCancelCourse();
			} else if (res.cancel) {
				console.log('用户点击取消');
			}
		}
	});
};
// 取消课程请求
const httpAutoCourseCancelCourse = async () => {
	const data = await autoCourseCancelCourse({
		aid: aid.value
	});
	if (data.code === SUCCESS_CODE) {
		uni.navigateTo({
			url: '/pages/release_more/release_more'
		});
	} else {
		uni.showToast({
			icon: 'none',
			title: data.msg
		});
	}
};
// 关注
const userFollowFn = async () => {
	const data = await userFollow({
		user_id: detailsData.details.user_id_2
	});
	if (data.code === SUCCESS_CODE) {
		const user = JSON.parse(uni.getStorageSync('user'));
		init(user);
	}
};
// 立即报名
const ImmediateRegistration = async () => {
	const data = await autoEnrolllogEnroll({
		course_id: aid.value
	});
	if (data.code === SUCCESS_CODE) {
		const user = JSON.parse(uni.getStorageSync('user'));
		init(user);
	}
};
// 去老师主页
const goTeacher = () => {
	uni.navigateTo({
		url: '/pages/teacher_index/teacher_index?id=' + detailsData.details.user_id_2
	});
};

const returnPage = () => {
	uni.navigateBack({
		delta: 1
	});
};

const edtit = () => {
	store.commit('hxData',detailsData.details)
	uni.navigateTo({
		url:'/pages/release/release'
	})
}

</script>

<style lang="scss" scoped>
.content {
	height: 100vh;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;

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
		flex: 1;
		background: #bde5e3;
		overflow: auto;

		.item {
			background: #d4efee;
			padding: 32rpx;
			margin-bottom: 20rpx;
			position: relative;
			&.item-title-teach {
				margin-bottom: 0;
				border-bottom: 1rpx solid #bfe2e1;
				padding-bottom: 50rpx;
			}
			.sc-box {
				position: absolute;
				right: 20rpx;
				top: 30rpx;

				.sc-icon {
					width: 48rpx;
					height: 48rpx;
					margin: 0 auto;

					image {
						display: block;
						width: 100%;
						height: 100%;
					}
				}

				.sc-text {
					color: #2c3034;
					font-size: 24rpx;
				}
			}

			.item-title {
				max-width: 600rpx;
				color: #333333;
				font-size: 36rpx;
			}

			.item-title-cont {
				display: flex;
				justify-content: space-between;
				padding-top: 32rpx;

				.item-title-cont-left {
					display: flex;

					image {
						display: block;
						width: 88rpx;
						height: 88rpx;
						background: red;
						border-radius: 50%;
					}

					.item-title-cont-tea {
						padding-left: 20rpx;

						.item-title-cont-teaname {
							font-size: 32rpx;
							color: #333333;
						}

						.item-title-cont-teasdf {
							color: #666666;
							font-size: 24rpx;
						}
					}
				}

				.item-title-cont-right {
					display: flex;
					justify-content: center;
					align-items: center;

					.gz {
						width: 160rpx;
						height: 64rpx;
						line-height: 64rpx;
						background: #3e87b6;
						text-align: center;
						border-radius: 32rpx;
						color: #fff;
					}
				}
			}

			.title {
				display: flex;
				justify-content: space-between;
				padding-bottom: 32rpx;
			}

			.mess {
				display: flex;
				align-items: center;
				padding-bottom: 10rpx;

				.mess-icon {
					width: 28rpx;
					height: 28rpx;

					image {
						display: block;
						width: 100%;
						height: 100%;
					}
				}

				.mess-title {
					color: #2c3034;
					padding-left: 10rpx;
				}
			}

			.text-box {
				color: #5f6166;
			}

			.user_learn {
				display: grid;
				grid-template-columns: repeat(5, 1fr);
				grid-row-gap: 30rpx;

				.user_learn-item {
					display: flex;
					flex-direction: column;
					align-items: center;

					.user_learn-item-img {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
						overflow: hidden;

						image {
							display: block;
							width: 100%;
							height: 100%;
						}
					}

					.user_learn-item-name {
						padding-top: 12rpx;
						color: #333333;
					}
				}
			}
		}
	}

	.content-bottom {
		.bottom-box {
			width: 100%;
			display: flex;

			.btn {
				width: 50%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				color: #fff;
				background: #3e87b6;

				&.bg {
					background: #6ec2d5;
				}
			}
		}
	}
}
</style>
