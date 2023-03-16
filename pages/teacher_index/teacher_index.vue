<template>
	<view class="content" :style="{ 'padding-top':paddingTop+'px' }">
		<view class="content-header">
			<header-top bg='#D4EFEE' :isFixed="true">
				<template v-slot:left>
					<view class="returnbtn" @click="returnPage">
						<image src="../../static/rt.png" mode="aspectFill"></image>
					</view>
				</template>
				<template v-slot:content>
					<view class="title">
						老师主页
					</view>
				</template>
				<template v-slot:right>
					<view class="returnbtn rightbtn">
						<image src="../../static/teacher/dd.png" mode="aspectFill"></image>
					</view>
				</template>
			</header-top>
		</view>

		<!-- 老师信息 -->
		<block v-if="userinfo">
			
		<view class="teacher">
			<view class="teacher-left">
				<view class="teacher-img">
					<image :src="userinfo.head_img" mode="aspectFill"></image>
				</view>
				<view class="teacher-mess">
					<view class="teacher-name">
						{{ userinfo.user_name }}
					</view>
					<view class="teacher-tags">
						<image :src="userinfo.vip" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="teacher-right">
				<view class="teacher-gz" v-if="userinfo.is_collection  === 0" @click="userFollowFn">
					关注
				</view>
				<view class="teacher-gz" v-if="userinfo.is_collection  === 1" @click="userFollowFn">
					已关注
				</view>
				<view class="teacher-fxx">
					发信息
				</view>
			</view>
		</view>

		<!-- 内容 -->
		<view class="list-box">
			<view class="list-box-title">
				课程·3
			</view>
			<view class="list">
				<course-card :list="courseList" />
			</view>
		</view>
		</block>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from "vue";
	import {
		onReachBottom,
		onLoad
	} from '@dcloudio/uni-app'
	import {
		autoCourseGetTeacherInfo,
		userFollow
	} from "@/common/request/api.js"
	import {
		SUCCESS_CODE
	} from "@/common/request/httpStatus.js"

	const paddingTop = getApp().globalData.statusBarHeight + 45;


const pageDatas = reactive({
		curPage:1,
		totalPages:1,
		user_id_2:105,
		list_rows:4
	})

	onLoad((opt) => {
		pageDatas.user_id_2 = opt.id
		init({
			page:1,
			user_id_2:opt.id,
			list_rows:pageDatas.list_rows
		})
	})
	
	onReachBottom(()=>{
		
		if(pageDatas.curPage < pageDatas.totalPages) {
			pageDatas.curPage++;
			init({
				user_id_2:pageDatas.user_id_2,
		    page:pageDatas.curPage,
		    list_rows:pageDatas.list_rows
		  })
		}
	})
	
	const courseList = ref([])
	const userinfo = ref(null)
	
	// 初始化
	const init = async (obj) => {
		const data = await autoCourseGetTeacherInfo(obj);
		if (data.code === SUCCESS_CODE) {
			courseList.value = [...courseList.value, ...data.data.list.data]
			pageDatas.totalPages = data.data.list.last_page
			userinfo.value = data.data.info
		} 
	}
	
	// 关注
	const userFollowFn = async () => {
		const data = await userFollow({
			user_id: pageDatas.user_id_2
		});
		if (data.code === SUCCESS_CODE) {
			init({
					page:1,
					user_id_2:pageDatas.user_id_2,
					list_rows:pageDatas.list_rows
			})
		}
	}
	// 返回
	const returnPage = () => {
		uni.navigateBack(-1)
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 100vh;
		background: #D4EFEE;
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

		.teacher {
			padding: 60rpx 35rpx 30rpx 35rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.teacher-left {
				display: flex;

				.teacher-img {
					width: 112rpx;
					height: 112rpx;
					border-radius: 50%;
					overflow: hidden;

					image {
						display: block;
						width: 100%;
						height: 100%;
					}
				}

				.teacher-mess {
					padding-left: 20rpx;

					.teacher-name {
						font-size: 32rpx;
						color: #333333;
						margin-bottom: 16rpx;
					}

					.teacher-tags {
						image {
							display: block;
							width: 80rpx;
							height: 40rpx
						}
					}

				}
			}

			.teacher-right {
				display: flex;

				.teacher-gz {
					color: #fff;
					height: 64rpx;
					padding: 0 24rpx;
					line-height: 64rpx;
					border-radius: 32rpx;
					background: #3E87B6;
					margin-right: 24rpx;
				}

				.teacher-fxx {
					color: #3E87B6;
					height: 64rpx;
					padding: 0 24rpx;
					line-height: 64rpx;
					border-radius: 32rpx;
					background: #FFFFFF;
				}
			}
		}

		.list-box {
			background: #D4EFEE;
			padding: 24rpx;

			.list-box-title {
				font-size: 38rpx;
				color: #333333;
				margin-bottom: 30rpx;
			}
		}

	}
</style>
