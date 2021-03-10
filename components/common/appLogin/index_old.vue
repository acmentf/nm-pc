<!--
 * @Author: FeikeQ
 * @Date: 2020-12-21 16:22:02
 * @LastEditTime: 2021-01-12 14:21:15
 * @LastEditors: FeikeQ
 * @FilePath: /ti-pc/components/common/appLogin/index.vue
 * @Description: 
-->
<template>
    <div class="login-form">
        <div v-if="!forget.status" class="login_box">
            <div class="forms">
                <h3>{{title}}</h3>
                <div style="height:20px;"></div>
                <el-tabs v-model="activeName" @tab-click="checkStatus">
                    <el-tab-pane label="密码登录" name="pwd">
                        <span slot="label"
                            ><a href="javascript:;">
                                <!-- <i class="el-icon-chat-dot-square"></i> -->
                                密码登录</a
                            ></span
                        >
                        <div>
                            <div class="input">
                                <div class="icon">
                                    <img src="/images/sms.png" />
                                </div>
                                <div class="text">
                                    <input v-model="pwdUser" placeholder="请输入账号" @input="checkStatus" />
                                </div>
                            </div>
                            <div class="err">
                                <div class="icon"></div>
                                <div class="text" v-if="pwdUserErr">
                                    <i class="el-icon-warning-outline"></i>
                                    {{pwdUserErr}}
                                </div>
                            </div>
                            <div class="input">
                                <div class="icon">
                                    <img src="/images/pwd.png" />
                                </div>
                                <div class="text">
                                    <input v-model="pwdCheck" placeholder="请输入密码" type="password" @input="checkStatus" />
                                </div>
                            </div>
                            <div class="err">
                                <div class="icon"></div>
                                <div class="text" v-if="pwdCheckErr">
                                    <i class="el-icon-warning-outline"></i>
                                    {{pwdCheckErr}}
                                </div>
                                <div class="forget" @click="forget.status = true">忘记密码</div>
                            </div>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="短信登录" name="sms">
                        <span slot="label"
                            ><a href="javascript:;">
                                <!-- <i class="el-icon-office-building"></i> -->
                                短信登录</a
                            ></span
                        >
                        <div>
                            <div class="input">
                                <div class="icon">
                                    <img src="/images/sms.png" />
                                </div>
                                <div class="text">
                                    <input v-model="smsUser" placeholder="请输入手机号码" @input="checkStatus" />
                                </div>
                            </div>
                            <div class="err">
                                <div class="icon"></div>
                                <div class="text" v-if="smsUserErr">
                                    <i class="el-icon-warning-outline"></i>
                                    {{smsUserErr}}
                                </div>
                            </div>
                            <div class="input">
                                <div class="icon">
                                    <img src="/images/msg.png" />
                                </div>
                                <div class="text">
                                    <input v-model="smsCheck" placeholder="请输入短信验证码" @input="checkStatus" />
                                </div>
                                <div class="act">
                                    <span @click="sendSms">{{smsSleep?(smsSleep+smsSleepTxt):smsTip}}</span>
                                </div>
                            </div>
                            <div class="err">
                                <div class="icon"></div>
                                <div class="text" v-if="smsCheckErr">
                                    <i class="el-icon-warning-outline"></i>
                                    {{smsCheckErr}}
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <div style="padding:10px 0;">
                    <p>
                        <input v-model="treaty" type="checkbox" class="checkbox" @change="checkStatus" id="check_treaty">
                        <label for="check_treaty">已阅读并同意</label><a href="javascript:;" @click="toggleTreaty">《用户协议》</a>
                    </p>
                </div>
            </div>
            <button :class="checkAll?'active':''" @click="login">登录</button>
            <p>如未注册的话登陆同时将为您创建新账号</p>
        </div>

        <div v-if="forget.status" class="login_box">
            <div class="forms">
                <h3>{{title}}</h3>
                <div style="height:20px;"></div>
                <el-tabs v-model="forget.active" >
                   

                    <el-tab-pane label="找回密码" name="find">
                        <span slot="label"
                            ><a href="javascript:;">
                                <!-- <i class="el-icon-office-building"></i> -->
                                找回密码</a
                            ></span
                        >

                        <div v-if="forget.step">
                            <div class="input">
                                <div class="icon">
                                    <img src="/images/pwd.png" />
                                </div>
                                <div class="text">
                                    <input v-model="forget.pwd1" placeholder="请输入新密码" type="password" @input="forget.pwd1_err = ''" />
                                </div>
                            </div>
                            <div class="err">
                                <div class="icon"></div>
                                <div class="text" v-if="forget.pwd1_err">
                                    <i class="el-icon-warning-outline"></i>
                                    {{forget.pwd1_err}}
                                </div>
                            </div>
                            <div class="input">
                                <div class="icon">
                                    <img src="/images/pwd.png" />
                                </div>
                                <div class="text">
                                    <input v-model="forget.pwd2" placeholder="请重复输入密码" type="password" @input="forget.pwd2_err =''" />
                                </div>
                            </div>
                            <div class="err">
                                <div class="icon"></div>
                                <div class="text" v-if="forget.pwd2_err">
                                    <i class="el-icon-warning-outline"></i>
                                    {{forget.pwd2_err}}
                                </div>
                            </div>
                        </div>

                        <div v-else>
                            <div class="input">
                                <div class="icon">
                                    <img src="/images/sms.png" />
                                </div>
                                <div class="text">
                                    <input v-model="forget.user" placeholder="请输入手机号码" @input="forget.user_err = ''" />
                                </div>
                            </div>
                            <div class="err">
                                <div class="icon"></div>
                                <div class="text" v-if="forget.user_err">
                                    <i class="el-icon-warning-outline"></i>
                                    {{forget.user_err}}
                                </div>
                            </div>
                            <div class="input">
                                <div class="icon">
                                    <img src="/images/msg.png" />
                                </div>
                                <div class="text">
                                    <input v-model="forget.sms" placeholder="请输入短信验证码" @input="forget.sms_err = ''" />
                                </div>
                                <div class="act">
                                    <span @click="forgetSms">{{forget.smsSleep?(forget.smsSleep+forget.smsSleepTxt):forget.smsTip}}</span>
                                </div>
                            </div>
                            <div class="err">
                                <div class="icon"></div>
                                <div class="text" v-if="forget.sms_err">
                                    <i class="el-icon-warning-outline"></i>
                                    {{forget.sms_err}}
                                </div>
                            </div>
                        </div>

                        

                    </el-tab-pane>
                    
                </el-tabs>
                <div style="padding:10px 0;">
                    
                </div>
            </div>
            <button :class="checkForget?'active':''" @click="forgetSubmit">{{forget.step?'确认并登录':'下一步'}}</button>
            <p></p>
        </div>
        



        <div v-if="treatyShow ? true:false" class="login_treaty" id="login_treaty_em" tabindex="1" @blur="toggleTreaty(0)">
            <div class="close" @click="toggleTreaty(0)">
                <i class="el-icon-close"></i>
            </div>
            <div class="login_treaty_box">
                <h4>服务协议</h4>
                <pre>
                     阿斯顿叫阿拉山口就到了卡手机丢了卡吉拉接受的气味很强哦i问候i请我喝酒了情怀去看温和清洁莲花味精强化网络客户博威集团始创于
1987年，经过
30
余
年快速健康
发展，在全球范围拥有六个制造基地和一个资本合作平台，
成为集新材料、新能源、精密切割丝、精密零部件、高端卫浴
资本合作等六大产业于一体的科技型、资本型、国际化企业集团。

在博威人共同努力下，博威集团是国家首批“创新型企业”、“国家技术创新示范企业”
，拥有“国家企业技术中心”、“博士后科研工作站”、“国家认可实验室”和“国家地方联合工程研究中心”
等研发创新平台。

博威集团旗下拥有宁波博威合金材料股份有限公司
（上海证交所主板上市，股票代码：601137）、博威尔特（越南）太阳能科技有限公司、
宁波博德高科股份有限公司、宁波博曼特工业有限公司、伊泰丽莎（越南）有限公司、宁波博威投资有限公司，
2015年9月30日成功收购德国贝肯霍夫公司100%股权。现拥有博威云龙、博威滨海、博德高科、博威越南、
德国霍伊黑尔海姆、德国赫尔伯恩六大工业园区，占地面积 75.1万平方米，共有员工6000余人，其中各类专业技术人员800余人。

集团目前拥有171件发明专利，其中中国发明专利62件、欧美等国家专利109件
，同时还有多项中国及国际发明专利正在申报和审批；
主持和负责起草18项国家标准、5项行业标准；承担1项国家“十三五”重点研发计划项目；
承担2项国家科技支撑计划项目、5项国家火炬计划项目、2项国家科技创新基金项目、2项国家重点新产品；连续多年被评为银行资信AA
A级企业。

阿斯顿叫阿拉山口就到了卡手机丢了卡吉拉接受的气味很强哦i问候i请我喝酒了情怀去看温和清洁莲花味精强化网络客户博威集团始创
于1987年，经过30余年快速健康发展，在全球范围拥有六个制造基地和一个资本合作平台，
成为集新材料、新能源、精密切割丝、精密零部件、高端卫浴
密零部件、高端卫浴 
                  </pre
                >
            </div>
        </div>
    </div>
</template>

<script>
import * as api from "@/api/user";

export default {
    data() {
        return {
            title:'Login TI',

            expireday:7, // 失效时间
            smsTimer:15, //验证码倒计时时间?s
            
            boxShow:true,
            treaty:false,
            treatyShow:false,
            activeName:"pwd",
            
            pwdUser:'',
            pwdUserErr:'',
            pwdCheck:'',
            pwdCheckErr:'',
            smsUser:'',
            smsUserErr:'',
            smsCheck:'',
            smsCheckErr:'',
            smsTip:'发送验证码',
            smsSleep:0,
            smsSleepTxt:'秒后再次发送',

            checkAll:false,
            TIMER:null,

            // 忘记密码找回操作数据
            forget:{
                status:false,
                step:0,
                active:'find',
                user:'',
                user_err:'',
                sms:'',
                sms_err:'',
                smsTip:'发送验证码',
                smsSleep:0,
                smsSleepTxt:'秒后再次发送',
                pwd1:'',
                pwd1_err:'',
                pwd2:'',
                pwd2_err:'',
            }

        };
    },
    computed: {
        checkForget(){
            // console.log('checkForget',this.forget);
            if(this.forget.step){
                if(!this.forget.pwd1.length) return false;
                if(!this.forget.pwd2.length) return false;
            }else{
                if(!this.forget.user.length) return false;
                if(!this.forget.sms.length) return false;
            }
            return true;
        }
    },
    methods: {
        isMobile(txt) {
            let reg = /^(\+\d{2,3}\-)?\d{11}$/;
            if (!reg.test(txt)) {
                return false;
            } else {
                return true;
            }
        },
        clearForm(){
            this.pwdUser='';
            this.pwdUserErr='';
            this.pwdCheck='';
            this.pwdCheckErr='';
            this.smsUser='';
            this.smsUserErr='';
            this.smsCheck='';
            this.smsCheckErr='';
            this.smsTip="发送验证码";
            this.smsSleep=0;
            this.checkAll=false;
            clearInterval(this.TIMER);
        },
        saveUserData(data){
            console.log('---------- 登录成功 ----------');
            for (const key in data) {
                this.$utils.appCookie(key,data[key],this.expireday,'/');
            }
            this.$store.commit('user/changeToken', data);
            this.$message({
                type: 'success',
                message: `欢迎${data.nick_name}回来!`
            });
            setTimeout(() => {
                this.$router.go(0);
            }, 500);
        },
        async login(){
            var _this = this;
            if(!this.checkAll) return;
            var _user = this[this.activeName + 'User'];
            var _check = this[this.activeName + 'Check'];
            

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
           const data=await api.userLogin({
                // 登录类型 : 0 闪验 , 1 手机登录 ,2 帐号登录
                type:{'pwd':2,'sms':1}[this.activeName]||0, 
                qstr: _user, // 账号、手机号
                tstr:_check,  // 密码、短信验证码
                // code:""  // 特殊验证串(如闪验的)
           })
           .catch(err => {
               this[this.activeName + 'CheckErr'] =err;
                this.$message({
                    showClose: true,
                    type: 'error',
                    message:err
                });
                return;
           });
           
           
           if(data) this.saveUserData(data);



        },
        checkStatus(){
            // console.log('---------------',this.checkAll);
            var _user = this[this.activeName + 'User'];
            // console.log(this.activeName + 'User',_user);
            var _check = this[this.activeName + 'Check'];
            // console.log(this.activeName + 'Check',_check);
            // console.log('treaty',this.treaty);
            this.checkAll = _user.length && _check.length && this.treaty;
            this[this.activeName + 'UserErr'] = '';
            this[this.activeName + 'CheckErr'] = '';
        },
        toggleTreaty(status){
            if(typeof status == 'undefined' ){
                this.treatyShow = !this.treatyShow;
            }else{
                 this.treatyShow = status;
            }
            if(this.treatyShow){
                setTimeout(() => {
                document.getElementById('login_treaty_em').focus()
                }, 200);
            }
        },
        sendSms(){
            if(this.smsSleep) return;

            var _user = this[this.activeName + 'User'];
            if(!_user.length){
                this.smsUserErr = '手机号码不能为空!';
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: this.smsUserErr
                });
                return;
            }

            if(!this.isMobile(_user)){
                this.smsUserErr = '请填写正确的手机号码!';
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: this.smsUserErr
                });
                return;
            }
            
            // 发送验证码
            api.sendSMS({
                type:"1",
                mobile:_user
            },(data)=>{
                console.log("发送验证码:",data);alert(data.result ||data);
            })
            .catch(err => {
                this.smsCheckErr = err;
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: this.smsCheckErr
                });
                return;
            });
            this.smsSleep = this.smsTimer;
            this.TIMER = setInterval(() => {
                this.smsSleep --;
                if(this.smsSleep<1){
                    clearInterval(this.TIMER);
                    this.smsSleep = 0;
                } 
            }, 1000);
            this.$message({
                showClose: true,
                type: 'success',//type: 'error',
                message: '短信已发送请注意查收!'
            });
        },
        
        forgetSms(){
            if(this.forget.smsSleep) return;

            var _user = this.forget.user;
            if(!_user.length){
                this.forget.user_err = '手机号码不能为空!';
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: this.forget.user_err
                });
                return;
            }

            if(!this.isMobile(_user)){
                this.forget.user_err = '请填写正确的手机号码!';
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: this.forget.user_err
                });
                return;
            }
            
            // 发送验证码
            api.sendSMS({
                type:"2",
                mobile:_user
            },(data)=>{
                console.log("发送验证码:",data);alert(data.result ||data);
            })
            .catch(err => {
                this.forget.user_err = err;
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: this.forget.user_err
                });
                return;
            });
            

            this.forget.smsSleep = this.smsTimer;
            this.forget.TIMER = setInterval(() => {
                this.forget.smsSleep --;
                if(this.forget.smsSleep<1){
                    clearInterval(this.forget.TIMER);
                    this.forget.smsSleep = 0;
                } 
            }, 1000);
            this.$message({
                showClose: true,
                type: 'success',//type: 'error',
                message: '短信已发送请注意查收!'
            });
        },
        forgetSubmit(){
            if(!this.checkForget) return;
            // console.log("== forgetSubmit ==");
            if(this.forget.step){
                
                if(this.forget.pwd1 != this.forget.pwd2){
                    this.forget.pwd2_err = '两次密码输入不一致';
                    this.$message({
                        showClose: true,
                        type: 'error',
                        message: this.forget.pwd2_err
                    });
                    return;
                }
                

                // 保存新设置的密码操作
                api.forgetPass({
                    pass:this.forget.pwd2,
                    code:this.forget.sms,
                    mobile:this.forget.user 
                },(data)=>{
                     console.log("保存新设置的密码操作:",data);
                    if(data.user_id && data.token){
                        //直接登录
                        this.saveUserData(data);
                    }else{
                        this.forget.step = 0;
                        this.$message({
                            type: 'success',
                            message: `重置密码成功请您重新登录帐号!`
                        });
                        this.forget.status= false;
                        this.clearForm();
                    } 
                })
                .catch(err => {
                    this.forget.sms_err = err;
                    this.$message({
                        showClose: true,
                        type: 'error',
                        message: err
                    });
                    return;
                });
                
                

                
                
            }else{
                

                if(!this.isMobile(this.forget.user)){
                    this.forget.user_err = '请填写正确的手机号码!';
                    this.$message({
                        showClose: true,
                        type: 'error',
                        message: this.forget.user_err
                    });
                    return;
                }
                
                //校验短信验证码
                api.checkSMS({
                    type:"2",
                    code:this.forget.sms,
                    mobile:this.forget.user 
                },(data)=>{
                    /*
                    {
                        "code": "0",
                        "message": "请求操作成功！",
                        "data": "有效验证码！"
                    }
                    */
                //    console.log("校验短信验证码:",data);alert(data.result ||data);
                   this.forget.step = 1;
                })
                .catch(err => {
                    this.forget.sms_err = err;
                    this.$message({
                        showClose: true,
                        type: 'error',
                        message: err
                    });
                    return;
                });
                
                
                
            }
        }
    }
};
</script>

<style lang="less">
//    登录样式 byFeikeq
.login-form {
    width: 100%;
    position: absolute;
    right: 0;
    top: 100%;
    .login_box {
        position: absolute;
        width: 380px;
        height: 443px;
        background: #0a1331;
        border: 2px solid #1c71da;
        box-shadow: 2px 4px 6px rgba(36, 41, 174, 0.76);
        border-radius: 8px;
        right: 0;
        top: 0;
        padding: 25px;
        .checkbox{
            width:12px;
            height: 12px;
        }
        .checkbox:checked {
            background:#1C71DA;
        }
        .checkbox {
            background-color:transparent;
            border:1px solid #1C71DA;
            -webkit-border-radius:50%;
            border-radius:50%;
            font-size:12px;
            margin:2px;
            padding:0;
            position:relative;
            display:inline-block;
            vertical-align:top;
            cursor:default;
            -webkit-appearance:none;
            -webkit-user-select:none;
            user-select:none;
            -webkit-transition:background-color ease 0.1s;
            transition:background-color ease 0.1s;
        }
        .checkbox:checked::after {
            content:'';
            top:2px;
            left:1px;
            position:absolute;
            background:transparent;
            border:#fff solid 2px;
            border-top:none;
            border-right:none;
            height:5px;
            width:8px;
            -moz-transform:rotate(-45deg);
            -ms-transform:rotate(-45deg);
            -webkit-transform:rotate(-45deg);
            transform:rotate(-45deg);
        }


        .forms {
            padding: 10px;

            .input {
                display: flex;
                margin-top: 10px;
                height: 26px;
            }
            .err {
                height: 26px;
                overflow: hidden;
                font-size: 12px;
                line-height: 26px;
                color: #fc5353;
                display: flex;
                position: relative;
                i{
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
                    color: #666;
                    cursor: pointer;
                }
            }
            .icon {
                width: 40px;
                img {
                    width: 24px;
                    height: 24px;
                }
            }
            .text {
                flex: 1;
                input {
                    width: 100%;
                    height: 25px;
                    font-size: 14px;
                    line-height: 25px;
                    background: transparent;
                    border-bottom: 1px solid #aaa;
                    color: #fff;
                }
            }
            .act {
                padding: 0 0 0 10px;
                margin-top: -10px;
                span {
                    display: block;
                    text-align: center;
                    font-size: 14px;
                    font-weight: bold;
                    color: #fff;
                    width: 108px;
                    height: 36px;
                    line-height: 36px;
                    background: #707070;
                    border-radius: 4px;
                    cursor: pointer;
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
                color: #bbb;
            }
            .el-tabs__item.is-active a,
            .el-tabs__nav .el-tabs__item a:hover {
                color: #fff;
            }
            .el-tabs__item.is-active a {
                font-weight: bold;
            }
            .el-tabs__active-bar {
                height: 4px;
                background: linear-gradient(180deg, #2b2bf9 0%, #1b74d9 100%);
                box-shadow: 0px 1px 6px rgba(42, 47, 247, 0.3);
                border-radius: 20px;
            }
        }
        button {
            font-size: 16px;
            font-weight: bold;
            color: #fff;
            width: 330px;
            height: 47px;
            line-height: 47px;
            background: #707070;
            border-radius: 24px;
        }
        button.active{
            cursor: pointer;
            background: linear-gradient(136deg, #2b2bf9 0%, #1b74d9 100%);
            box-shadow: 0px 3px 6px #2b2bf9;
        }
        p {
            text-align: center;
            height: 16px;
            font-size: 12px;
            line-height: 16px;
            color: #aaa;
            margin: 10px;
            a{
                color: #1C71DA;
            }
        }
    }
    .login_treaty {
        width: 100%;
        position: absolute;
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
            outline:none;
        }
        .close {
            position: absolute;
            right: 10px;
            top: 10px;
            cursor: pointer;
            z-index: 9999;
            &:hover {
                color: #1c71da;
            }
        }
        .login_treaty_box {
            padding: 20px 60px;
            position: relative;
            z-index: 999;

            h4 {
                text-align: center;
                line-height: 70px;
            }
            pre {
                width: 100%;
                height: calc(80vh - 140px);
                overflow-y: overlay;
                overflow-x: hidden;
                margin: 10px 0;
            }
        }
    }
}




</style>
