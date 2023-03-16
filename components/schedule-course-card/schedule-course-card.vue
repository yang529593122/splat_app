<template>
	<view class="course-card">
		<view class="course-card-status">
			等待上课
		</view>
		<view class="course-card-top">
			<view class="course-card-top-img">
				<image src="../../static/logo.png" mode=""></image>
			</view>
			<view class="course-card-top-content">
				<view class="title">
					可是几乎都看过
				</view>
				<view class="text">
					可是几乎都看过
				</view>
				<view class="text">
					可是几乎都看过
				</view>
				<view class="user">
					<view class="user-info">
						<image src="../../static/logo.png" mode=""></image>
						张三
					</view>
					<view class="btn">
						立即报名
					</view>
				</view>
			</view>
		</view>
		<view class="course-card-bottom">
			喝口水就会分开就好
		</view>
	</view>
</template>

<script>
	
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
			width: 180rpx;
			height: 180rpx;
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
		border-top: 1rpx solid red;
		line-height: 70rpx;
		height: 70rpx;
		font-size: 26rpx;
	}
}
</style>