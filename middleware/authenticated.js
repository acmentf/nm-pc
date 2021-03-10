/*
 * @Author: FeikeQ
 * @Date: 2020-12-19 16:43:44
 * @LastEditTime: 2020-12-30 17:26:44
 * @LastEditors: FeikeQ
 * @FilePath: /ti-pc/middleware/authenticated.js
 * @Description: 
 */
export default function ({ app,route,req,res,store, redirect }) {
    var cookie;
    if (process.server) {
        cookie = app.$utils.getCookieArray(req.headers.cookie); //获取cookie串并转为对象
    }else{
        cookie = app.$utils.getCookieArray();
    }
    // console.log("middleware ---- cookie",cookie)


    // 判断用户是否登录
    // if (!store.state.authenticated) {
    //   return redirect('/login')
    // }
    if (!cookie.token) {
        console.log("跳到首页")
        return redirect('/')
    }
}
 