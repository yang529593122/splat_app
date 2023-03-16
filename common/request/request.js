
import { BASE_URL,BASE_URL_TEST } from "./base_url.js"



const request = (url, method, data = {}, option = {}) => {
			let user_token = ""
		if(uni.getStorageSync('user')){
			let user =  JSON.parse(uni.getStorageSync('user'))
				user_token = user.user_token
		}
    return new Promise((resolve, reject) => {
        uni.request({
            url: BASE_URL + url,
            method: method || 'POST', // 默认 post 请求
            data: data,
						sslVerify:false,
						header:{
							'user-token':user_token,
						},
            success: res => { // 服务器成功返回的回调函数
                if (res.statusCode === 200) {
                    let result = res.data
                    // if (result.errcode === '0') {
                        resolve(result)
                    //     return
                    // }
                    // reject(result.errmsg)
                } else { // 返回值非 200，强制显示提示信息
                    reject('[' + res.statusCode + '] 系统处理失败')
                }
            },
            fail: (err) => { // 接口调用失败的回调函数
								console.log(err,"报错信息")
                if (err.errMsg != 'request:fail abort') {
                    reject('连接超时，请检查您的网络。')
                }
            }
        })
    })
}
export default request;