/*
 * @Author: FeikeQ
 * @Date: 2020-12-19 16:43:44
 * @LastEditTime: 2021-01-25 11:26:02
 * @LastEditors: FeikeQ
 * @FilePath: /ti-pc/store/common.js
 * @Description: 
 */
import * as api from '@/api/home'
import utils from "../plugins/utils"
export const state = () => ({
  game_id: 'all',
  includeCacheArr:['scheduleIndex'],//需要被缓存的界面 name 
  scheduleDateList:[],
  DATE: utils.formatime(new Date().getTime(),'yyyy-MM-dd'),
  isBreadcrumbShow: true 
})

export const mutations = {
  setGameId: (state, game_id) => {
    state.game_id = game_id
  },
  setTime(state, {Schedule}){
    Schedule.push({})
    state.scheduleDateList = Schedule;
    state.DATE = Schedule[0].ymd_str;
  },
  setDate(state,DATE){
    state.DATE = DATE;
  },
  setBreadcrumbState(state, status){
    state.isBreadcrumbShow = status
  }
}
export const getters = {
  getGameId: (state) => state.game_id
}

export const actions = {
  async _getSystemTime({ commit},playload) {
    let data = await api.getSystemTime(playload);
    commit('setTime',data.info)
  },
  async _setDate({ commit},DATE) {
    commit('setDate',DATE)
  },
  dispatchBreadcrumbState({commit}, status){
    
    commit('setBreadcrumbState',status)
  }
}