	import { afterTime } from "@/tools/index.js"

export const MESSAGE_NAVS = [
	{
		id:1,
		title:"平台消息",
		imgUrl:"../../static/logo.png"
	},
	{
		id:2,
		title:"站内消息",
		imgUrl:"../../static/logo.png"
	},
	{
		id:3,
		title:"评价消息",
		imgUrl:"../../static/logo.png"
	},
	{
		id:4,
		title:"新朋友",
		imgUrl:"../../static/logo.png"
	}
]

export const MAY_INFO_NAVS = [
	{
		id:1,
		title:"学习级别",
		imgUrl:"../../static/my/xxjb.png",
		page:'/pages/learning_level/learning_level'
	},
	{
		id:2,
		title:"学习记录",
		imgUrl:"../../static/my/xxjl.png",
		page:'/pages/learning_record/learning_record'
	},
	{
		id:3,
		title:"会员等级",
		imgUrl:"../../static/my/hydj.png",
		page:'/pages/membership_level/membership_level'
	},
	{
		id:4,
		title:"会员记录",
		imgUrl:"../../static/my/hyjl.png",
		page:'/pages/membership_record/membership_record'
	},
	{
		id:5,
		title:"关注的人",
		imgUrl:"../../static/my/gzdr.png",
		page:'/pages/follower/follower'
	},
	{
		id:6,
		title:"我的收藏",
		imgUrl:"../../static/my/wdsc.png",
		page:'/pages/my_collection/my_collection'
	}
]

export const MAY_APP_NAVS = [
	{
		id:1,
		title:"法律声明",
		imgUrl:"../../static/my/fvsm.png",
		page:'/pages/legal_declaration/legal_declaration'
	},
	{
		id:2,
		title:"功能介绍",
		imgUrl:"../../static/my/gnjs.png",
		page:'/pages/function_introduction/function_introduction'
	},
	{
		id:3,
		title:"分享APP",
		imgUrl:"../../static/my/fxapp.png",
		page:'/pages/share_app/share_app'
	},
	{
		id:4,
		title:"联系我们",
		imgUrl:"../../static/my/lxwm.png",
		page:'/pages/contact_us/contact_us'
	}
]

export const LEARN_TIME_DATE = 	afterTime(14,true)

export const LEARN_TIME = [
	'08:00 - 09:00',
	'09:00 - 10:00',
	'10:00 - 11:00',
	'11:00 - 12:00',
]

export const HOURS_AFTER_TEXT = '在开课3小时之内取消课程了，则不返还次数，确认取消课程吗？'
export const HOURS_BEFORE_TEXT = '在开课3小时之前取消课程了，则返还次数，是在课程预约的时间过了之后才返还这个次数，确认取消课程吗？'