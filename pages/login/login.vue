<template>
	<view class="login">
		<view class="logo">
			<image src="@/static/login/logo.png" mode=""></image>
		</view>
		<view class="logo-form">
			<view class="input">
				<input type="text" v-model="mobile" placeholder="请输入手机号">
				<image class="imgicon" src="@/static/login/zh.png" mode=""></image>
			</view>
			<view class="input" v-if='!showCodeStatus'>
				<input :type="!lookStatus ? 'password' : 'text'" placeholder="请输入密码(6~12位字母+数字)">
				<image class="imgicon" src="@/static/login/mm.png" mode=""></image>
				<image class="imgiconlk" src="@/static/login/lkmm.png" @click="lookMm" mode=""></image>
			</view>
			<view class="input" v-else>
				<input type="text" v-model="code" placeholder="请输入验证码">
				<image class="imgicon" src="@/static/login/mm.png" mode=""></image>
				<view class="yzmbtn" @click="getCode">获取验证码</view>
			</view>
			<view class="input yzm" @click="showCode">
				{{ !showCodeStatus ? "验证码登录" : "密码登录" }}
			</view>
			<view class="input btn" @click="login">
				登录
			</view>
			<view class="input text">
				<text>注册账号</text> ｜ <text>忘记密码</text> ｜ <text style="color: #000;"> 访客浏览 </text>
				<image src="@/static/login/icon.png" mode=""></image>
			</view>
		</view>
		<view class="bottom">
			<view class="title">
				<view class="line">

				</view>
				<text>快捷登录</text>
				<view class="line">

				</view>
			</view>
			<view class="type-login">
				<image src="@/static/login/wx.png" mode=""></image>
			</view>
			<view class="xy">
				<view class="info">
					<image src="@/static/login/xyicon.png" mode=""></image>已阅读并同意《用户注册协议》与《隐私政策》
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		postCodeLogin
	} from "@/common/request/api.js"
	import {
		SUCCESS_CODE
	} from "@/common/request/httpStatus.js"
	import {
		ref
	} from "vue";
	const lookStatus = ref(false)
	const lookMm = () => {
		lookStatus.value = !lookStatus.value
	}
	const showCodeStatus = ref(false)
	const showCode = () => {
		showCodeStatus.value = !showCodeStatus.value
	}
	const getCode = () => {
		console.log('获取验证码')
	}

	const mobile = ref('15515268264')
	const code = ref('123456')
	const login = () => {
		if (showCodeStatus.value) {
			codeLogin({
				mobile: mobile.value,
				code: code.value
			})
		} else {
			console.log('密码')
		}
	}
	// 验证码登录
	const codeLogin = async (params) => {
		const data = await postCodeLogin(params)
		if (data.code === SUCCESS_CODE) {
			uni.setStorageSync("user", JSON.stringify(data.data.userinfo))
			uni.switchTab({
				url:'/pages/home/home'
			})
		} else {

		}
	}
</script>

<style lang="scss" scoped>
	.login {
		height: 100vh;
		background: url("@/static/login/login_bg.png") no-repeat;
		background-size: 100% 100%;

		.logo {
			padding-top: 150rpx;
			padding-bottom: 100rpx;
			display: flex;
			justify-content: center;

			image {
				display: block;
				width: 322rpx;
				height: 180rpx;
			}
		}

		.logo-form {
			padding: 0 32rpx;

			.input {
				position: relative;
				margin-bottom: 34rpx;
				border-radius: 44rpx;
				background: #fff;

				input {
					height: 88rpx;
					line-height: 88rpx;
					padding: 0 82rpx;
				}

				.imgicon {
					position: absolute;
					display: block;
					width: 34rpx;
					height: 34rpx;
					left: 28rpx;
					top: 28rpx;
				}

				.imgiconlk {
					position: absolute;
					display: block;
					width: 34rpx;
					height: 34rpx;
					right: 28rpx;
					top: 28rpx;
				}

				.yzmbtn {
					position: absolute;
					display: block;
					right: 0;
					top: 0;
					font-size: 28rpx;
					height: 88rpx;
					line-height: 88rpx;
					color: #6EC2D5;
					padding: 0 24rpx;
				}

				&.yzm {
					background: transparent;
					text-align: right;
				}

				&.btn {
					text-align: center;
					font-size: 32rpx;
					color: #fff;
					background: #98C5D7;
					height: 88rpx;
					line-height: 88rpx;

				}

				&.text {
					background: transparent;
					text-align: center;
					color: #707E7F;

					image {
						display: inline-block;
						width: 28rpx;
						height: 24rpx;
					}
				}
			}
		}

		.bottom {
			position: fixed;
			width: 100%;
			bottom: 0;
			left: 0;

			.title {
				text-align: center;
				padding-bottom: 40rpx;
				font-size: 26rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.line {
					width: 200rpx;
					height: 1rpx;
					background: #92D2DE;
				}

				text {
					padding: 0 8rpx;
					color: #333333;
				}
			}

			.type-login {
				display: flex;
				justify-content: center;
				padding-bottom: 50rpx;

				image {
					display: block;
					width: 80rpx;
					height: 80rpx;
				}
			}

			.xy {
				font-size: 24rpx;
				padding-bottom: 40rpx;

				.info {
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						display: block;
						width: 20rpx;
						height: 20rpx;
						border-radius: 50%;
						margin-right: 10rpx;
					}
				}

			}
		}
	}
</style>
