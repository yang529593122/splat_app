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
		
		<view class="histy-list">
			<view class="histy-list-title">
				<view class="font-text">
					历史搜索
				</view>
				<view class="font-icon" @click="delSelect">
					<image src="@/static/search/de.png" mode=""></image>
				</view>
			</view>
			
			<view class="list-content">
				<block v-if="list.length">
					<view class="list-content-item" v-for="(item,index) in list">
						{{ item.history_content }}
						<view class="icon-img" @click="delItem(item,index)">
							<image src="@/static/search/delitem.png" mode=""></image>
						</view>
					</view>
				</block>
				<view class="" v-else>
					暂无历史记录
				</view>
				
			</view>
			
		</view>
		
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app'
	import { autoHistoryAddHistory,autoHistoryGetHistory,autoHistoryDelHistory } from "@/common/request/api.js"
	import { SUCCESS_CODE } from "@/common/request/httpStatus.js"
	import { reactive, ref } from "vue";
	
	const paddingTop = getApp().globalData.statusBarHeight+45;
	
	
	const keyworld = ref('你好')

	onLoad(()=>{
		init()
	})
	const list = ref([])
	// 初始化搜索
	const init  = async () => {
		const data = await autoHistoryGetHistory();
		if(data.code === SUCCESS_CODE){
			list.value = data.data
		}
	}
	// 搜索
	const searchFn =async () => {
		console.log(keyworld.value)
		const data = await autoHistoryAddHistory({history_content:keyworld.value});
		if(data.code === SUCCESS_CODE){
			uni.navigateTo({
				url:'/pages/search_result/search_result?key='+keyworld.value
			})
		}
		
	}
	const delItem =async (item,index) => {
		const data = await autoHistoryDelHistory({ aid:item.aid });
		if(data.code === SUCCESS_CODE){
			init()
		}
	}
	// 删除
	const delSelect = async () => {
		const data = await autoHistoryDelHistory();
		if(data.code === SUCCESS_CODE){
			init()
		}
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
		
		.histy-list{
			padding: 32rpx;
			.histy-list-title{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.font-text{
					font-size: 32rpx;
					color: #2C3034;
				}
				.font-icon{
					width: 24rpx;
					height: 28rpx;
					image{
						display: block;
						width: 100%;
						height: 100%;
					}
				}
			}
			.list-content{
				padding-top: 30rpx;
				display: flex;
				flex-wrap: wrap;
				.list-content-item{
					margin-bottom: 24rpx;
					margin-right: 24rpx;
					padding: 0 60rpx;
					height: 56rpx;
					line-height: 56rpx;
					border-radius: 28rpx;
					font-size: 24rpx;
					background:#BDE5E3 ;
					position: relative;
					.icon-img{
						position: absolute;
						top: 50%;
						right: 20rpx;
						width: 20rpx;
						height: 20rpx;
						transform: translateY(-50%);
						image{
							display: block;
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
	}

</style>
