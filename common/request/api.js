
import request  from "./request.js"



// 首页  轮播图
export const getBanners =  () => {
  return  request(`/api/m2867/63fc04f498193`, 'POST')
}
// 首页 公告
export const getAnnouncement =  () => {
  return  request(`/api/m2867/63fc09d3d84d2`, 'POST',{ category_id:7 })
}
// 首页 发布
export const getRelease =  (params) => {
  return  request(`/api/m2867/63f9d1971f6b0`, 'POST',params)
}
// 首页 课程
export const getCourse =  (params) => {
  return  request(`/api/m2867/63f9e4d13856d`, 'POST',params)
}


// 登录模块

// 登录  验证码登录
export const postCodeLogin =  (params) => {
  return  request(`/api/m2867/5c78dca45ebc1`, 'POST',params)
}

// 课程详情

// 课程详情 老师
export const getCourseDetailsTeacher =  (params) => {
  return  request(`/api/m2867/63f9d5864f4f3`, 'POST',params)
}
// 课程详情 普通用户
export const getCourseDetailsUser =  (params) => {
  return  request(`/api/m2867/63f9ee29afbcc`, 'POST',params)
}
// 课程详情 立即报名  取消报名 
export const autoEnrolllogEnroll =  (params) => {
  return  request(`/api/m2867/63fd732230277`, 'POST',params)
}
// 课程详情   	点击关注/取消关注	 
export const userFollow =  (params) => {
  return  request(`/api/m2867/63fd56723e103`, 'POST',params)
}
// 课程详情   	收藏
export const userAddonsSetCollection =  (params) => {
  return  request(`/api/m2867/63fd629be8064`, 'POST',params)
}
// 课程详情   	取消收藏
export const userAddonsCancelCollection =  (params) => {
  return  request(`/api/m2867/63fd69f377596`, 'POST',params)
}
// 课程详情   	取消课程
export const autoCourseCancelCourse =  (params) => {
  return  request(`/api/m2867/6401a44784b6a`, 'POST',params)
}

// 老师首页 
export const autoCourseGetTeacherInfo =  (params) => {
  return  request(`/api/m2867/640010df716f2`, 'POST',params)
}
// 添加搜索词条

export const autoHistoryAddHistory =  (params) => {
  return  request(`/api/m2867/64118e09aab8d`, 'POST',params)
}
// 搜索历史

export const autoHistoryGetHistory =  (params) => {
  return  request(`/api/m2867/641190052110a`, 'POST',params)
}
// 删除历史记录
	
export const autoHistoryDelHistory =  (params) => {
  return  request(`/api/m2867/64119072d6faa`, 'POST',params)
}

// 搜索用户 
export const autoUserGetUserList =  (params) => {
  return  request(`/api/m2867/6400860bddb4c`, 'POST',params)
}

// 发布课程 
export const autoCourseSetCourse =  (params) => {
  return  request(`/api/m2867/63f9bf2a972cb`, 'POST',params)
}
// 选择场地 
export const autoLearnareaGetLearnarea =  (params) => {
  return  request(`/api/m2867/63fecea5ed998`, 'POST',params)
}

// 日程  学生日程
export const autoEnrolllogGetRichengList =  (params) => {
  return  request(`/api/m2867/64014bc434eb1`, 'POST',params)
}
// 日程  老师日程
export const autoCourseGetTeacherRicheng =  (params) => {
  return  request(`/api/m2867/6406a73383eae`, 'POST',params)
}	
	


