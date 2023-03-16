import {
	createStore
} from 'vuex'
const store = createStore({
	state: { //存放状态
		formData: {
			name: '', //
			brief: '',
			content: '',
			thumb: [], // 课程图片
			enroll: '', // 报名人数
			user_id: '', // 学生用户id
			end_time: '', // 授课结束时间
			lesson_time: '', // 授课开始时间
			learnarea_id: '', // 学习场地ID
			is_publish: 1 // 是否公开发布 1是 2否
		},
		classTimeStr:'',
		classNameRoom:''
	},
	mutations: {
		onchangeThumb(state , arr) {
			state.formData.thumb = arr
		},
		setTime(state , str) {
			let arr = str.split(' ');
			state.formData.lesson_time = arr[0] + ' ' + arr[1];
			state.formData.end_time = arr[0] + ' ' + arr[3];
			state.classTimeStr = str
		},
		setClassNameRoom(state,item){
			state.classNameRoom = item.location
			state.formData.learnarea_id = item.aid
		},
		set_is_publish(state,item){
			state.formData.is_publish = item
		},
		hxData(state,data){
			state.formData.name =  data.name
			state.formData.brief =  data.brief
			state.formData.content =  data.content
			state.formData.thumb =  data.thumb
			state.formData.enroll =  data.enroll
			// state.formData.user_id =  data.user_id
			// user_id: '', // 学生用户id
			state.formData.end_time =  data.lesson_time.split(' ')[0] + ' ' + data.end_time
			state.formData.lesson_time =  data.lesson_time
			state.formData.learnarea_id =  data.learnarea_id
			state.formData.is_publish =  data.is_publish
			state.classTimeStr = data.study_time
			state.classNameRoom = data.learnarea_address
		}
	},
	actions: {
	  increment ({ commit }) {
	    commit('increment')
	  }
	}
})

export default store
