/*
 * @Author: FeikeQ
 * @Date: 2020-12-24 13:35:31
 * @LastEditTime: 2021-01-15 13:48:06
 * @LastEditors: FeikeQ
 * @FilePath: /ti-pc/api/user.js
 * @Description: 用户中心
 */
import Axios from "@/plugins/request.js"


// 用户登录
export async function userLogin(params,handle) {
	try {
        let method = 'post';
        let obj ={
            url: `/UserCenter/IFLogin`,
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
};

// 退出登录通知后端垃圾回收
export async function logout(params){
    try {
        let method = 'GET';
        let obj ={
            url: `/UserCenter/IFLogout`,
            method
        };
        if(method.toLowerCase()=='get'){
            obj.params = params;
        }else{
            obj.data = params;
        }
        const result = await Axios.request(obj);
		return result;
	} catch (e) {
		throw e;
	}
}

// 发送短信验证码
export async function sendSMS(params,handle) {

    /*
    {
        "t":"11111111",
        "sign":"sdeweEFr@#$@",
        "type":"1",
        "mobile":"17308408180"
    }
    
    type 获取短信的 操作类型
    ------------------------
    1 手机短信登录 验证码
    2 忘记密码 验证码
    3 修改密码 验证码
    4 修改手机号 旧手机好验证码
    5 修改手机号 新手机号验证码
    6 绑定手机
    7 注销账号 
    */
	try {
        let method = 'post';
        let obj ={
            url: `/IFAppSMSGetCode`,
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
};

// 校验短信验证码
export async function checkSMS(params,handle) {

    /*
    {
        "t":"11111111",
        "sign":"sdeweEFr@#$@",
        "type":"2",
        "stk":"token", // typ1登录不用带其它都要带
        "code":"xxxx", //验证码
        "mobile":"17308408180" //type 2,5 使用
    }
    
    type 操作类型
    ------------------------
    1 手机短信登录 验证码
    2 忘记密码 验证码
    3 修改密码 验证码
    4 修改手机号 旧手机好验证码
    5 修改手机号 新手机号验证码
    6 绑定手机
    7 注销账号 
    */
	try {
        let method = 'POST';
        let obj ={
            url: `/IFAppSMSCheckCode`,
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
};



// 修改用户信息
export async function modifyUserInfo(params,handle) {
	try {
        let method = 'POST';
        let obj ={
            url: `/UserCenter/IFAppModifyUserInfo`,
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
};

// 获取用户信息
export async function getUserInfo(params,handle) {
	try {
        let method = 'POST';
        let obj ={
            url: `/UserCenter/IFAppGetUserInfo`,
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
};


// 注销帐号
export async function destroyUser(params,handle) {
	try {
        let method = 'POST';
        let obj ={
            url: `/UserCenter/IFBanAcc`,
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
};



// 修改用户密码
export async function modifyPass(params,handle) {
	try {
        let method = 'POST';
        let obj ={
            url: `/UserCenter/IFAppUserCenterModifyPass`,
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
};



// 忘记用户密码
export async function forgetPass(params,handle) {
	try {
        let method = 'POST';
        let obj ={
            url: `/UserCenter/IFAppUserCenterForgetPass`,
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
};


// 修改手机号码
export async function modifyPhone(params,handle) {
	try {
        let method = 'POST';
        let obj ={
            url: `/UserCenter/IFAppUserCenterModifyPhone`,
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
};


// 用户关注 - 添加/删除
export async function setFocus(params,handle) {
	try {
        let method = 'POST';
        let obj ={
            url: `/UserCenter/IFAppUserCenterSetFocus`,
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
};




// 获取用户关注 
export async function getFocus(params,handle) {
	try {
        let method = 'POST';
        let obj ={
            url: `/UserCenter/IFAppUserCenterGetFocus`,
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
};





