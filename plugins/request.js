/*
 * @Author: FeikeQ
 * @Date: 2020-12-16 11:27:27
 * @LastEditTime: 2021-02-05 11:41:28
 * @LastEditors: FeikeQ
 * @FilePath: /ti-pc/plugins/request.js
 * @Description: 
 */
/**
 * 基于axios 封装的请求模块
 */
import axios from 'axios'
// import baseURL from './env'
import $utils from './utils'

const Axios = axios.create({
  baseURL:process.env.BASE_URL,
//   baseURL,
  timeout: 10000
});

// 拦截注入token并支持post和get两种参数 byFeikeQ
Axios.interceptors.request.use(config => {
    var cookie = $utils.getCookieArray();
    var inster = {
        t: new Date().getTime()+'',
        sign: "sdeweEFr@#$@",
      };
    if(cookie && cookie.token) inster.stk = cookie.token;
    if(config.data){
        config.data = Object.assign({}, inster, config.data)
    }else{
        config.params =  Object.assign({}, inster, config.params)
    }
  return config
});
//  响应拦截处理 
Axios.interceptors.response.use(res => {
  if(res.data.code === '0') {
    return Promise.resolve(res.data.data)
  } else {
     return Promise.reject(res.data)
    //return Promise.resolve(res.data.data) // 不能因为没有数据抛出错误 By FeikeQ 
  }
}, err => {
  
})


export default Axios
