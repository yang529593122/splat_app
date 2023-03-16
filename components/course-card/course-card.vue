<template>
	<view class="course-card" v-for="(item,index) in list" @click="goDetail(item)">
		<view class="course-card-top">
			<view class="course-card-top-img">
				<image :src="item.thumb[0]" mode="aspectFill"></image>
			</view>
			<view class="course-card-top-content">
				<view class="title">
					{{ item.name }}
				</view>
				<view class="text">
					报名人数: {{ item.num }} / {{ item.enroll }}
				</view>
				<view class="text">
					授课时间: {{ item.study_time }}
				</view>
				<view class="user">
					<view class="user-info">
						<image :src="item.user_name_2" mode="aspectFill"></image>
						{{ item.user_user_name_2 }}
					</view>
					<view class="btn">
						立即报名
					</view>
				</view>
			</view>
		</view>
		<view class="course-card-bottom">
			<image src="../../static/h_adr.png" mode="aspectFill"></image> {{ item.learnarea_address }} | {{ item.enroll >= 4 ? '大教室' : '小教室' }}
		</view>
	</view>
</template>

<script setup>
	defineProps(['list'])
	
	const goDetail = (item) => {
		// id 课程的id user_id 发布人的id
		uni.navigateTo({
			url:`/pages/details/details?id=${item.aid}&user_id=${item.user_id_2}`
		})
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
	.course-card-top{
		display: flex;
		.course-card-top-img{
			width: 160rpx;
			height: 204rpx;
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
						width: 60rpx;
						height: 60rpx;
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
		display: flex;
		align-items: center;
		image{
			display: block;
			width: 28rpx;
			height: 28rpx;
			margin-right: 10rpx;
		}
	}
}
</style>