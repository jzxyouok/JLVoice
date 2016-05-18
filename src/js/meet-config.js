var tag = true;
if(tag){
	var meet_config={
		url:{
			//登录码登录接口
			signcode:'/gome-manager-web/meeting/validateMeetCode',
			//姓名登录接口
			sign:'/gome-manager-web/meetManager/signMeetJionPerson',
			//会议欢迎信接口
			welcome:'/gome-manager-web/meetManager/queryWelcomeLetter',
			//专家接口
			expert:'/gome-manager-web/professor/queryMeetingProfessor',
			//会议日程接口
			schedule:'/gome-manager-web/meetingSchedule/querySchedule',
			//会议资料接口
			data:'/gome-manager-web/meetingData/queryData',
			//发送邮箱接口
			senddata:'/gome-manager-web/meetingData/downloadFile',
			//获取我的提问接口
			getask:'/gome-manager-web/meetingInteract/addInteract',
			//发送提问接口
			ask:'/gome-manager-web/meetingInteract/queryOnWall',
			//发送投票接口
			vote:'/gome-manager-web/meetingVote/addVote',
			//是否可以投票接口
			isvote:'/gome-manager-web/meetingVote/queryVoteStatus'
		}
	}
}else{
	var meet_config={
		url:{
			signcode:'/json/signcode.js',
			sign:'/json/sign.js',
			welcome:'/json/welcome.js',
			expert:'/json/expert.js',
			schedule:'/json/schedule.js',
			data:'/json/data.js',
			senddata:'/json/data.js',
			getask:'/json/ask.js',
			ask:'/json/data.js',
			vote:'/json/data.js',
			isvote:'/json/data.js'
		}
	}
}

