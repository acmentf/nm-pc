/*
 * @Author: TF
 * @Date: 2021-02-24 10:09:17
 * @LastEditTime: 2021-03-03 11:26:07
 * @LastEditors: FeikeQ
 * @FilePath: /nami-pc/api/schedule.js
 * @Description: 
 */
import Axios from "@/plugins/request.js" 

// 获取赛程列表
export async function getScheduleList(data) {
	
	try {
		const result = await Axios.request({
			url: `/IFAppWebUIMatch`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

//获取联赛详情数据 
export async function getScheduleDetailTop(data) {
	
	try {
		const result = await Axios.request({
			url: `/IFAppUI_TLD_NL`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

//获取联赛详情战队数据 
export async function getTeamsDetail(data) {
	
	try {
		const result = await Axios.request({
			url: `/IFAppUI_TLD_BT`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}



// 联赛详情- 赛事安排
export async function getLeagueResult(params,handle) {
	try {
        let method = 'POST';
        let obj ={
            url: `/IFAppUI_TLD_Result`,
            method
        };
        if(method.toLowerCase()=='get'){
            obj.params = params;
        }else{
            obj.data = params;
        }
        const result = await Axios.request(obj);
        if(handle) return handle(result);
		return result;
	} catch (e) {
		throw e;
	}
};


//联赛详情- 数据榜 
export async function getTeamsTableList(data) {
	
	try {
		const result = await Axios.request({
			url: `/IFAppUI_TLD_RankList`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}
