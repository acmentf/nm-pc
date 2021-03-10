/*
 * @Author: FeikeQ
 * @Date: 2020-12-16 11:51:04
 * @LastEditTime: 2021-02-23 15:55:33
 * @LastEditors: FeikeQ
 * @FilePath: /ti-pc/api/team.js
 * @Description: 
 */
import Axios from "@/plugins/request.js"
import $utils from '@/plugins/utils'

// 格式化战队排行数据
export const $formatTeamList = (array) => {
    /*
    [
        {
            id:25561,
            rank: "2",
            team: {
                logo: "/images/live.png",
                short_name: "RNG",
                name: "Royal Never Give Up"
            },
            country: {
                img: "/images/national_flag.png",
                name: "泰国"
            },
            score: 1024
        }
    ]
    */
    if(!array || !array.length) return [];
    var data =[];
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        let _tmp = {};
        _tmp.id = element.team_id;
        _tmp.rank = element.team_rank;
        _tmp.score = element.score;
        _tmp.team = {logo:element.team_img_url,short_name:element.team_name,name:element.team_name_long};
        _tmp.country = {img: element.country_img_url,name:element.country_name};
        data.push(_tmp);
    }
    return data;
};


// 获取区域信息
export async function getAreaInfo(params,handle) {
	try {
        let method = 'POST';
        let obj ={
            url: `/IFAreaInfo`,
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
}



// 获取战队列表
export async function getTeamList(params,handle) {
	try {
        let method = 'post';
        let obj ={
            url: `/IFAppUIBattleTeamList`,
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
}



// 战队详情-顶部 战队简讯
export async function getTeamInfo(params,handle) {
	try {
        let method = 'post';
        let obj ={
            url: `/IFAppUI_BTD_NL`,
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
}

// 战队详情-资料页面
export async function getTeamInfoRes(params,handle) {
	try {
        let method = 'post';
        let obj ={
            url: `/IFAppUI_BTD_Resource`,
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
}




// 战队详情-数据页面-成员及下拉列表
export async function getTeamPlayer(params,handle) {
	try {
        let method = 'post';
        let obj ={
            url: `/IFAppUI_BTD_Data_MOL`,
            method
        };
        if(method.toLowerCase()=='get'){
            obj.params = params;
        }else{
            obj.data = params;
        }
        
        const _player = await Axios.request(obj);
        var _data ={
            player:[],
            typeFilter:[],
            tournaments:null, // 默认值
            tournamentsFilter:[],
            times:null,// 默认值
            timesFilter:[],
        };

        if (_player) {
            if(_player.team_members){
                for (let index = 0; index < _player.team_members.length; index++) {
                    const element = _player.team_members[index];
                    var _obj = {
                                id:element.player_id,
                                name:element.player_name,
                                seat:element.position,
                                seatname:element.position_str,
                                pic:element.player_icon,
                            };
                    _data.player.push(_obj);
                }
            }

            // 下拉框
            if(_player.select_list){
                if(_player.select_list.titels){
                    for (let index = 0; index < _player.select_list.titels.length; index++) {
                        const element = _player.select_list.titels[index];
                        _data.typeFilter.push({
                            value: element.ivalue,
                            label: element.name
                        });
                    }
                }
                if(_player.select_list.tournaments){
                    for (let index = 0; index < _player.select_list.tournaments.length; index++) {
                        const element = _player.select_list.tournaments[index];
                        _data.tournamentsFilter.push({
                            value: element.ivalue,
                            label: element.name
                        });
                        _data.tournaments = element.ivalue;
                    }
                }
                if(_player.select_list.times){
                    for (let index = 0; index < _player.select_list.times.length; index++) {
                        const element = _player.select_list.times[index];
                        _data.timesFilter.push({
                            value: element.ivalue,
                            label: element.name
                        });
                        _data.times = element.ivalue;
                    }
                }        
            }
        }

        if(handle) return handle(_data);
		return _data;
	} catch (e) {
		throw e;
	}
}

// 战队详情-数据页面-赛事荣耀
export async function getTeamHonor(params,handle) {
	try {
        let method = 'post';
        let obj ={
            url: `/IFAppUI_BTDD_Honor`,
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
}


// 战队详情-比赛页面
export async function getTeamMatch(params,handle) {
	try {
        let method = 'post';
        let obj ={
            // url: `/IFAppUI_BTD_Match`,
            url: `/IFAppUI_BTD_MatchPC`,
            method
        };
        if(method.toLowerCase()=='get'){
            obj.params = params;
        }else{
            obj.data = params;
        }
        var _data ={
            recent:[],
            future:[],
            
        }

        var formatData =function(list){
            var _list = []
            for (let index = 0; index < list.length; index++) {
                const dataItem = list[index];
                _list.push({
                    time:dataItem.base.match_time, //"2020-11-1 15:30",
                    rule:dataItem.base.box,
                    home:{
                        amidithion:(dataItem.base.home_score > dataItem.base.away_score)?1:0,
                        name:dataItem.base.home.team_short_name,
                        logo:dataItem.base.home.team_img,
                        score:dataItem.base.home_score,
                        team_id:dataItem.base.home.team_id //预留
                    },
                    away:{
                        amidithion:(dataItem.base.away_score >dataItem.base.home_score)?1:0,
                        name:dataItem.base.away.team_short_name,
                        logo:dataItem.base.away.team_img,
                        score:dataItem.base.away_score,
                        team_id:dataItem.base.away.team_id //预留
                    },
                    //预留
                    status_id:dataItem.base.status_id,
                    match_id:dataItem.base.match_id,
                    game:dataItem.game_id_str, //游戏
                    room_id:dataItem.base.room_id,
                });
            }
            return _list;
        };

        const result = await Axios.request(obj);
        if(result){
            if(result.the_recent_result && result.the_recent_result.group_item){

                for (let index = 0; index < result.the_recent_result.group_item.length; index++) {
                    const recentE = result.the_recent_result.group_item[index];
                    _data.recent.push({
                        tournament_id: recentE.group_name,
                        tournament_name: recentE.group_str,
                        tournament_statu: recentE.group_state,
                        list:formatData(recentE.group_item)
                    })
                }

                

            }
            if(result.the_future_schedule && result.the_future_schedule.group_item){
                for (let index = 0; index < result.the_future_schedule.group_item.length; index++) {
                    const futureE = result.the_future_schedule.group_item[index];
                    _data.future.push({
                        tournament_id: futureE.group_name,
                        tournament_name: futureE.group_str,
                        tournament_statu: futureE.status,
                        list:formatData(futureE.group_item)
                    })
                }
            }
            
        }

        if(handle) return handle(_data);
		return _data;
	} catch (e) {
		throw e;
	}
}




// 战队详情-数据页面-数据展示部分
export async function getTeamData(params,handle) {
	try {
        let method = 'post';
        let obj ={
            url: `/IFAppUI_BTD_Data`,
            method
        };
        if(method.toLowerCase()=='get'){
            obj.params = params;
        }else{
            obj.data = params;
        }
        const data = await Axios.request(obj);




        // 预处理数据
        var result={
            tags:[],
            radarChart:{
                indicator:[],
                v1:[],
                v2:[],
            },
            commonHeroes:[],
            mapData:[],
        };

        // 标签集
        if(data && data.team_stat1) result.tags = data.team_stat1;
        
        // 雷达图
        if(data && data.team_stat2){
            
            result.radarChart.indicator =[];
            var _data0 =[],_data1=[];
            for (let index = 0; index < data.team_stat2.length; index++) {

                const element = data.team_stat2[index];

                let total = (element.a_value *1) + (element.b_value*1);
                let home =  (element.a_value *1 / total)*100;
                let away =  (element.b_value *1 / total)*100;
                
                
                var _indicator_obj = {
                        name: {
                            title:element.name,
                            home:(element.type==2)?$utils.realFormatSecond(element.a_value):element.a_value*1+'%',
                            away:(element.type==2)?$utils.realFormatSecond(element.b_value):element.b_value*1+'%',
                        },
                        max: 100
                    };
                result.radarChart.indicator.push(_indicator_obj);
                
                _data0.push(home);
                _data1.push(away);
                
            }

            // console.log("_data0_data1",_data0,_data1);
            
            result.radarChart.v1 = _data0;
            result.radarChart.v2 = _data1;
            
            
        }

        // 英雄榜单
        if(data && data.hero_stat){
            var _commonHeroes =  [];
            if(data.hero_stat.data){
                for (let index = 0; index < data.hero_stat.data.length; index++) {
                    const element = data.hero_stat.data[index];
                    
                    var _obj ={
                        id:element.hero_id, //预留
                        hero: {
                            pic: element.hero_img,
                            name:element.hero_name,
                        },
                        attendances: element.enter, // 出场数
                        attendance: '-', //出场率
                        winning:element.win_rate,
                        firstBlood: element.first_blood,
                        tower:element.first_towers,
                        pentaKill: element.five_kills,
                        decaKill: element.ten_kills,
                        lost:element.lost,//预留
                        win:element.win,//预留
                    };
                    _commonHeroes.push(_obj);
                }
            }
            result.commonHeroes = _commonHeroes;
        }

        // 地图榜
        if(data && data.map_stat) result.mapData = data.map_stat;
        
        if(handle) return handle(result);
		return result;
	} catch (e) {
		throw e;
	}
}


 




























/* 队员详情 */

//战队详情-战队队员详情- 队员简介及下拉列表
export async function getPlayerInfo(params,handle) {
	try {
        let method = 'post';
        let obj ={
            url: `/IFAppUI_BTDD_PD_NL`,
            method
        };
        if(method.toLowerCase()=='get'){
            obj.params = params;
        }else{
            obj.data = params;
        }
        const _player = await Axios.request(obj);

        var _data ={
            info:{},
            typeFilter:[],
            tournaments:null, // 默认值
            tournamentsFilter:[],
            times:null,// 默认值
            timesFilter:[],
        };
        
        if (_player) {
            if(_player.player_nl) _data.info = _player.player_nl;

            // 下拉框
            if(_player.select_list){
                if(_player.select_list.titels){
                    for (let index = 0; index < _player.select_list.titels.length; index++) {
                        const element = _player.select_list.titels[index];
                        _data.typeFilter.push({
                            value: element.ivalue,
                            label: element.name
                        });
                    }
                }
                if(_player.select_list.tournaments){
                    for (let index = 0; index < _player.select_list.tournaments.length; index++) {
                        const element = _player.select_list.tournaments[index];
                        _data.tournamentsFilter.push({
                            value: element.ivalue,
                            label: element.name
                        });
                        _data.tournaments = element.ivalue;
                    }
                }
                if(_player.select_list.times){
                    for (let index = 0; index < _player.select_list.times.length; index++) {
                        const element = _player.select_list.times[index];
                        _data.timesFilter.push({
                            value: element.ivalue,
                            label: element.name
                        });
                        _data.times = element.ivalue;
                    }
                }        
            }
        }

        if(handle) return handle(_data);
		return _data;
	} catch (e) {
		throw e;
	}
}


// 战队详情-战队队员详情- 数据及比赛列表副本
export async function getPlayerData(params,handle) {
	try {
        let method = 'post';
        let obj ={
            // url: `/IFAppUI_BTDD_PD`,
            url: `/IFAppUI_BTDD_PD_PC`,
            method
        };
        if(method.toLowerCase()=='get'){
            obj.params = params;
        }else{
            obj.data = params;
        }
        const data = await Axios.request(obj);

        // 预处理数据
        var result={
            tags:[],
            radarChart:{
                indicator:[],
                v1:[],
                v2:[],
            },
            heroeData:[],
            gunData:[],
        };
        
        if(data){
            result._debug_ = data; //debug
            if(data.player_stat) result.tags = data.player_stat;
            // 常用英雄
            if(data.role_history){
                var _commonHeroes =  [];
                for (let index = 0; index < data.role_history.length; index++) {
                    const element = data.role_history[index];
                    
                    var _obj ={
                        id:element.role_id, //预留
                        hero: {
                            pic: element.role_img_url,
                            name:element.role_name,
                        },
                        attendances: element.enter, // 出场数
                        firstBlood: element.first_blood_rate,
                        tower: element.first_tower_rate,
                        pentaKill: element.first_five_kill_rate,
                        decaKill: element.first_ten_kill_rate,
                        winning:element.win_rate,
                        win_enter_rate:element.win_enter_rate, //预留
                        lost:element.lost,//预留
                        win:element.win,//预留
                        enter_rate:element.enter_rate//预留
                    };
                    _commonHeroes.push(_obj);
                }
                result.heroeData = _commonHeroes;
            }
            // 常用武器
            if(data.weapen) result.gunData = data.weapen;
            // 能力图谱 (雷达图)
            if(data.ability_map){

                result.radarChart.indicator =[];
                var _data0 =[],_data1=[];
                for (let index = 0; index < data.ability_map.length; index++) {

                    const element = data.ability_map[index];

                    let total = (element.a_value *1) + (element.b_value*1);
                    let home =  (element.a_value *1 / total)*100;
                    let away =  (element.b_value *1 / total)*100;
                    
                    // let home = element.a_value;
                    // let away = element.b_value
                    
                    var _indicator_obj = {
                            name: {
                                title:element.name,
                                home:(element.type==10)?(element.a_value*1+'%'):element.a_value,
                                away:(element.type==10)?(element.b_value*1+'%'):element.b_value,
                            },
                            max: 100
                    };
                    result.radarChart.indicator.push(_indicator_obj);
                    
                    _data0.push(home);
                    _data1.push(away);
                }
                result.radarChart.v1 = _data0;
                result.radarChart.v2 = _data1; 
            }
        }
        
        if(handle) return handle(result);
		return result;

	} catch (e) {
		throw e;
	}
}

