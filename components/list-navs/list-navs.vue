<template>
	<view class="list-nav">
		<view class="list-nav-item" v-for="(item,index) in 4" :key="index" @click="selectItem(item,index)">
			<view class="text" :class="{
				textActived: itemIndex === index
			}">
				全部
				<view class="actived" v-if="itemIndex === index"></view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue";
const emits = defineEmits(['change'])
	const itemIndex = ref(0)
	const selectItem = (item,index) => {
		itemIndex.value = index
		emits('change',item)
	}
</script>

<style lang="scss" scoped>
.list-nav{
	display: flex;
	justify-content: space-around;
	border-bottom: 1rpx solid #C5E8E7;
	.text{
		position: relative;
		padding: 30rpx 0;
		color: #666666;
		&.textActived{
			color: #2C3034;
		}
		.actived{
			position: absolute;
			width: 50rpx;
			height: 7rpx;
			background: #3E87B6;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
		}
	}
}
</style>