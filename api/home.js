/*
 * @Author: YiKang
 * @Date: 2021-01-07 11:19:31
 * @LastEditTime: 2021-02-03 11:02:49
 * @LastEditors: FeikeQ
 * @FilePath: /ti-pc/api/home.js
 * @Description: 
 */
import Axios from "@/plugins/request.js"

// 获取比赛列表 by FeikeQ
export async function getMatchList(params, handle) {
	try {
		let method = 'POST';
		let obj = {
			url: `/IFAppWebUIMatch`,
			method
		};
		if (method.toLowerCase() == 'get') {
			obj.params = params;
		} else {
			obj.data = params;
		}
		const _matchList = await Axios.request(obj);
		var _key = ["err", "notstarted", "processing", "endover"]; //["异常","未开赛","进行中","完场"]
		var _data = {
			notstarted: [],
			processing: [],
			endover: [],
			sortList: [],
			pp: params,
		}
		if (_matchList) {
			if (params.style === 1) {
				for (let index = 0; index < _matchList.length; index++) {
					const element = _matchList[index];
					if (element.group_name) _data[_key[element.group_name] || element.group_name] = element.group_item;
				}
			} else {
				_data.sortList = _matchList;
			}

		}
		if (handle) return handle(_data);
		return _data;
	} catch (e) {
		throw e;
	}
}
// 获取公共信息 by FeikeQ
export async function getPublicData(params, handle) {
	try {
		let method = 'POST';
		let obj = {
			url: `/IFAppGameData`,
			method
		};
		if (method.toLowerCase() == 'get') {
			obj.params = params;
		} else {
			obj.data = params;
		}
		const result = await Axios.request(obj);
		if (handle) return handle(result);
		return result;
	} catch (e) {
		throw e;
	}
}


// 获取战队排行榜
export async function getTeamRanking(params, handle) {
	try {
		let method = 'post';
		let obj = {
			url: `/IFAppUIBattleTeamList`,
			method
		};
		if (method.toLowerCase() == 'get') {
			obj.params = params;
		} else {
			obj.data = params;
		}
		const result = await Axios.request(obj);
		if (handle) return handle(result);
		return result;
	} catch (e) {
		throw e;
	}
}
//获取系统时间
export async function getSystemTime(data) {
	try {
		const result = await Axios.request({
			url: `IFGetTime`,
			method: 'post',
			data
		})
		return result
	} catch (e) {
		throw e
	}
}
