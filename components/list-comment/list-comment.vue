<template>
	<view class='list'>
		<view class="item" :class="{
			bordered:flag
		}" v-for="(item,index) in list" :key="index">
				<view class="header-img">
					<image v-if="item.head_img" :src="item.head_img" mode=""></image>
					<image v-else src="../../static/logo.png" mode=""></image>
					<view class="is-tearch" v-if="item.user_type===2">
						老师
					</view>
				</view>
				<view class="content">
					<view class="name">{{ item.user_nickname }}</view>
					<view class="text">{{ item.content }}</view>
					<view class="time">
						<view class="">
							{{ item.create_time }}
						</view>
						<!-- 只有该课程 发布着的id 与 用户的id 不相同的情况下 才展示  并且 用户的类型必须是老师 -->
						<view class="hf-btn" v-if="flag && user.user_type===2 && user.id !== item.user_id_2" @click="reply(item,index)">
							回复
						</view>
					</view>
					<list-comment v-if="'son' in item" :list="item.son" :flag="false" />
				</view>
		</view>
		
		
	</view>
</template>

<script setup>
	
	
import { computed, ref } from "vue";

const user = computed(()=>{
	return uni.getStorageSync('user')
})

	const props = defineProps({
		flag:{
			type: Boolean,
			default: true
		},
	  list: {
	    type: Array,
	    default: () => []
	  }
	})
	const emits = defineEmits(['reply'])
	const reply = (item,index) => {
		emits('reply',{ data:item,index })
	}

</script>

<style lang="scss" scoped>
	image{
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
.list{
	.item{
		display: flex;
		padding: 32rpx 0;
		&.bordered{
			border-bottom: 1px solid #BFE2E1;
		}
		.header-img{
			width: 72rpx;
			height: 72rpx;
			border-radius: 50%;
			position: relative;
			.is-tearch{
				position: absolute;
				left: 0;
				bottom: 0;
				font-size: 24rpx;
				width: 100%;
				background:  linear-gradient(305deg, #2C3034 0%, #727477 100%);
				border-radius: 16rpx;
				text-align: center;
				color: #fff;
			}
		}
		.content{
			flex: 1;
			padding: 0 16rpx;
			box-sizing: border-box;
			.name{
				color: #3E87B6;
				padding-bottom: 10rpx;
			}
			.text{
				color: #333333;
			}
			.time{
				display: flex;
				justify-content: space-between;
				padding-top: 10rpx;
				font-size: 24rpx;
				color: #999999;
				.hf-btn{
					color: #3E87B6;
				}
			}
		}
	}
	
}

</style>