<!--
 * @Author: FeikeQ
 * @Date: 2020-12-21 16:22:02
 * @LastEditTime: 2021-02-25 15:27:04
 * @LastEditors: FeikeQ
 * @FilePath: /nami-pc/components/common/appLogin/index.vue
 * @Description: 
-->
<template>
    <div class="login-form">
        <el-dialog
            :visible="true"
            custom-class="user-lgoin"
            :lock-scroll="false"
            :append-to-body="true"
            :show-close="false"
            :close-on-click-modal="false"
        >
            <div v-if="!forget.status" class="login_box">
                <div class="forms">
                    <el-tabs v-model="activeName" @tab-click="checkStatus">
                        <el-tab-pane label="手机验证登录" name="sms">
                            <span slot="label"
                                ><a href="javascript:;">
                                    <!-- <i class="el-icon-office-building"></i> -->
                                    手机验证登录</a
                                ></span
                            >
                            <div>
                                <div class="input">
                                    <div class="icon">
                                        <img src="/images/sms.png" />
                                    </div>
                                    <div class="text">
                                        <input
                                        type="number" :name="'phone'+Date.now()"
                                            v-model="smsUser"
                                            placeholder="请输入手机号码"
                                            @input="checkStatus"
                                        />
                                        <div class="assist">
                                            <img
                                                v-if="smsUser.length"
                                                @click="smsUser = ''"
                                                class="clear"
                                                src="/images/close.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="err">
                                    <div class="icon"></div>
                                    <div class="text" v-if="smsUserErr">
                                        <i class="el-icon-warning-outline"></i>
                                        {{ smsUserErr }}
                                    </div>
                                </div>
                                <div class="input">
                                    <div class="icon">
                                        <img src="/images/msg.png" />
                                    </div>
                                    <div class="text">
                                        <input
                                        type="number" :name="'sms'+Date.now()"
                                            v-model="smsCheck"
                                            placeholder="请输入短信验证码"
                                            @input="checkStatus"
                                            @keyup.enter="login"
                                        />
                                        <div class="assist">
                                            <img
                                                v-if="smsCheck.length"
                                                @click="smsCheck = ''"
                                                class="clear"
                                                src="/images/close.png"
                                            />
                                        </div>
                                    </div>
                                    <div class="act">
                                        <span :class="smsSleep?'':'active'" @click="sendSms">{{
                                            smsSleep
                                                ? smsSleep + smsSleepTxt
                                                : smsTip
                                        }}</span>
                                    </div>
                                </div>
                                <div class="err">
                                    <div class="icon"></div>
                                    <div class="text" v-if="smsCheckErr">
                                        <i class="el-icon-warning-outline"></i>
                                        {{ smsCheckErr }}
                                    </div>
                                </div>
                                <div style="padding:10px 0;">
                                    <p>
                                        <input
                                            v-model="treaty"
                                            type="checkbox"
                                            class="checkbox"
                                            @change="checkStatus"
                                            id="check_treaty"
                                            @keyup.enter="login"
                                        />
                                        <label for="check_treaty"
                                            >已阅读并同意</label
                                        ><a
                                            href="javascript:;"
                                            @click="
                                                toggleTreaty(
                                                    1,
                                                    'termsOfServiceData'
                                                )
                                            "
                                            >《服务协议》</a
                                        >和<a
                                            href="javascript:;"
                                            @click="
                                                toggleTreaty(
                                                    1,
                                                    'privacyPolicyData'
                                                )
                                            "
                                            >《隐私政策》</a
                                        >
                                    </p>
                                </div>
                            </div>
                        </el-tab-pane>

                        <el-tab-pane label="账号密码登录" name="pwd">
                            <span slot="label"
                                ><a href="javascript:;">
                                    <!-- <i class="el-icon-chat-dot-square"></i> -->
                                    账号密码登录</a
                                ></span
                            >
                            <div>
                                <div class="input">
                                    <div class="icon">
                                        <img src="/images/sms.png" />
                                    </div>
                                    <div class="text">
                                        <input
                                        type="number" :name="'user'+Date.now()"
                                            v-model="pwdUser"
                                            placeholder="请输入账号"
                                            @input="checkStatus"
                                        />
                                        <div class="assist">
                                            <img
                                                v-if="pwdUser.length"
                                                @click="pwdUser = ''"
                                                class="clear"
                                                src="/images/close.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="err">
                                    <div class="icon"></div>
                                    <div class="text" v-if="pwdUserErr">
                                        <i class="el-icon-warning-outline"></i>
                                        {{ pwdUserErr }}
                                    </div>
                                </div>
                                <div class="input">
                                    <div class="icon">
                                        <img src="/images/pwd.png" />
                                    </div>
                                    <div class="text">
                                        <input
                                        :name="'pwd'+Date.now()"
                                            v-model="pwdCheck"
                                            placeholder="请输入密码"
                                            :type="
                                                pwdCheckDisplay
                                                    ? 'text'
                                                    : 'password'
                                            "
                                            @input="checkStatus"
                                            @keyup.enter="login"
                                        />
                                        <div class="assist">
                                            <img
                                                v-if="pwdCheckDisplay"
                                                @click="
                                                    pwdCheckDisplay = !pwdCheckDisplay
                                                "
                                                class="blindfold"
                                                src="/images/preview_close.png"
                                                title="显示"
                                            />
                                            <img
                                                v-else
                                                @click="
                                                    pwdCheckDisplay = !pwdCheckDisplay
                                                "
                                                class="blindfold"
                                                src="/images/preview_open.png"
                                                title="隐藏"
                                            />
                                            <img
                                                v-if="pwdCheck.length"
                                                @click="pwdCheck = ''"
                                                class="clear"
                                                src="/images/close.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="err">
                                    <div class="icon"></div>
                                    <div class="text" v-if="pwdCheckErr">
                                        <i class="el-icon-warning-outline"></i>
                                        {{ pwdCheckErr }}
                                    </div>
                                    <div
                                        class="forget"
                                        @click="forget.status = true"
                                    >
                                        忘记密码
                                    </div>
                                </div>

                                <div style="padding:10px 0;">
                                    <p>
                                        &nbsp;
                                    </p>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <button :class="checkAll ? 'active' : ''" @click="login">
                    {{activeName=='pwd'?'登录':'登录/注册'}}
                </button>
                <p>&nbsp;</p>
                <div class="close" @click="closeLogin">
                    <i class="el-icon-close"></i>
                </div>
            </div>

            <div v-if="forget.status" class="login_box">
                <div class="forms">
                    <el-tabs v-if="forget.step <2" v-model="forget.active">
                        <el-tab-pane label="找回密码 — 设置新密码" name="find">
                            <span slot="label"
                                ><a href="javascript:;">
                                    <!-- <i class="el-icon-office-building"></i> -->
                                    找回密码 — 设置新密码</a
                                ></span
                            >

                            <div v-if="forget.step ==1">
                                <div class="input">
                                    <div class="icon">
                                        <img src="/images/pwd.png" />
                                    </div>
                                    <div class="text">
                                        <input
                                            v-model="forget.pwd1"
                                            placeholder="请输入新密码"
                                            :type="
                                                forget.pwdDisplay
                                                    ? 'text'
                                                    : 'password'
                                            "
                                            @input="forget.pwd1_err = ''"
                                        />
                                        <div class="assist">
                                            <img
                                                v-if="forget.pwdDisplay"
                                                @click="
                                                    forget.pwdDisplay = !forget.pwdDisplay
                                                "
                                                class="blindfold"
                                                src="/images/preview_close.png"
                                                title="显示"
                                            />
                                            <img
                                                v-else
                                                @click="
                                                    forget.pwdDisplay = !forget.pwdDisplay
                                                "
                                                class="blindfold"
                                                src="/images/preview_open.png"
                                                title="隐藏"
                                            />
                                            <img
                                                v-if="forget.pwd1.length"
                                                @click="forget.pwd1 = ''"
                                                class="clear"
                                                src="/images/close.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="err">
                                    <div class="icon"></div>
                                    <div class="text" v-if="forget.pwd1_err">
                                        <i class="el-icon-warning-outline"></i>
                                        {{ forget.pwd1_err }}
                                    </div>
                                </div>
                                <div class="input">
                                    <div class="icon">
                                        <img src="/images/pwd.png" />
                                    </div>
                                    <div class="text">
                                        <input
                                            v-model="forget.pwd2"
                                            placeholder="请重复输入密码"
                                            :type="
                                                forget.pwdDisplay
                                                    ? 'text'
                                                    : 'password'
                                            "
                                            @input="forget.pwd2_err = ''"
                                        />
                                        <div class="assist">
                                            <img
                                                v-if="forget.pwdDisplay"
                                                @click="
                                                    forget.pwdDisplay = !forget.pwdDisplay
                                                "
                                                class="blindfold"
                                                src="/images/preview_close.png"
                                                title="显示"
                                            />
                                            <img
                                                v-else
                                                @click="
                                                    forget.pwdDisplay = !forget.pwdDisplay
                                                "
                                                class="blindfold"
                                                src="/images/preview_open.png"
                                                title="隐藏"
                                            />
                                            <img
                                                v-if="forget.pwd2.length"
                                                @click="forget.pwd2 = ''"
                                                class="clear"
                                                src="/images/close.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="err">
                                    <div class="icon"></div>
                                    <div class="text" v-if="forget.pwd2_err">
                                        <i class="el-icon-warning-outline"></i>
                                        {{ forget.pwd2_err }}
                                    </div>
                                </div>
                                <div style="padding:10px 0;">
                                    <p>
                                        &nbsp;
                                    </p>
                                </div>
                            </div>

                            <div v-if="forget.step ==0">
                                <div class="input">
                                    <div class="icon">
                                        <img src="/images/sms.png" />
                                    </div>
                                    <div class="text">
                                        <input
                                        type="number" :name="'fphone'+Date.now()"
                                            v-model="forget.user"
                                            placeholder="请输入手机号码"
                                            @input="forget.user_err = ''"
                                        />
                                        <div class="assist">
                                            <img
                                                v-if="forget.user.length"
                                                @click="forget.user = ''"
                                                class="clear"
                                                src="/images/close.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="err">
                                    <div class="icon"></div>
                                    <div class="text" v-if="forget.user_err">
                                        <i class="el-icon-warning-outline"></i>
                                        {{ forget.user_err }}
                                    </div>
                                </div>
                                <div class="input">
                                    <div class="icon">
                                        <img src="/images/msg.png" />
                                    </div>
                                    <div class="text">
                                        <input
                                        type="number" :name="'fsms'+Date.now()"
                                            v-model="forget.sms"
                                            placeholder="请输入短信验证码"
                                            @input="forget.sms_err = ''"
                                        />
                                        <div class="assist">
                                            <img
                                                v-if="forget.sms.length"
                                                @click="forget.sms = ''"
                                                class="clear"
                                                src="/images/close.png"
                                            />
                                        </div>
                                    </div>
                                    <div class="act">
                                        <span :class="forget.smsSleep?'':'active'" @click="forgetSms">{{
                                            forget.smsSleep
                                                ? forget.smsSleep +
                                                  forget.smsSleepTxt
                                                : forget.smsTip
                                        }}</span>
                                    </div>
                                </div>
                                <div class="err">
                                    <div class="icon"></div>
                                    <div class="text" v-if="forget.sms_err">
                                        <i class="el-icon-warning-outline"></i>
                                        {{ forget.sms_err }}
                                    </div>
                                </div>
                                <div style="padding:10px 0;">
                                    <p>
                                        &nbsp;
                                    </p>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                    
                    <div v-if="forget.step ==2">
                        <div style="text-align: center; height:234px;" >
                            <img style="width:110px; margin-top:50px;" src="/images/ok.png" />
                        </div>
                        
                    </div>
                </div>
                <button
                    :class="checkForget ? 'active' : ''"
                    @click="forgetSubmit"
                >
                    {{ ["下一步","确定","去登录"][forget.step]}}
                </button>
                <p></p>
                <div class="close" @click="clearForm">
                    <i class="el-icon-close"></i>
                </div>
            </div>
        </el-dialog>

        <el-dialog
            :visible.sync="treatyShow"
            custom-class="info_box"
            :lock-scroll="false"
            :append-to-body="true"
            :show-close="true"
            :close-on-click-modal="true"
        >
            <div class="login_treaty_box">
                <!-- <h4>{{ $store.state.user.publicData.aboutData }}</h4>
                <pre class="pre">{{ $store.state.user.publicData[treatyType] }}</pre> -->
                <div class="pre" v-html="$store.state.home.publicData[treatyType]">
                    {{ $store.state.home.publicData[treatyType] }}
                </div>
                
            </div>
        </el-dialog>
    </div>
</template>

<script>
import * as api from "@/api/user";
import * as homeApi from "@/api/home";
export default {
    props: ["value"],
    data() {
        return {
            expireday: 7, // 失效时间
            smsTimer: 60, //验证码倒计时时间?s

            boxShow: true,
            treaty: false,
            treatyShow: false,
            treatyType: "termsOfServiceData",
            activeName: "sms",

            pwdUser: "",
            pwdUserErr: "",
            pwdCheck: "",
            pwdCheckErr: "",
            pwdCheckDisplay: false,
            smsUser: "",
            smsUserErr: "",
            smsCheck: "",
            smsCheckErr: "",
            smsTip: "发送验证码",
            smsSleep: 0,
            smsSleepTxt: "秒后再次发送",

            checkAll: false,
            TIMER: null,

            // 忘记密码找回操作数据
            forget: {
                status: false,
                step: 0,
                active: "find",
                user: "",
                user_err: "",
                sms: "",
                sms_err: "",
                smsTip: "发送验证码",
                smsSleep: 0,
                smsSleepTxt: "秒后再次发送",
                pwd1: "",
                pwd1_err: "",
                pwd2: "",
                pwd2_err: "",
                pwdDisplay: false
            }
        };
    },
    computed: {
        checkForget() {
            // console.log('checkForget',this.forget);
            if (this.forget.step ==1) {
                if (!this.forget.pwd1.length) return false;
                if (!this.forget.pwd2.length) return false;
            }else if(this.forget.step ==0){
                if (!this.forget.user.length) return false;
                if (!this.forget.sms.length) return false;
            }else{

            }
            return true;
        }
    },
    methods: {
      getPublicInfo() {
            var infoMap = [
                "bottomBarURL", //0 公共底部栏url
                "inviteFriendsURL", //1 邀请好友图url
                "termsOfServiceURL", //2 服务条款url
                "aboutData", //3 关于我们 data
                "privacyPolicyURL", //4 隐私政策url
                "termsOfServiceData", //5 服务条款 data
                "privacyPolicyData", //6 隐私政策 data
                "codeUrl", //7 二维码内置链接
                "privacyAgreementCut" //8隐私协议精简版
            ];

            // 获取公共信息
            homeApi.getPublicData(
                {
                    type: "1,2,3,4,5,6,7,8"
                },
                data => {
                    // console.log("获取公共信息:", data);
                    var _data = {};

                    if (data) {
                        for (const key in data) {
                            if (Object.hasOwnProperty.call(data, key)) {
                                _data[infoMap[key]] = data[key];
                            }
                        }
                    }
                    // 保存到 store
                    this.$store.commit("home/publicData", _data);
                }
            ).catch(err => {
                console.log(err);
                // this.$message({
                //     showClose: true,
                //     type: 'error',
                //     message: err
                // });
                return;
            });
        },
        isMobile(txt) {
            let reg = /^(\+\d{2,3}\-)?\d{11}$/;
            if (!reg.test(txt)) {
                return false;
            } else {
                return true;
            }
        },
        closeLogin() {
            // console.log("close", this.value);
            this.$emit("input", false);
        },
        clearForm() {
            this.pwdUser = "";
            this.pwdUserErr = "";
            this.pwdCheck = "";
            this.pwdCheckErr = "";
            this.smsUser = "";
            this.smsUserErr = "";
            this.smsCheck = "";
            this.smsCheckErr = "";
            this.smsTip = "发送验证码";
            this.smsSleep = 0;
            this.checkAll = false;
            this.pwdCheckDisplay = false;
            this.forget.status= false;
            this.forget.step = 0;
            this.forget.user ="";
            this.forget.user_err="";
            this.forget.sms ="";
            this.forget.sms_err="";
            this.forget.smsTip= "发送验证码";
            this.forget.smsSleep =0;
            this.forget.pwd1="";
            this.forget.pwd1_err="";
            this.forget.pwd2="";
            this.forget.pwd2_err="";
            this.forget.pwdDisplay=false;

            clearInterval(this.TIMER);
            clearInterval(this.forget.TIMER);
        },
        saveUserData(data) {
            console.log("---------- 登录成功 ----------");
            for (const key in data) {
                this.$utils.appCookie(key, data[key], this.expireday, "/");
            }
            this.$store.commit("user/changeToken", data);
            this.$message({
                type: "success",
                message: `欢迎${data.nick_name}回来!`
            });
            this.$router.push({query:{game: this.$store.state.common.game_id}});
            setTimeout(() => {
                this.$router.go(0);
            }, 500);
        },
        async login() {
            var _this = this;
            if (!this.checkAll) return;
            var _user = this[this.activeName + "User"];
            var _check = this[this.activeName + "Check"];

            /*
            {
                "code": "",
                "message": "",
                "data": {
                    "token": "",
                    "user_id": "",
                    "nick_name": "",
                    "mobile": "",
                    "flag": 1,
                    "avatar_id": 1,
                    "avatar_url": "",
                    "avatar_name": ""
                }
            }
            */
            const data = await api
                .userLogin({
                    // 登录类型 : 0 闪验 , 1 手机登录 ,2 帐号登录
                    type: { pwd: 2, sms: 1 }[this.activeName] || 0,
                    qstr: _user, // 账号、手机号
                    tstr: _check // 密码、短信验证码
                    // code:""  // 特殊验证串(如闪验的)
                })
                .catch(err => {
                    var _msg = err.message;
                    this[this.activeName + "CheckErr"] = _msg;
                    this.$message({
                        showClose: true,
                        type: "error",
                        message: _msg
                    });
                    return;
                });

            if (data) this.saveUserData(data);
        },
        checkStatus() {
            // console.log('---------------',this.checkAll);
            var _user = this[this.activeName + "User"];
            // console.log(this.activeName + 'User',_user);
            var _check = this[this.activeName + "Check"];
            // console.log(this.activeName + 'Check',_check);
            // console.log('treaty',this.treaty);
            
            if(this.activeName  == "pwd"){
                this.checkAll = _user.length && _check.length ;
            }else{
                this.checkAll = _user.length && _check.length && this.treaty;
            }
            this[this.activeName + "UserErr"] = "";
            this[this.activeName + "CheckErr"] = "";
        },
        toggleTreaty(status, type) {
            this.treatyShow = !!status;
            this.treatyType = type;
        },
        sendSms() {
            if (this.smsSleep) return;

            var _user = this[this.activeName + "User"];
            if (!_user.length) {
                this.smsUserErr = "手机号码不能为空!";
                this.$message({
                    showClose: true,
                    type: "error",
                    message: this.smsUserErr
                });
                return;
            }

            if (!this.isMobile(_user)) {
                this.smsUserErr = "请填写正确的手机号码!";
                this.$message({
                    showClose: true,
                    type: "error",
                    message: this.smsUserErr
                });
                return;
            }

            // 发送验证码
            api.sendSMS(
                {
                    type: "1",
                    mobile: _user
                },
                data => {
                    // console.log("发送验证码:", data);
                    // alert(data.result || data);
                }
            ).catch(err => {
                this.smsCheckErr = err.message;
                this.$message({
                    showClose: true,
                    type: "error",
                    message: this.smsCheckErr
                });
                return;
            });
            this.smsSleep = this.smsTimer;
            this.TIMER = setInterval(() => {
                this.smsSleep--;
                if (this.smsSleep < 1) {
                    clearInterval(this.TIMER);
                    this.smsSleep = 0;
                }
            }, 1000);
            this.$message({
                showClose: true,
                type: "success", //type: 'error',
                message: "短信已发送请注意查收!"
            });
        },

        forgetSms() {
            if (this.forget.smsSleep) return;

            var _user = this.forget.user;
            if (!_user.length) {
                this.forget.user_err = "手机号码不能为空!";
                this.$message({
                    showClose: true,
                    type: "error",
                    message: this.forget.user_err
                });
                return;
            }

            if (!this.isMobile(_user)) {
                this.forget.user_err = "请填写正确的手机号码!";
                this.$message({
                    showClose: true,
                    type: "error",
                    message: this.forget.user_err
                });
                return;
            }

            // 发送验证码
            api.sendSMS(
                {
                    type: "2",
                    mobile: _user
                },
                data => {
                    // console.log("发送验证码:", data);
                    // alert(data.result || data);
                }
            ).catch(err => {
                this.forget.user_err = err.message;
                this.$message({
                    showClose: true,
                    type: "error",
                    message: this.forget.user_err
                });
                return;
            });

            this.forget.smsSleep = this.smsTimer;
            this.forget.TIMER = setInterval(() => {
                this.forget.smsSleep--;
                if (this.forget.smsSleep < 1) {
                    clearInterval(this.forget.TIMER);
                    this.forget.smsSleep = 0;
                }
            }, 1000);
            this.$message({
                showClose: true,
                type: "success", //type: 'error',
                message: "短信已发送请注意查收!"
            });
        },
        forgetSubmit() {
            if (!this.checkForget) return;
            // console.log("== forgetSubmit ==");
            if (this.forget.step ==1) {
                if (this.forget.pwd1 != this.forget.pwd2) {
                    this.forget.pwd2_err = "两次密码输入不一致";
                    this.$message({
                        showClose: true,
                        type: "error",
                        message: this.forget.pwd2_err
                    });
                    return;
                }

                // 保存新设置的密码操作
                api.forgetPass(
                    {
                        pass: this.forget.pwd2,
                        code: this.forget.sms,
                        mobile: this.forget.user
                    },
                    data => {
                        console.log("保存新设置的密码操作:", data);
                        if (data.user_id && data.token) {
                            //直接登录
                            // this.saveUserData(data);
                        } 
                        this.forget.step = 2;
                        this.$message({
                            type: "success",
                            message: `重置密码成功请您重新登录帐号!`
                        });
                    }
                ).catch(err => {
                    this.forget.sms_err = err.message;
                    this.$message({
                        showClose: true,
                        type: "error",
                        message: this.forget.sms_err
                    });
                    return;
                });
            } else if(this.forget.step ==0) {
                if (!this.isMobile(this.forget.user)) {
                    this.forget.user_err = "请填写正确的手机号码!";
                    this.$message({
                        showClose: true,
                        type: "error",
                        message: this.forget.user_err
                    });
                    return;
                }

                //校验短信验证码
                api.checkSMS(
                    {
                        type: "2",
                        code: this.forget.sms,
                        mobile: this.forget.user
                    },
                    data => {
                        /*
                    {
                        "code": "0",
                        "message": "请求操作成功！",
                        "data": "有效验证码！"
                    }
                    */
                        //    console.log("校验短信验证码:",data);alert(data.result ||data);
                        this.forget.step = 1;
                    }
                ).catch(err => {
                    this.forget.sms_err =  err.message;
                    this.$message({
                        showClose: true,
                        type: "error",
                        message: this.forget.sms_err
                    });
                    return;
                });
            }else{
                console.log("大v.........确定");
                this.clearForm();
            }
        }
    },
    created() {
      this.getPublicInfo();
    }
};
</script>

<style lang="less">

.info_box {
    width: 1200px;
    margin: 0 auto;
    height: 80vh;
    background: #fff;
    border: 2px solid #5D2BCF;
    border-radius: 8px;
    color: #333;
    font-size: 18px;
    font-weight: bold;
    line-height: 24px;
    z-index: 999;
    &:focus {
        outline: none;
    }
    .el-dialog__body {
        padding: 0;
    }

    .login_treaty_box {
        padding: 0 60px 20px 60px;
        position: relative;
        z-index: 999;
        color: #fff;
        h4 {
            text-align: center;
            line-height: 30px;
            padding-bottom: 20px;
        }
        .pre {
            color: #fff;
            width: 100%;
            height: calc(80vh - 140px);
            overflow-y: overlay;
            overflow-x: hidden;
            margin: 10px 0;
            a{
                color: #1c71da;
            }
        }
    }
}
.user-lgoin {
    background: #fff;
    border: 2px solid #5D2BCF;
    // box-shadow: 2px 4px 6px rgba(36, 41, 174, 0.76);
    border-radius: 8px;
    padding: 24px;
    color: #bbb;
    width: 432px;
    height: 330px;
    .el-dialog__title {
        font-size: 18px;
        font-weight: bold;
        color: #fc5353;
    }
    .el-dialog__header {
        padding: 0;
    }
    .el-dialog__headerbtn {
        top: 10px;
        right: 10px;
    }
    .el-dialog__headerbtn .el-dialog__close {
        color: #9ca1af;
        // background: #38435f;
        border-radius: 50%;
        padding: 2px;
    }
    .el-dialog__body {
        padding: 0;
        color: #666;
        font-size: 14px;
        .txt {
            p {
                margin: 12px 0;
            }
        }
    }
    .el-dialog__footer {
        text-align: left;
        padding: 0 20px 20px;
        .err {
            i {
                font-size: 16px;
            }
            color: #fc5353;
            height: 32px;
            font-size: 12px;
            line-height: 32px;
            text-align: left;
        }
    }
}

.login_box {
    // background: red;
    position: relative;
    // margin-top: -10px;

    .close {
        position: absolute;
        right: -10px;
        top: -10px;
        cursor: pointer;
        z-index: 99;
        &:hover {
            color: #6521D7;
        }
    }

    .checkbox {
        width: 12px;
        height: 12px;
    }
    .checkbox:checked {
        background: #5D2BCF;
    }
    .checkbox {
        background-color: transparent;
        border: 1px solid #5D2BCF;
        -webkit-border-radius: 50%;
        border-radius: 50%;
        font-size: 12px;
        margin: 2px;
        padding: 0;
        position: relative;
        display: inline-block;
        vertical-align: top;
        cursor: default;
        -webkit-appearance: none;
        -webkit-user-select: none;
        user-select: none;
        -webkit-transition: background-color ease 0.1s;
        transition: background-color ease 0.1s;
    }
    .checkbox:checked::after {
        content: "";
        top: 2px;
        left: 1px;
        position: absolute;
        background: transparent;
        border: #fff solid 2px;
        border-top: none;
        border-right: none;
        height: 5px;
        width: 8px;
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }

    .forms {
        .input {
            display: flex;
            margin-top: 10px;
            height: 26px;
            align-items: baseline;
        }
        .err {
            height: 26px;
            overflow: hidden;
            font-size: 12px;
            line-height: 26px;
            color: #fc5353;
            display: flex;
            position: relative;
            i {
                font-size: 15px;
                vertical-align: middle;
                margin-top: -2px;
            }
            .forget {
                position: absolute;
                right: 0;
                top: 0;
                font-size: 12px;
                line-height: 26px;
                color: #6521D7;
                cursor: pointer;
            }
        }
        .icon {
            width: 40px;
            margin-top: 2px;
            img {
                width: 24px;
                height: 24px;
            }
        }
        .text {
            flex: 1;
            position: relative;
            input {
                width: 100%;
                height: 25px;
                font-size: 14px;
                line-height: 25px;
                background: transparent;
                border-bottom: 1px solid #666;
                color: #333;
                padding-right: 50px;
            }
            .assist {
                position: absolute;
                top: 0;
                right: 0;
                text-align: right;
                z-index: 99;
                .blindfold {
                    width: 24px;
                    height: 24px;
                    cursor: pointer;
                    float: right;
                    margin-top: -1px;
                }
                .clear {
                    width: 24px;
                    height: 24px;
                    cursor: pointer;
                    float: right;
                    margin-top: -1px;
                }
            }
        }
        .act {
            padding: 0 0 0 10px;
            margin-top: -10px;
            span {
                display: block;
                text-align: center;
                font-size: 12px;
                font-weight: bold;
                color: #666;
                width: 108px;
                height: 28px;
                line-height: 28px;
                background: #ccc;
                border-radius: 4px;
                &.active{
                  color: #fff;
                    cursor: pointer;
                    background: linear-gradient(93deg, #6521D7 0%, #BF49EB 100%);
                }
            }
        }

        h3 {
            font-size: 40px;
            font-weight: bold;
            line-height: 47px;
            color: #fff;
            text-shadow: 0px 3px 6px rgba(66, 160, 240, 0.16);
        }

        .el-tabs__nav-wrap:after {
            background-color: transparent;
        }
        .el-tabs__nav .el-tabs__item a {
            font-size: 16px;
            line-height: 21px;
            color: #666;
        }
        .el-tabs__item.is-active a,
        .el-tabs__nav .el-tabs__item a:hover {
            color: #333;
        }
        .el-tabs__item.is-active a {
            font-weight: bold;
        }
        .el-tabs__active-bar {
            height: 4px;
            background: linear-gradient(180deg, #6521D7 0%, #BF49EB 100%);
            // box-shadow: 0px 1px 6px rgba(42, 47, 247, 0.3);
            border-radius: 20px;
        }
    }
    button {
        font-size: 16px;
        font-weight: bold;
        color: #666;
        width: 100%;
        // height: 47px;
        // line-height: 47px;
        height: 36px;
        line-height: 36px;
        background: #ccc;
        border-radius: 24px;
    }
    button.active {
      color: #fff;
        cursor: pointer;
        background: linear-gradient(136deg, #6521D7 0%, #BF49EB 100%);
        // box-shadow: 0px 3px 6px #2b2bf9;
    }
    p {
        text-align: center;
        height: 16px;
        font-size: 12px;
        line-height: 16px;
        color: #aaa;
        margin: 10px;
        a {
            color: #1c71da;
        }
    }
}

.login_treaty {
    width: 100%;
    position: ;
    margin: 0;
    height: 80vh;
    background: #0a1331;
    border: 1px solid #1c71da;
    border-radius: 8px;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    line-height: 24px;
    z-index: 999;
    &:focus {
        outline: none;
    }
}

input[type=number] {

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    -moz-appearance: textfield;
}
</style>
