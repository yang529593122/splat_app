// 获取14天的时间数组

export const afterTime = (num,include) => {
	let today=new Date();
	let dateArr=[]
	let cs = !include ? 0 : 1 ;
	for(let i = cs;i<num;i++){
			let newDate=new Date(today.getTime()+i*1000*60*60*24)
			let year=newDate.getFullYear()
			let month=(parseInt(newDate.getMonth())+1)>9?(parseInt(newDate.getMonth())+1):"0"+(parseInt(newDate.getMonth())+1)
			let day=(newDate.getDate())>9?newDate.getDate():"0"+newDate.getDate()
			let fullDate=`${year}-${month}-${day}`
			dateArr.push(fullDate)
	}
	return dateArr
}

// 几个小时之前
export const timeHours = (hours,date) => {
	// 当前时间秒数
	let timestamp = new Date().getTime();
	// 对比时间 秒数
	let comparisonTime = new Date(date).getTime()
	
	let difference = hours*60*60	
	console.log(difference)
	
	if(comparisonTime - timestamp >= difference){
		return true
	}else{
		return false
	}
}