/*
 * @Author: FeikeQ
 * @Date: 2020-12-19 16:43:44
 * @LastEditTime: 2020-12-24 15:08:45
 * @LastEditors: FeikeQ
 * @FilePath: /ti-pc/plugins/element-ui.js
 * @Description: 
 */
import Vue from 'vue'
import Element from 'element-ui'
import utils from '~/plugins/utils'
Vue.use(Element)

export default function ({ app: { $request } }, inject) {
    inject('utils', utils)
}