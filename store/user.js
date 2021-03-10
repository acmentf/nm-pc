/*
 * @Author: FeikeQ
 * @Date: 2020-12-31 10:08:10
 * @LastEditTime: 2021-01-15 13:44:02
 * @LastEditors: FeikeQ
 * @FilePath: /ti-pc/store/user.js
 * @Description:
 */

export const state = () => ({
    from: "客户端",
    token: "",
    avatar_name: "",
    avatar_id: "",
    mobile: "",
    user_id: "",
    avatar_url: "",
    flag: "",
    nick_name: "",
});

export const mutations = {
    changeToken(state, newValue) {
        // console.log('-----changeToken---');
        for (const key in newValue) {
            state[key] = newValue[key];
        }
    }
};

export const actions = {
    nuxtServerInit({ dispatch, commit }, { app, req, res }) {
        let cookie = req.headers.cookie;
        let from = "客户端";

        if (process.server) {
            from = "服务端";
            cookie = app.$utils.getCookieArray(cookie); //获取cookie串并转为对象
        } else {
            cookie = app.$utils.getCookieArray();
        }
        console.log("--- user_Store ---", from);
        commit("changeToken", cookie);
    }
};
