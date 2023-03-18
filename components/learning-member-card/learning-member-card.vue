<template>
	<view class="item" v-for="(item, index) in list" :key="index">
		<view class="item-content">
			<view class="item-content-img">
				<view class="item-content-img-status-wait" v-if="item.status === 1">待上课</view>
				<view class="item-content-img-status-wait no-gary" v-if="item.status === 2">已完成</view>
				<view class="item-content-img-status-wait no-gary" v-if="item.status === 0">已取消</view>
				<image :src="item.thumb[0]" v-if="item.thumb[0]" mode="aspectFill"></image>
				<image v-else src="../../static/logo.png" mode=""></image>
			</view>
			<view class="item-content-information">
				<view class="title">{{ is_hy ? item.name : item.course_name }}</view>
				<view class="text num">报名人数: {{ item.num }} / {{ item.enroll }}</view>
				<view class="text time" v-if="is_hy">授课时间: {{ item.study_time }}</view>
				<view class="text time" v-else>授课时间: {{ item.lesson_time }}-{{ item.end_time.split(" ")[1] }}</view>
				
				<view class="user">
					<view class="user-info">
						<image src="../../static/logo.png" v-if="!item.head_img" mode=""></image>
						<image :src="item.head_img" v-else mode="aspectFill"></image>
						<view class="user-name">{{ is_hy ? item.user_user_name_2 : item.user_name }}</view>
					</view>
					<blockquote v-if="is_hy">
						<view style="flex:1; display: flex;justify-content: space-between;">
							<view class="btn" style="color: #fff;background: #6EC2D5;" v-if="item.status === 2">写评论</view>
							<view class="btn" style="color: #fff;background: #6EC2D5;" v-if="item.status === 2">再次安排</view>
						</view>
						
					</blockquote>
					<blockquote v-else>
						<view class="btn" v-if="item.status === 1">取消报名</view>
						<view class="btn" v-if="item.status === 2" @click="course_review(item, index)">查看评论</view>
						<view class="btn " v-if="item.status === 0" @click="delItem(item, index)">删除</view>
					</blockquote>
					
				</view>
			</view>
		</view>
		<view class="course-card-bottom">
			<image src="../../static/h_adr.png" mode="aspectFill"></image>
			<view class="location">{{ is_hy ? item.learnarea_location : item.location }}</view>
			<view class="" style="min-width: 100rpx;">| {{ item.enroll >= 4 ? '大教室' : '小教室' }}</view>
		</view>
	</view>
</template>

<script setup>
defineProps(['list','is_hy']);
const emits = defineEmits(['delete']);

const course_review = (item, index) => {
	uni.navigateTo({
		url: `/pages/course_review/course_review?id=${item.course_id}`
	});
};

const delItem = (item, index) => {
	emits('delete', {
		data: item,
		index: index
	});
};

// const goDetail = (item) => {
// 	// id 课程的id user_id 发布人的id
// 	uni.navigateTo({
// 		url:`/pages/details/details?id=${item.aid}&user_id=${item.user_id_2}`
// 	})
// }
</script>

<style lang="scss" scoped>
.item {
	padding: 20rpx 20rpx 0 20rpx;
	margin-bottom: 20rpx;
	background: #edf8f8;
	border-radius: 10rpx;
	image {
		display: block;
		width: 100%;
		height: 100%;
	}
	.item-content {
		display: flex;
		.item-content-img {
			width: 160rpx;
			height: 204rpx;
			padding: 20rpx;
			border-radius: 20rpx;
			background: #fff;
			position: relative;
			.item-content-img-status-wait {
				position: absolute;
				left: 0;
				top: 0;
				width: 106rpx;
				height: 40rpx;
				line-height: 40rpx;
				text-align: center;
				background: #50d5a1;
				border-radius: 20rpx 20rpx 20rpx 0rpx;
				z-index: 1;
				color: #fff;
				font-size: 24rpx;
				&.no-gary {
					background: #90a1a3;
				}
			}
		}

		.item-content-information {
			flex: 1;
			padding: 20rpx 0;
			.title {
				font-weight: bold;
				padding-bottom: 10rpx;
			}
			.text {
				font-size: 24rpx;
				padding-bottom: 10rpx;
				color: #2c3034;
			}
			.user {
				padding: 20rpx 0;
				display: flex;
				justify-content: space-between;
				.user-info {
					max-width: 200rpx;
					display: flex;
					align-items: center;
					image {
					
						display: block;
						width: 48rpx;
						height: 48rpx;
						border-radius: 50%;
					}
					.user-name {
						flex: 1;
						max-width: 64rpx;
						color: #333;
						padding-left: 16rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}
				}
				.btn {
					padding: 0 10rpx;
					background: #c0dbe7;
					line-height: 56rpx;
					text-align: center;
					height: 56rpx;
					border-radius: 10rpx;
					font-size: 24rpx;
					color: #3e87b6;
					margin-left: 20rpx;
				}
			}
		}
	}
	.course-card-bottom {
		border-top: 1rpx solid #d6e9ef;
		line-height: 70rpx;
		height: 70rpx;
		font-size: 26rpx;
		display: flex;
		align-items: center;
		color: #666666;
		.location {
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}

		image {
			display: block;
			width: 28rpx;
			height: 28rpx;
			margin-right: 10rpx;
		}
	}
}
</style>
