/*
 * @Author: FeikeQ
 * @Date: 2020-12-21 11:09:28
 * @LastEditTime: 2021-01-29 15:53:10
 * @LastEditors: FeikeQ
 * @FilePath: /ti-pc/plugins/env.js
 * @Description: 
 */
/**
 * 配置开发环境和线上环境之间的切换
 * baseUrl: 域名地址
 */

let baseUrl = ''
if (process.env.NODE_ENV === 'development') {
   //baseUrl = 'http://192.168.1.17:8080';//开发环境UIL
  baseUrl = "https://ti-api.inkr.xyz/"
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://api.t1play.com/';//生产环境UIL
} else {
  baseUrl = "https://ti-api.inkr.xyz/";//预发布环境
}
export default baseUrl 

