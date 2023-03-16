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
						我的资料
					</view>
				</template>

			</header-top>
		</view>

		<view class="content-box">

			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					头像
				</view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">哈萨克杜鹃花科</view>
					</picker>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					ID
				</view>
				<view class="uni-list-cell-db">
					3657868
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					昵称
				</view>
				<view class="uni-list-cell-db">
					蔡菜菜
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					名字
				</view>
				<view class="uni-list-cell-db">
					蔡小花
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					性别
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="index" :range="['男','女']">
						<view class="uni-input">女 <image src="@/static/my/icon.png" mode=""></image>
						</view>
					</picker>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					生日
				</view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">1994-12-12 <image src="@/static/my/icon.png" mode=""></image>
						</view>
					</picker>
				</view>
			</view>
		</view>

	</view>
</template>

<script setup>
	import {
		ref,
		computed
	} from "vue";

	const paddingTop = getApp().globalData.statusBarHeight + 45;

	const date = ref('')
	const getDate = (type) => {
		const date = new Date();
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();

		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;
		day = day > 9 ? day : '0' + day;
		return `${year}-${month}-${day}`;
	}

	const currentDate = getDate({
		format: true
	})
	const bindDateChange = (e) => {
		date.value = e.detail.value
	}
	const startDate = computed(() => {
		return getDate('start');
	})
	const endDate = computed(() => {
		return getDate('end');
	})
	const returnPage = () => {
		uni.navigateBack({
			delta: 1
		})
	}
	const index = ref(0)
	const bindPickerChange = (e) => {
		index.value = e.detail.value
	}
</script>

<style lang="scss" scoped>
	.content {
		background: #D4EFEE;
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
			color: #2C3034;
			font-size: 30rpx;

			.uni-list-cell {
				border-bottom: 1rpx solid #C5E8E7;
				display: flex;
				justify-content: space-between;
				padding: 32rpx;

				.uni-input {
					display: flex;
					align-items: center;

					image {
						margin-left: 14rpx;
						display: block;
						width: 14rpx;
						height: 26rpx;
					}
				}
			}
		}




	}
</style>
