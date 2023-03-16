<template>
	<view class="content">
		<view class="content-header">
			<header-top bg="#8D91FC">
				<template v-slot:left>
					<view class="returnbtn" @click="returnPage"><image src="../../static/rt.png" mode="aspectFill"></image></view>
				</template>
				<template v-slot:content>
					<view class="title">发布</view>
				</template>
			</header-top>
		</view>
		<view class="content-box">
			<view class="list">
				<view class="item">
					<view class="item-title">课程名称</view>
					<input class="item-input" v-model="store.state.formData.name" placeholder="请输入10个字以内" />
				</view>
				<view class="item">
					<view class="item-title">课程简介</view>
					<input class="item-input" placeholder="请输入" v-model="store.state.formData.brief" />
				</view>
				<view class="item">
					<view class="item-title">课程详情</view>
					<textarea class="item-text" placeholder="请输入" v-model="store.state.formData.content"></textarea>
				</view>
				<view class="item">
					<view class="item-title">课程图片</view>
					<view class="img-list">
						<block v-if="store.state.formData.thumb.length">
							<view class="upload-img"  v-for="(item , index) in store.state.formData.thumb" :key="index"><image :src="item" mode=""></image></view>
						</block>
						<view class="upload-img" @click="uploadCourse"><image src="@/static/release/up.png" mode=""></image></view>
					</view>
				</view>
				<view class="item">
					<view class="item-title">授课时间</view>
					<view class="item-input hidtext" @click="showClassTime">{{ store.state.classTimeStr || '请选择' }}</view>
				</view>
				<view class="item">
					<view class="item-title">可报名人数(人)</view>
					<input class="item-input" placeholder="请输入" v-model="store.state.formData.enroll" />
				</view>
				<view class="item">
					<view class="item-title">可选择好友</view>
					<input class="item-input" placeholder="请输入" />
				</view>
				<view class="item">
					<view class="item-title">选择场地</view>
					<view class="item-input hidtext" @click="goSelectClass">{{ store.state.classNameRoom || '请选择' }}</view>
				</view>
				<view class="item radio-list-box">
					<view class="item-title">公开发布</view>
					<view class="radio-list">
						<view class="radio-list-item left-pad" @click="setIsPublish(0)">
							<image v-if="isPublishIndex === 0" src="@/static/release/xz.png" mode=""></image>
							<image v-else src="@/static/release/noxz.png" mode=""></image>
							<view class="">是</view>
						</view>
						<view class="radio-list-item" @click="setIsPublish(1)">
							<image v-if="isPublishIndex === 1" src="@/static/release/xz.png" mode=""></image>
							<image v-else src="@/static/release/noxz.png" mode=""></image>
							<view class="">否</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content-bottom">
			<view class="bottom-box">
				<view class="info">
					<image v-if="!flag" src="@/static/release/fb.png" style="display: block;width: 28rpx;height: 28rpx;" @click="seled(true)"></image>
					<image v-else src="@/static/release/xz.png" style="display: block;width: 28rpx;height: 28rpx;" @click="seled(false)"></image>
					勾选阿哈收到开发商发挥空间
					<text>《发布须知》</text>
				</view>
				<view class="btn" @click="submitCourse">发布</view>
			</view>
		</view>

		<view class="clss-time-box" v-if="isShowClassTime">
			<view class="clss-time-content">
				<view class="time-content">
					<view class="title">
						<view class="" @click="closeClassTime">取消</view>
						<view class="">授课时间</view>
						<view class="" @click="subClassTimes">确定</view>
					</view>
					<view class="list-content">
						<picker-view @change="bindChange" class="picker-view">
							<picker-view-column>
								<view class="item" v-for="(item, index) in LEARN_TIME_DATE" :key="index">{{ item }}</view>
							</picker-view-column>
							<picker-view-column>
								<view class="item" v-for="(item, index) in LEARN_TIME" :key="index">{{ item }}</view>
							</picker-view-column>
						</picker-view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { onReachBottom, onLoad } from '@dcloudio/uni-app';
import { autoCourseSetCourse } from '@/common/request/api.js';
import { BASE_URL, IMG_UPLOAD_URL } from '@/common/request/base_url.js';
import { LEARN_TIME, LEARN_TIME_DATE } from '@/common/constStatic.js';
import { SUCCESS_CODE } from '@/common/request/httpStatus.js';
import { useStore	} from 'vuex'
const store = useStore()

onLoad((opt) => {
	if (!uni.getStorageSync('user')) {
		uni.navigateTo({
			url: '/pages/login/login'
		});
	}
});

const isPublishIndex = ref(0);
// 上传课程图片
const uploadCourse = () => {
	uni.chooseImage({
		count: 1, //默认9
		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
		sourceType: ['album'], //从相册选择
		success: res => {
			let user = JSON.parse(uni.getStorageSync('user'));
			let user_token = user.user_token || '';
			uni.uploadFile({
				url: BASE_URL + IMG_UPLOAD_URL,
				filePath: res.tempFilePaths[0],
				name: 'file',
				header: {
					'user-token': user_token || ''
				},
				formData: {
					module: '',
					dir: ''
				},
				success: res => {
					let data = JSON.parse(res.data);
					if (data.code == 1) {
						store.commit('onchangeThumb', [...store.state.formData.thumb,data.data[0].thumb])
					} else {
						message.info(global.i18n['图片上传失败，请重试']);
					}
				},
				complete: () => {}
			});
		}
	});
};

const timeValue = ref([0, 0]);
const timeValueCopy = ref([0, 0]);

// 授课时间
const bindChange = e => {
	timeValue.value = e.detail.value;
};
// 取消授课时间
const closeClassTime = () => {
	timeValue.value = [0, 0];
	isShowClassTime.value = false;
};
const isShowClassTime = ref(false);
// 确定授课时间
const subClassTimes = () => {
	let one = !timeValue.value[0] ? 0 : timeValue.value[0];
	let two = !timeValue.value[1] ? 0 : timeValue.value[1];
	timeValueCopy.value = [one, two];
	isShowClassTime.value = false;
	store.commit('setTime',LEARN_TIME_DATE[one] + ' ' + LEARN_TIME[two])
	
};
const showClassTime = () => {
	isShowClassTime.value = true;
};
// 是否公开
const setIsPublish = index => {
	isPublishIndex.value = index;
	let is_publish  = !index ? 1 : 2;
	store.commit('set_is_publish',is_publish)
};
const goSelectClass = () => {
	uni.navigateTo({
		url: '/pages/select_class/select_class'
	});
};
const returnPage = () => {
	uni.navigateBack({
		delta: 1
	});
};
// 协议
const flag = ref(false);
const seled = f => {
	flag.value = f;
};
// 发布课程
const submitCourse = async () => {
	console.log(store.state)
	if (!store.state.formData.name) {
		uni.showToast({
			icon: 'none',
			title: '课程名称不能为空'
		});
		return;
	}
	if (!store.state.formData.brief) {
		uni.showToast({
			icon: 'none',
			title: '课程简介不能为空'
		});
		return;
	}
	if (!store.state.formData.content) {
		uni.showToast({
			icon: 'none',
			title: '课程详情不能为空'
		});
		return;
	}
	if (!store.state.formData.thumb) {
		uni.showToast({
			icon: 'none',
			title: '课程图片不能为空'
		});
		return;
	}
	if (!store.state.formData.lesson_time && !store.state.formData.end_time) {
		uni.showToast({
			icon: 'none',
			title: '授课时间不能为空'
		});
		return;
	}

	if (!store.state.formData.enroll) {
		uni.showToast({
			icon: 'none',
			title: '可报名人数不能为空'
		});
		return;
	}
	if (!flag.value) {
		uni.showToast({
			icon: 'none',
			title: '勾选同意发布须知'
		});
		return;
	}
	const data = await autoCourseSetCourse({
		name: store.state.formData.name, 
		brief: store.state.formData.brief,
		content: store.state.formData.content,
		thumb: store.state.formData.thumb.join(), // 课程图片
		enroll: store.state.formData.enroll, // 报名人数
		user_id: store.state.formData.user_id, // 学生用户id
		end_time: store.state.formData.end_time, // 授课结束时间
		lesson_time: store.state.formData.lesson_time, // 授课开始时间
		learnarea_id: store.state.formData.learnarea_id, // 学习场地ID
		is_publish: store.state.formData.is_publish // 是否公开发布 1是 2否
	});
	if (data.code === SUCCESS_CODE) {
		uni.navigateTo({
			url: '/pages/release_more/release_more'
		});
	}else{
		uni.showToast({
			icon:'none',
			title:data.msg
		})
	}
};
</script>

<style lang="scss" scoped>
.content {
	height: 100vh;
	background: #8d91fc;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	.content-header {
		.returnbtn {
			width: 30rpx;
			height: 50rpx;
			image {
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		.title {
			color: #fff;
		}
	}
	.content-box {
		flex: 1;
		background: #8d91fc;
		overflow: auto;
		.list {
			padding: 0 30rpx 160rpx 30rpx;
			.item {
				&.radio-list-box {
					display: flex;
					line-height: 80rpx;
					height: 80rpx;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx 0;
				}
				.radio-list {
					display: flex;
					align-items: center;
					.radio-list-item {
						display: flex;
						align-items: center;
						&.left-pad {
							margin-right: 30rpx;
						}
						image {
							display: block;
							width: 36rpx;
							height: 36rpx;
						}
						view {
							color: #fff;
							padding: 0 10rpx;
						}
					}
				}
				.item-title {
					line-height: 80rpx;
					height: 80rpx;
					color: #fff;
					font-weight: bold;
				}
				.item-input {
					line-height: 80rpx;
					height: 80rpx;
					padding: 0 20rpx;
					background: #fff;
					border-radius: 20rpx;
					box-sizing: border-box;
					&.hidtext {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box; //作为弹性伸缩盒子模型显示。
						-webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
						-webkit-line-clamp: 1; //显示的行
					}
				}
				.item-text {
					width: 100%;
					display: block;
					box-sizing: border-box;
					min-height: 40rpx;
					background: #fff;
					border-radius: 20rpx;
					padding: 20rpx;
				}
				.img-list {
					display: flex;
					.upload-img {
						width: 210rpx;
						height: 210rpx;
						margin-right: 20rpx;
						image {
							display: block;
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
	}
	.content-bottom {
		.bottom-box {
			.info {
				padding: 0 40rpx;
				height: 50rpx;
				line-height: 50rpx;
				font-size: 24rpx;
				background: #fff;
				color: #4a4a4a;
				display: flex;
				align-items: center;
				::v-deep .uni-checkbox-input {
					display: block;
					width: 26rpx;
					height: 26rpx;
					margin-top: -6rpx;
				}
				::v-deep .uni-checkbox-input:hover {
					border-color: #8d91fc;
				}
				text {
					color: #8d91fc;
				}
			}
			.btn {
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				color: #fff;
				background: #3e87b6;
			}
		}
	}

	.clss-time-box {
		position: fixed;
		left: 0;
		bottom: 0;
		height: 100vh;
		width: 100%;
		background: rgba(0, 0, 0, 0.6);
		z-index: 3000;
		.clss-time-content {
			display: flex;
			width: 100%;
			height: 100%;
			flex-direction: column;
			justify-content: flex-end;
			align-items: center;
			.time-content {
				width: 100%;
				.title {
					display: flex;
					justify-content: space-between;
					line-height: 80rpx;
					height: 80rpx;
					padding: 32rpx;
					background: #fff;
					border-radius: 30rpx 30rpx 0rpx 0rpx;
				}
				.list-content {
					.picker-view {
						width: 100%;
						height: 500rpx;
						background: #d4efee;
						:deep(.uni-picker-view-mask) {
							// background:transparent
						}
						// :deep(.uni-picker-view-indicator){
						// 	// color: #3E87B6;
						// }
						.item {
							line-height: 80rpx;
							text-align: center;
							color: #3e87b6;
						}
					}
				}
			}
		}
	}
}
</style>
