//
import * as api from '@/api/schedule'
export const state = () => {
  return {
    list: [

    ],
    game_id: 'LOL',
    game_day: '',
    tournament_id: '',
    showCalendar: false,
    showInfo: false,
    topDetail: {},
    tableType: 1,//表格类型 1战队 2 选手 3 英雄 4 地图
    tableData: [],
    tableDataCache: {} //缓存容器
  }
}
export const actions = {
  //获取赛程列表
  async _getScheduleList({ commit, state }) {
    let { game_id, game_day } = state;
    let data = await api.getScheduleList({ game_id, game_day });
    commit('setList', data)
  },
  //获取赛程详情 顶部数据
  async _getScheduleDetailTop({ commit, state }) {
    let { game_id, tournament_id } = state;
    let data = await api.getScheduleDetailTop({ game_id, tournament_id });
    return data;
  },
  _setState({ commit }, { game_id, tournament_id }) {
    commit('setState', { game_id, tournament_id })
  },
  //获取战队数据列表 getTeamsDetail
  async _getTeamsDetail({ commit, state }) {
    let { game_id, tournament_id } = state;
    let data = await api.getTeamsDetail({ game_id, tournament_id });
    return data;
  },
  // 联赛详情- 赛事安排
  async _getLeagueResult({ commit, state }) {
    let { game_id, tournament_id } = state;
    const data = await api.getLeagueResult({ game_id, tournament_id });
    return data ? data.pvp : {}
  },
  //获取数据榜数据
  async _getTeamsTableList({ commit, state }, tableType) {
    let { game_id, tournament_id,tableDataCache } = state;
    let cacheKey = game_id + tournament_id + tableType;
    if (!tableDataCache[cacheKey]) {
      let data = await api.getTeamsTableList({ game_id, tournament_id, type: Number(tableType) });
      let tableData = [], KEY = [], VALUE = [];
      if (game_id === 'CSGO' && tableType === 4) {
        //获取 KEY;
        for (let i in data[0]) {
          KEY.push(i)
        }
        //获取VALUE
        data.forEach(item => {
          let value_item = [];
          for (let i in item) {
            value_item.push(item[i].value)
          }
          VALUE.push(value_item)
        })
      } else {
        let { feild, item_value, position } = data;
        if (position) {
          feild.push('position');
          item_value.forEach((item, index) => {
            item.push(position[index])
          })
        }
        KEY = feild;
        VALUE = item_value;
      }
      VALUE.forEach(item => {
        let obj = {}
        item.forEach((_item, _index) => {
          obj[KEY[_index]] = _item
        })
        tableData.push(obj)
      })
      tableData.map(item => {
        for (let i in item) {
          if (!isNaN(parseFloat(item[i]))) {
            item[i] = parseFloat(item[i])
          }
        }
      })
      tableDataCache[cacheKey] = tableData;
      return tableData
    } else {
      return tableDataCache[cacheKey]
    }
    
  },
  //tab切换
  _tabChange({ dispatch }, tableType) {
    dispatch('_getTeamsTableList', tableType)
  }
}
export const mutations = {
  setList(state, data) {
    state.list = data.list
  },
  setTopDetail(state, data) {
    state.topDetail = data
  },
  setState(state, { game_id, tournament_id }) {
    state.game_id = game_id;
    state.tournament_id = tournament_id;
  },
  setCalendarState(state, status) {
    console.log('status', status)
    state.showCalendar = status;
    state.showInfo = false;
  },
  setInfoState(state, status) {
    state.showInfo = status
    state.showCalendar = false;
  },
  set_table_data(state, tableData) {
    state.tableData = tableData
  }
}

