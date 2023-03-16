<template>
	<view class="content" :style="{ 'padding-top':paddiingTop+'px' }">
		<header-top  :isFixed="true">
			<template v-slot:content>
			  <view class="header-title">
			  	学生日程
			  </view>
			</template>
		</header-top>
		
		<view class="rl-box">
			<view class="rl">
				 <uni-calendar 
				    :insert="true"
				    :lunar="false" 
						:selected="[{date: '2023-03-01', info: '签到', data: { custom: 'ssj', name: 'sad'}}]"
				    @change="change"
				     />
			</view>
		</view>
		
		<view class="course-box-list">
			<schedule-course-card v-for="item in 5" />
		</view>
		
	</view>
</template>

<script setup>
	import { onReachBottom,onReady } from '@dcloudio/uni-app'
	import { MAY_INFO_NAVS,MAY_APP_NAVS } from "@/common/constStatic.js"
	import { ref } from "vue"
	const navs_list = ref(MAY_INFO_NAVS)
	const app_navs_list = ref(MAY_APP_NAVS)
	
	const paddiingTop = getApp().globalData.statusBarHeight+45;
	
	onReachBottom(()=>{
		console.log(uni.getSystemInfoSync().windowHeight)
	})
	onReady(()=>{
		
	})
</script>

<style lang="scss" scoped>
.content{
	background: #D4EFEE;
	box-sizing: border-box;
	min-height: 100vh;
	box-sizing: border-box;
	padding: 0 30rpx;
	padding-bottom: 10rpx;
	.rl-box{
		height: 280rpx;
		overflow: hidden;
	}
}
</style>
