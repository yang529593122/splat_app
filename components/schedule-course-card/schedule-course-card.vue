<template>
	<view class="course-card">
		<view class="course-card-status" v-if="data.status === 1">
			待上课
		</view>
		<view class="course-card-status" style="color: #4485B3;"  v-if="data.status === 2">
			已完成
		</view>
		<view class="course-card-top">
			<view class="course-card-top-img">
				<image :src="data.thumb[0]" mode=""></image>
			</view>
			<view class="course-card-top-content">
				<view class="title">
					{{ data.course_name }}
				</view>
				<view class="text">
					报名人数：{{ data.num }}/{{ data.enroll }}
				</view>
				<view class="text">
					授课时间：{{ data.lesson_time }}-{{ data.end_time.split(" ")[1] }}
				</view>
				<view class="user">
					<view class="user-info">
						<image :src="data.head_img" mode=""></image>
						{{ data.user_name }}
					</view>
				<!-- 	<view class="btn" v-if="data.status === 1">
						立即报名
					</view> -->
					<view class="btn" v-if="data.status === 1" style="background: #E7E6C0;color: #FCA43A;" @click="cancelRegistration(data)">
						取消报名
					</view>
				</view>
			</view>
		</view>
		<view class="course-card-bottom">
			{{ data.location }}  |  {{ data.room_type === 1 ? '小教室' : '大教室' }} 
		</view>
	</view>
</template>

<script setup>
	const props = defineProps(['data'])
	const emits = defineEmits(['cancel'])
	const cancelRegistration = (item) => {
		emits('cancel',item)
	}
</script>

<style lang="scss" scoped>
.course-card{
	padding: 20rpx 20rpx 0 20rpx;
	margin-bottom: 20rpx;
	background: #EDF8F8;
	border-radius: 10rpx;
	image{
		display: block;
		width: 100%;
		height: 100%;
	}
	.course-card-status{
		height: 80rpx;
		line-height: 80rpx;
		font-weight: bold;
	}
	.course-card-top{
		display: flex;
		.course-card-top-img{
			width: 160rpx;
			height: 204rpx;
			padding: 20rpx;
			background: #fff;
			border-radius: 20rpx;
			box-sizing: border-box;
		}
		.course-card-top-content{
			flex: 1;
			padding-left: 20rpx;
			.title{
				font-weight: bold;
				padding-bottom: 10rpx;
			}
			.text{
				font-size: 24rpx;
				padding-bottom: 10rpx;
			}
			.user{
				padding: 20rpx 0;
				display: flex;
				justify-content: space-between;
				.user-info{
					display: flex;
					align-items: center;
					
					image{
						display: block;
						width: 48rpx;
						height: 48rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}
				}
				.btn{
					background: #3E87B6;
					line-height: 50rpx;
					height: 50rpx;
					border-radius: 10rpx;
					padding: 0 20rpx;
					font-size: 24rpx;
					color: #fff;
				}
			}
		}
	}
	.course-card-bottom{
		border-top: 1rpx solid #D6E9EF;
		line-height: 70rpx;
		height: 70rpx;
		font-size: 26rpx;
		color: #666666;
	}
}
</style>