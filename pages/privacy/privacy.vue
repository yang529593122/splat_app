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
						隐私政策
					</view>
				</template>
				
			</header-top>
		</view>
		
		<view class="content-box">
			1、勾选本协议前选项框并点击“注册”，将视为您签署了本协议，表明您自愿接受本协议全部条款的约束，本协议将构成您与上海佰集科技有限公司及其经营的“简书”平台（以下统称“简书”，包括相关关联方）之间具有约束力的法律文件。无论您是进入简书浏览网页，还是在简书上发布任何内容，或者是直接或通过各类方式（如站外API引用等）间接使用简书网服务和数据的行为，都将被视作已无条件接受本声明所涉全部内容。

				
		</view>
		
	</view>
</template>

<script setup>

const paddingTop = getApp().globalData.statusBarHeight+45;


	const returnPage = () => {
		uni.navigateBack({
			delta: 1
		})
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
				&.rightbtn{
					width: 48rpx;
					height: 48rpx;
				}
			}

			.title {
				color: #333333;
			}
		}
		.content-box{
			color: #2C3034;
			font-size: 30rpx;
		}
		



	}
</style>
