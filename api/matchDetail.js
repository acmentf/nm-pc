/** 比赛详情** IFAppUIDetailsTop **/
import Axios from "@/plugins/request.js";
// 获取比赛头部信息
export async function getMatchTopData(data) {
	try {
		const result = await Axios.request({
			url: `/IFAppUIDetailsTop`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}
// 获取比赛详情 数据
export async function getMatchDetailData(data) {
	try {
		const result = await Axios.request({
			url: `/IFAppUILiveVideo`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

// 获取比赛详情 阵容
export async function getMatchDetailBattle(data) {
	try {
		const result = await Axios.request({
			url: `/IFAppUIBattleArray`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

// 获取比赛详情 选手
export async function getMatchDetailPlayer(data) {
	try {
		const result = await Axios.request({
			url: `/IFAppUIPlayerInfo`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

// 获取比赛详情 分析
export async function getMatchDetailAnalyse(data) {
	try {
		const result = await Axios.request({
			url: `/IFAppUIAnalyse`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

//获取比赛详情 
export async function getMatchDetail(data){
	try {
		const result = await Axios.request({
			url: `/IFAppUIDetails`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

//获取历史交锋数据
export async function getHistoryData(data){
	try {
		const result = await Axios.request({
			url: `/IFAppUIAnalyse_HMI`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

// 获取历史交手记录
export async function getNearlyData(data){
	try {
		const result = await Axios.request({
			url: `/IFAppUIAnalyse_NMI`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

// LOL，csgo 比赛局数据
export async function getLiveData(data){
	try {
		const result = await Axios.request({
			url: `/IFAppUILiveVideoPC`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}

// CSGO 地图
export async function getMapData(data){
	try {
		const result = await Axios.request({
			url: `/IFAppUIMap`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}



// CSGO 选手数据
export async function getPlayerInfoData(data){
	try {
		const result = await Axios.request({
			url: `/IFAppUIPlayerInfoPC`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}
