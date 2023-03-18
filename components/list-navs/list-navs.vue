<template>
	<view class="list" :class="{
		isBorder:is_hy
	}">
		<view class="item" v-for="(item,index) in list" :key="index" @click="selectItem(item,index)">
			<view class="title" :class="{
				textActived: itemIndex === index,
				isBg:iconBg && itemIndex === index
				
			}" >
				{{ item.name }}
				<view class="actived"  :style="{ 'background': iconBg }" v-if="itemIndex === index"></view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue";
 defineProps(['list','is_hy','iconBg'])
const emits = defineEmits(['change'])
	const itemIndex = ref(0)
	const selectItem = (item,index) => {
		itemIndex.value = index
		emits('change',item)
	}
</script>

<style lang="scss" scoped>
.list{
	display: flex;
	justify-content: space-around;
	border-bottom: 1rpx solid #C5E8E7;
	&.isBorder{
		border-bottom:none;
	}
	.title{
		position: relative;
		padding: 30rpx 0;
		color: #666666;
		&.textActived{
			color: #2C3034;
		}
		&.isBg{
			color: #fff;
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