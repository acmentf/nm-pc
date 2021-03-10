/*
 * @Author: FeikeQ
 * @Date: 2020-12-19 16:43:44
 * @LastEditTime: 2021-01-22 14:34:45
 * @LastEditors: FeikeQ
 * @FilePath: /ti-pc/store/home.js
 * @Description: 
 */
export const state = () => ({
    scrollTop:0, // 滚动条位置
    list: [],
    publicData: {
        bottomBarURL: null, //0 公共底部栏url
        inviteFriendsURL: null, //1 邀请好友图url
        termsOfServiceURL: null, //2 服务条款url
        aboutData: null, //3 关于我们 data
        privacyPolicyURL: null, //4 隐私政策url
        termsOfServiceData:null, //5 服务条款 data
        privacyPolicyData: null, //6 隐私政策 data
        codeUrl: null, //7 二维码内置链接
        privacyAgreementCut: null //隐私协议精简版
    }
})
  
export const mutations = {
    scrollValue(state, newValue) {
        // console.log('-----scrollValue---');
        state.scrollTop = newValue;
    },
    publicData(state, newValue) {
        // console.log('-----publicData---');
        for (const key in newValue) {
            if (newValue[key]) state.publicData[key] = newValue[key];
        }
    }
    
}