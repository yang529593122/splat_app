<template>
	<view class="content" :style="{ 'padding-top': paddingTop + 'px' }">
		<view class="content-header">
			<header-top bg="#D4EFEE" :isFixed="true">
				<template v-slot:left>
					<view class="returnbtn"><image src="../../static/rt.png" mode="aspectFill"></image></view>
				</template>
				<template v-slot:content>
					<view class="title">选择场地</view>
				</template>
				<template v-slot:right>
					<view class="returnbtn rightbtn" @click="subClass">确定</view>
				</template>
			</header-top>
		</view>

		<view class="list-box">
			<view class="item" v-for="(item, index) in list" :key="index" @click="selectClass(item,index)">
				<view class="item-mess">
					<image src="../../static/select_class/xz.png" v-if="classIndex === index" mode=""></image>
					<image src="../../static/select_class/noxz.png" v-else mode=""></image>
					<view class="location">{{ item.location }}</view>
				</view>
				<view class="item-status" v-if="item.room">当前有{{ item.room }}间教室可用</view>
				<view class="item-status-no" v-else>当前有0间教室可用</view>
				<view class="item-mess item-mess-info">
					<image src="../../static/select_class/cd.png" mode=""></image>
					<text>{{ item.address }}</text>
				</view>
				<view class="item-mess item-mess-info">
					<image src="../../static/select_class/mj.png" mode=""></image>
					<text>总面积 {{ item.total_area }}㎡ ｜ 小教室 {{ item.small }}㎡x{{ item.small_num }} | 大教室 {{ item.big }}㎡x{{ item.big_num }}</text>
				</view>
				<view class="item-mess item-mess-info">
					<image src="../../static/select_class/js.png" mode=""></image>
					<text>小教室 {{ item.mini }}-{{ item.small_max }}人 ｜ 大教室 {{ item.gross }}-{{ item.big_max }}人</text>
				</view>
				<view class="item-mess item-mess-info">
					<image src="../../static/select_class/sj.png" mode=""></image>
					<text>{{ item.open_time }}</text>
				</view>
			</view>
		</view>
		
		
		
		
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { onReachBottom, onLoad } from '@dcloudio/uni-app';
import { autoLearnareaGetLearnarea } from '@/common/request/api.js';
import { SUCCESS_CODE } from '@/common/request/httpStatus.js';
import { useStore	} from 'vuex'


const store = useStore()

const paddingTop = getApp().globalData.statusBarHeight + 45;

const pageDatas = reactive({
	page: 1, // 当前页
	last_page: 1, // 剩余页
	list_rows: 5 // 每页条数
});
const list = ref([]);

const classIndex = ref(null)
const itemDetails = ref(null)

onLoad(() => {
	init({
		page: pageDatas.page,
		list_rows: pageDatas.list_rows
	});
});
onReachBottom(() => {
	if (pageDatas.page < pageDatas.last_page) {
		pageDatas.page++;
		init({
			page: pageDatas.page,
			list_rows: pageDatas.list_rows
		});
	}
});

const init = async params => {
	const data = await autoLearnareaGetLearnarea(params);
	if (data.code === SUCCESS_CODE) {
		list.value = [...list.value, ...data.data.data];
		pageDatas.last_page = data.data.last_page;
	}
};

// 选择教室
const selectClass = (item,index) => {
	classIndex.value = index
	itemDetails.value = item
}
// 确定
const subClass = () => {
	if(itemDetails.value && classIndex.value !==null){
		store.commit('setClassNameRoom',itemDetails.value)
		uni.navigateTo({
			url:'/pages/release/release'
		})
	}else{
		uni.showToast({
			title: '请选择教室场地',
			duration: 2000,
			icon:'none'
		});
	}
}
</script>

<style lang="scss" scoped>
.content {
	min-height: 100vh;
	box-sizing: border-box;
	background: #d4efee;

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
				width: 100%;
				height: 48rpx;
				line-height: 48rpx;
			}
		}
		.title {
			color: #333333;
		}
	}

	.list-box {
		padding: 20rpx 24rpx;
		.item {
			padding: 24rpx;
			background: #e9f7f6;
			border-radius: 16rpx;
			margin-bottom: 20rpx;
			.item-mess {
				display: flex;
				align-items: center;
				padding: 10rpx;
				&.item-mess-info {
					image {
						display: block;
						width: 28rpx;
						height: 28rpx;
						margin-right: 14rpx;
					}
					text {
						color: #2c3034;
						font-size: 24rpx;
					}
				}

				image {
					display: block;
					width: 32rpx;
					height: 32rpx;
					margin-right: 14rpx;
				}
				.location {
					flex: 1;
					color: #333333;
					font-size: 30rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box; //作为弹性伸缩盒子模型显示。
					-webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
					-webkit-line-clamp: 1; //显示的行
				}
			}
			.item-status {
				background: #d7ecf0;
				color: #3e87b6;
				padding: 16rpx 26rpx;
				border-radius: 8rpx;
				margin: 14rpx 0;
			}
			.item-status-no {
				background: #ffffff;
				color: #90a1a3;
				border-radius: 8rpx;
				padding: 16rpx 26rpx;
				margin: 14rpx 0;
			}
		}
	}

	
}
</style>
