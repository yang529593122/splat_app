<template>
	<view class="warp" :style="{ 'padding-top': paddingTop + 'px' }">
		<header-top bg="#D4EFEE" :isFixed="true">
			<template v-slot:left>
				<view class="returnbtn"><image src="../../static/rt.png" mode="aspectFill"></image></view>
			</template>
			<template v-slot:content>
				<view class="title">评价</view>
			</template>
		</header-top>
		
		<view class="comment" v-if="details">
			<view class="title">
				{{ details.course_name }}
			</view>
			<view class="teacher">
				<view class="teacher-mess">
					<view class="teacher-flag">
						老师总评
					</view>
					<view class="teacher-content">
						{{ details.content }}
					</view>
					<view class="teacher-content-imgs">
						<image :src="item" v-for="(item,index) in details.img" :key="index" mode=""></image>
					</view>
					<view class="teacher-content-time">
						{{ details.course_create_time }}
					</view>
				</view>
				
			</view>
			
		</view>
		<view class="list">
			<view class="line"></view>
			<view class="list-flag">
				回复（{{ list.length }}）
			</view>
			<view class="list-content">
				<list-comment :list="list" @reply="reply"/>
			</view>
		</view>
		
		<view class="bottom">
			<view class="bottom-content">
				<input class="inp" type="text"  placeholder="请输入" v-model="comment" />
				<view class="btn" @click="subComment">
					留言
				</view>
			</view>
		</view>
		
	</view>
</template>

<script setup>
import { onReachBottom, onLoad } from '@dcloudio/uni-app';
import { autoCommentGetComment,autoCommentSetComment } from '@/common/request/api.js';
import { SUCCESS_CODE } from '@/common/request/httpStatus.js';
import { reactive, ref } from 'vue';
const paddingTop = getApp().globalData.statusBarHeight + 45;


const pageDatas = reactive({
	course_id:''
});
onLoad((opts) => {
	// 初始化
	pageDatas.course_id = opts.id
	init(pageDatas);
});



const init = (params) => {
	course(params);
};

// 获取课程
const list = ref([]);
const details =ref(null)
const course = async params => {
	const data = await autoCommentGetComment(params);
	if (data.code === SUCCESS_CODE) {
		list.value = [...data.data.son];
		details.value = data.data
	}
};

// 评论回复
const hf_details = ref('')
const reply = ({ data,index }) => {
	console.log(data,index)
	hf_details.value = data
	// httpAutoCommentSetComment({
	// 	parent_id:data.aid,
	// 	content:"测试评论数据",
	// 	course_id	:details.value.course_id
	// })
}

// 评论请求
const httpAutoCommentSetComment = async params => {
	const data = await autoCommentSetComment(params);
	if (data.code === SUCCESS_CODE) {
		console.log('评论成功')
		init(pageDatas);
	}
}

// 留言
const comment = ref('')
const subComment = () => {
	if(!comment.value){
		uni.showToast({
			icon:'none',
			title:'留言不能为空'
		})
		return
	}
	// 留言只能是学生
	if(JSON.parse(uni.getStorageSync('user')).user_type === 1) {
		console.log('学生')
		httpAutoCommentSetComment({
				content:comment.value,
				course_id	:details.value.course_id
		})
	}
}

</script>

<style lang="scss" scoped>
.warp{
	min-height: 100vh;
	background: #d4efee;
	box-sizing: border-box;
	padding-bottom: 110rpx;
	.returnbtn {
		width: 40rpx;
		height: 40rpx;
		image{
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
	
	.comment{
		padding: 32rpx;
		.title{
			font-size: 36rpx;
			padding: 12rpx;
		}
		.teacher{
			padding: 24rpx;
			background: #C5E8E7;
			border-radius: 10rpx;
			.teacher-mess{
				.teacher-flag{
					padding: 16rpx 0;
					color: #3E87B6;
				}
				.teacher-content{
					padding-bottom: 24rpx;
					color: #2C3034;
				}
				.teacher-content-imgs{
					display: grid;
					grid-template-columns: repeat(4,1fr);
					grid-column-gap: 10rpx;
					grid-row-gap: 10rpx;
					image{
						display: block;
						width: 100%;
						height: 152rpx;
					}
				}
				.teacher-content-time{
					padding-top: 24rpx;
					font-size: 24rpx;
					color: #90A1A3;
				}
			}
		}
	}
	.list{
		.line{
			height: 20rpx;
			background: #BDE5E3;
		}
		.list-flag{
			font-size: 32rpx;
			color: #333333;
			padding: 20rpx 32rpx;
		}
		.list-content{
			padding: 32rpx;
		}
	}
	
	
	.bottom{
		position: fixed;
		left: 0;
		bottom: 0;
		height: 108rpx;
		width: 100%;
		padding: 18rpx 32rpx;
		box-sizing: border-box;
		background: #BDE5E3;
		.bottom-content{
			width: 100%;
			display: flex;
			align-items: center;
			.inp{
				flex: 1;
				display: block;
				background: #fff;
				height: 72rpx;
				line-height: 72rpx;
				margin-right: 24rpx;
				padding: 0 24rpx;
				border-radius: 10rpx;
				color: #90A1A3;
			}
			.btn{
				height: 72rpx;
				line-height: 72rpx;
				color: #fff;
				background: #3E87B6;
				padding: 0 40rpx;
				border-radius: 10rpx;
			}
		}
	}
}
</style>
