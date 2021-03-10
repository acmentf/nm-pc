//
import * as api from '@/api/matchDetail'
import utils from '@/plugins/utils'
export const state = () => {
  return {
    game_num: [],//局数
    game_num_render: ['第一局', '第二局', '第三局', '第四局', '第五局', '第六局', '第七局', '第八局', '第九局'],
    player_info: [],
    position_list: [],
    type: 2,
    history_match_info: [],
    history_battle_gkd: [],
    nearlyData: null,
    nearlyBatHomeData: null,
    nearlyBatAwayData: null
  }
}
export const actions = {
  //获取比赛顶部数据
  async _getMatchTopData({ commit, state }) {
    let { game_id, match_id } = state;
    let data = await api.getMatchTopData({ game_id, match_id });
    //通过后台round字段自动计算比赛局数
    let { mnl } = data;
    if (mnl.round) {
      commit('setGameNum', mnl.round)
    }
    return data;
  },
  //获取选手阵容数据
  async _getMatchDetailPlayer({ commit, state },{subtype}) {
    let { game_id, match_id ,type} = state;
    let data = await api.getMatchDetailPlayer({ game_id, match_id,subtype,type });
    let { player_info, position_list } = data;
    commit('setPlayerInfo', { player_info, position_list })
  },
  //获取比赛详情数据
  async _getMatchDetail({ commit, state }) {
    let { game_id, match_id } = state;
    let data = await api.getMatchDetail({ game_id, match_id });
    return data
  },
  _setParmars({ commit }, { game_id, match_id }) {
    commit('setParmars', { game_id, match_id })
  },
  //获取历史交手记录
  async _getHistoryData({ commit, state }, { subtype }) {
    let { game_id, match_id, type } = state;
    let historyData = await api.getHistoryData({ game_id, match_id, type, subtype });
    let { history_battle_gkd, history_match_info } = historyData;
    commit('setHistory', { history_battle_gkd, history_match_info })
  },
  //近期数据统计
  async _getNearlyData({ commit, state }, { subtype, pagetype }) {
    let { game_id, match_id, type } = state;
    let data = await api.getNearlyData({ game_id, match_id, type, subtype, pagetype });
    commit('setNear', { data, pagetype })
  },
  //获取局数据（LOL,DOTA2）
  async _getLiveData({ commit, state },{box_num}){
    let { game_id, match_id } = state;
    let data = await api.getLiveData({ game_id, match_id, box_num });
    commit('setLiveData',data)
  },
  

}
export const mutations = {
  setGameNum(state, list) {
    let round = []
    for (let i = 1; i <= list; i++) {
      round.push({
        lable: state.game_num_render[i - 1],
        value: i,
        actived: false
      })
    }
    state.game_num = round
  },
  setPlayerInfo(state, { player_info, position_list }) {
    state.player_info = player_info;
    state.position_list = position_list;
  },
  setParmars(state, { game_id, match_id }) {
    state.game_id = game_id;
    state.match_id = Number(match_id)
  },
  setHistory(state, { history_battle_gkd, history_match_info }) {
    let history_match_List = utils.renderToTableData(
      history_match_info.feild,
      history_match_info.item_value
    );
    state.history_battle_gkd = history_battle_gkd;
    state.history_match_info = history_match_List;
  },

  setNear(state, { data, pagetype }) {
    switch (pagetype) {
      case 0:
        state.nearlyData = data;
        break;
      case 1:
        state.nearlyBatHomeData = utils.renderToTableData(
          data.feild,
          data.item_value
        );
        break;
      case 2:
        state.nearlyBatAwayData = utils.renderToTableData(
          data.feild,
          data.item_value
        );;
        break;
    }
  },
  setLiveData(state,data){
    state.resources_info = data.resources_info;
    state.roleselect_info = data.roleselect_info;
    state.role_attr_info_away = data.roleattribute_info.role_attr_info_away
    state.role_attr_info_home = data.roleattribute_info.role_attr_info_home
    state.battle_info = data.battle_info
    state.economics_info = data.economics_info
    state.data_rank_list = data.data_rank_list
    state.rcffj_list =data.rcffj_list
  }

}

