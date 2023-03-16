<template>
	<view class="home" :style="{ 'padding-top':paddingTop+'px' }">
		<view class="content-header">
			<header-top bg='#D4EFEE' :isFixed="true">
				<template v-slot:left>
					<view class="returnbtn" @click="returnPage">
						<image src="../../static/rt.png" mode="aspectFill"></image>
					</view>
				</template>
				<template v-slot:content>
					<view class="title">
						<input type="text" placeholder="请输入" v-model="keyworld">
					</view>
				</template>
				<template v-slot:right>
					<view class="returnbtn rightbtn" @click="searchFn">
						<image src="../../static/search/sc.png" mode="aspectFill"></image>
					</view>
				</template>
			</header-top>
		</view>
		
		<view class="nav">
			<view class="nav-item" :class="index === 0 ? 'nav-item-act':''" @click="navChange(0)">
				课程
				<view class="nav-item-icon" v-if="index === 0" style="background: #3E87B6;width: 48rpx;height: 7rpx;"></view>
			</view>
			<view class="nav-item" :class="index === 1 ? 'nav-item-act':''" @click="navChange(1)">
				用户
				<view class="nav-item-icon" v-if="index === 1" style="background: #3E87B6;width: 48rpx;height: 7rpx;"></view>
			</view>
		</view>
		<view class="" style="background: #C5E8E7; height: 20rpx;"></view>
		
		<view class="content-list" v-if="index===0">
			<view class="no-resutl" v-if="!courseList.length">
				<image src="@/static/search/empty.png" mode=""></image>
				<view class="">
					暂无数据
				</view>
			</view>
			<block v-else>
				<course-card :list= "courseList" />
			</block>
			
		</view>
		<view class="content-list"  v-if="index===1">
			<view class="no-resutl" v-if="!userList.length">
				<image src="@/static/search/empty.png" mode=""></image>
				<view class="">
					暂无数据
				</view>
			</view>
			<block v-else>
				<view class="user-box" v-for="(item, index) in  userList" :key="index">
					<view class="user-img" @click="goPage(item)">
						<image :src="item.head_img" style="width: 106rpx; height: 106rpx; display: block;border-radius: 16rpx;" mode=""></image>
					</view>
					<view class="user-mess" @click="goPage(item)">
						<view class="user-name">{{ item.user_nickname }}</view>
						<view class="user-phone">{{ item.mobile }}</view>
					</view>
					<view class="btn" v-if="item.is_collection===0" @click="userFollowFn(item,index)">
						关注
					</view>
					<view class="btn" v-if="item.is_collection===1" @click="userFollowFn(item,index)">
						已关注
					</view>
				</view>
			</block>
			
		</view>
		
		
		
	</view>
</template>

<script setup>
	import { onReachBottom,onLoad } from '@dcloudio/uni-app'
	import { getBanners,getAnnouncement,getRelease,getCourse,autoUserGetUserList,userFollow } from "@/common/request/api.js"
	import { SUCCESS_CODE } from "@/common/request/httpStatus.js"
	import { reactive, ref } from "vue";
	
	const paddingTop = getApp().globalData.statusBarHeight+45;
	
	
	const keyworld = ref('')
	const index = ref(0)
	const pageDatas = reactive({
		curPage:1,
		totalPages:1,
		list_rows:5
	})
	
	onLoad((opt)=>{
		keyworld.value = opt.key
		course({
			keyword:opt.key,
			page:pageDatas.curPage,
			list_rows:pageDatas.list_rows
		})
	})
	
	onReachBottom(()=>{
		if(pageDatas.curPage < pageDatas.totalPages) {
			pageDatas.curPage++;
			index.value === 0 && course({ keyword:keyworld.value,page:pageDatas.curPage,list_rows:pageDatas.list_rows })
			index.value === 1 && autoUserGetUserListFn({ keyword:keyworld.value,page:pageDatas.curPage,list_rows:pageDatas.list_rows })
		}
	})
	
	// 获取课程
	const courseList = ref([])
	const course = async (params) => {
		const data = await getCourse(params);
		if(data.code === SUCCESS_CODE){
			courseList.value = [...courseList.value, ...data.data.data]
			pageDatas.totalPages = data.data.last_page
		}
	}
	
	// 获取课程
	const userList = ref([])
	const autoUserGetUserListFn = async (params) => {
		const data = await autoUserGetUserList(params);
		if(data.code === SUCCESS_CODE){
			userList.value = [...userList.value, ...data.data.data]
			console.log(userList.value)
			pageDatas.totalPages = data.data.last_page
		}
	}
	
	
	
	// 搜索
	const searchFn = () => {
		console.log(keyworld.value)
	}
	// 
	const navChange = (val) => {
		if(val === index.value) return
		index.value = val
		if(val === 1){
			userList.value = []
			pageDatas.curPage = 1
			autoUserGetUserListFn({
				keyword:keyworld.value,
				page:pageDatas.curPage,
				list_rows:pageDatas.list_rows
			})
		}else{
			courseList.value = []
			pageDatas.curPage = 1
			course({
				keyword:keyworld.value,
				page:pageDatas.curPage,
				list_rows:pageDatas.list_rows
			})
		}
	}
	// 关注
	const userFollowFn = async (item,index) => {
		const data = await userFollow({
			user_id: item.id
		});
		if (data.code === SUCCESS_CODE) {
			userList.value[index].is_collection = userList.value[index].is_collection ? 0 : 1
		}
	}
	// 老师主页
	const goPage = (item) => {
		uni.navigateTo({
			url:'/pages/teacher_index/teacher_index?id='+item.id
		})
	}
	
	// 返回
	const returnPage = () => {
		uni.navigateBack(-1)
	}

</script>

<style lang="scss" scoped>
	.home{
		height: 100vh;
		box-sizing: border-box;
		background: #D4EFEE;
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
				min-width: 580rpx;
				input{
					display: block;
					background: #fff;
					line-height: 60rpx;
					height: 60rpx;
					padding: 0 30rpx;
					border-radius: 30rpx;
				}
			}
		}
		
		.nav{
			padding-top: 40rpx;
			display: flex;
			justify-content: space-around;
			.nav-item{
				font-size: 36rpx;
				padding: 12rpx;
				color: #666666;
				
				position: relative;
				&.nav-item-act{
					color: #2C3034;
				}
				.nav-item-icon{
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
				}
			}
		}
		
		.content-list{
			padding: 24rpx;
			.user-box{
				display: flex;
				border-bottom: 1rpx solid #BDE5E3;
				padding: 024rpx 0;
				position: relative;
				.user-mess{
					flex: 1;
					padding-left: 24rpx;
					.user-name{
						font-size: 32rpx;
						color: #2C3034;
						padding-bottom: 16rpx;
					}
					.user-phone{
						font-size: 26rpx;
						color: #2C3034;
					}
				}
				.btn{
					position: absolute;
					right: 0;
					top: 40rpx;
					width: 160rpx;
					height: 64rpx;
					line-height: 64rpx;
					background: #3E87B6;
					text-align: center;
					color: #fff;
					border-radius: 32rpx;
				}
			}
			.no-resutl{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding-top: 140rpx;
				image{
					display: block;
					width: 258rpx;
					height: 258rpx;
				}
				view{
					font-size: 32rpx;
					color: #666666;
					padding-top: 36rpx;
				}
			}
		}
	}

</style>
