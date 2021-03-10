<!--
 * @Author: FeikeQ
 * @Date: 2020-12-22 10:47:28
 * @LastEditTime: 2021-03-02 16:59:25
 * @LastEditors: FeikeQ
 * @FilePath: /nami-pc/pages/user/index.vue
 * @Description: 
-->
<template>
  <div class="user-box">
    <app-carousel></app-carousel>
    <div style="height:24px"></div>
    <div v-if="userInfo.isLogin" class="user-content">
      <div class="user-sidebar">
        <div class="pic">
          <img :src="`/images/img${userInfo.avatar.value}.png`" width="100" />
        </div>
        <p class="name">{{userInfo.name.value}}</p>
        <div style="height:30px"></div>
        <ul>
          <li :class="(menu == 'user-follow')?'active':''" @click="menuChange" name="user-follow">
            <a href="javascript:;">我的关注</a>
          </li>
          <li :class="(menu == 'user-info')?'active':''" @click="menuChange" name="user-info">
            <a href="javascript:;">帐号信息</a>
          </li>
          <!-- <li name="user-test">
                       <a> 测试 {{$store.state.user.token}}</a>
          </li>-->
        </ul>
      </div>

      <div class="user-detail" :class="modify?'modify':''">
        <div v-if="menu == 'user-info'" class="user-info">
          <!-- <div class="infohead" style="text-align:right;padding:40px;">
                        <button v-if="!modify" @click="modify = true"><span class="icon"></span> 编辑信息</button>
                        <button v-else class="active" @click="saveUserInfo"><span class="icon"></span> 确认修改</button>
          </div>-->

          <div class="editbox">
            <div class="avatar" :class="userInfo.avatar.edit?'edit':''">
              <div class="avatar_form">
                <img
                  src="/images/img1.png"
                  width="70"
                  :class="(userInfo.avatar.choice==1)?'active':''"
                  @click="userInfo.avatar.choice=1"
                />
                <img
                  src="/images/img2.png"
                  width="70"
                  :class="(userInfo.avatar.choice==2)?'active':''"
                  @click="userInfo.avatar.choice=2"
                />
                <img
                  src="/images/img3.png"
                  width="70"
                  :class="(userInfo.avatar.choice==3)?'active':''"
                  @click="userInfo.avatar.choice=3"
                />
                <br />
                <img
                  src="/images/img4.png"
                  width="70"
                  :class="(userInfo.avatar.choice==4)?'active':''"
                  @click="userInfo.avatar.choice=4"
                />
                <img
                  src="/images/img5.png"
                  width="70"
                  :class="(userInfo.avatar.choice==5)?'active':''"
                  @click="userInfo.avatar.choice=5"
                />
                <img
                  src="/images/img6.png"
                  width="70"
                  :class="(userInfo.avatar.choice==6)?'active':''"
                  @click="userInfo.avatar.choice=6"
                />
              </div>

              <div class="avatar_disp">
                <div class="border">
                  <img :src="`/images/img${userInfo.avatar.choice}.png`" />
                  <div @click="avatarCancel">{{userInfo.avatar.edit?'取消':'更改'}}</div>
                </div>
                <div
                  v-if="userInfo.avatar.edit"
                  style="position:absolute;width:100%;padding-top:20px;"
                >
                  <button
                    @click="saveUserAvatar"
                    class="active"
                    style="width:90px; height: 26px; line-height: 26px; margin: 0px;"
                  >确定修改</button>
                </div>
              </div>
            </div>

            <div class="line">
              <div
                style="width:2px;height:100px;background:#ccc;border-radius:2px;display:inline-block;"
              ></div>
            </div>

            <div class="base">
              <div class="form">
                <div class="username" :class="userInfo.name.edit?'edit':''">
                  <img class="icon" src="/images/user.png" />
                  <p>
                    <span>{{userInfo.name.value}}</span>
                    <i @click="userInfo.name.edit = true">修改昵称</i>
                  </p>
                  <dd>
                    <input
                      v-model="userInfo.name.choice"
                      placeholder="请输入1-20位的昵称"
                      @input="userInfo.name.err=''"
                    />
                    <span v-if="userInfo.name.err" class="err">
                      <i class="el-icon-warning-outline"></i>
                      {{userInfo.name.err}}
                    </span>
                  </dd>
                </div>
                <div v-if="userInfo.name.edit" class="username_box" style="margin-top:-16px;">
                  <div style="width:34px;"></div>
                  <div class="smsact" style=" width:200px;line-height:26px;padding:8px 0;">
                    <span
                      style="font-size: 14px;color: #888888;cursor: pointer;"
                      @click="usernameClear"
                    >取消</span>
                    <button
                      :class="userInfo.name.choice.length?'active':'disabled'"
                      style="float:right;width:90px;height:26px;line-height:26px;margin:0;"
                      @click="saveUserName"
                    >确定修改</button>
                  </div>
                </div>

                <div class="userphone" :class="userInfo.phone.edit?'edit':''">
                  <img class="icon" src="/images/sms_w.png" />
                  <p>
                    <span>{{userInfo.phone.assist?`请输入手机号码${userInfo.phone.value}的验证码`:userInfo.phone.value}}</span>
                    <i v-if="!userInfo.phone.assist" @click="userInfo.phone.assist = true">修改手机</i>
                  </p>
                  <dd>
                    <input
                      v-model="userInfo.phone.choice"
                      placeholder="请输入新的手机号码"
                      @input="userInfo.phone.err=''"
                    />
                    <span v-if="userInfo.phone.err" class="err">
                      <i class="el-icon-warning-outline"></i>
                      {{userInfo.phone.err}}
                    </span>
                  </dd>
                </div>
                <div v-if="userInfo.phone.assist" class="userphone_box" style="margin-top:-16px;">
                  <div style="width:34px;"></div>
                  <div style="flex:1;">
                    <div class="smsform" style="display: flex;">
                      <div class="input_group" :class="code?'disabled':''">
                        <input
                          v-model="userInfo.phone.sms"
                          placeholder="请输入验证码"
                          @input="userInfo.phone.sms_err=''"
                        />
                        <div
                          class="button"
                          @click="phoenSms"
                        >{{userInfo.phone.smsSleep?(`再次发送(${userInfo.phone.smsSleep}s)`):userInfo.phone.smsTip}}</div>
                        <div style="clear: both;"></div>
                      </div>
                      <div class="err" v-if="userInfo.phone.sms_err" style="padding:0 8px;">
                        <i class="el-icon-warning-outline"></i>
                        {{userInfo.phone.sms_err}}
                      </div>
                    </div>
                    <div class="smsact" style=" width:200px;line-height:26px;padding:8px 0;">
                      <span
                        style="font-size: 14px;color: #888888;cursor: pointer;"
                        @click="phoneClear"
                      >取消</span>
                      <button
                        :class="userInfo.phone.sms.length?'active':'disabled'"
                        style="float:right;width:90px;height:26px;line-height:26px;margin:0;"
                        @click="phoenCheck"
                      >{{userInfo.phone.edit?'确定修改':'下一步'}}</button>
                    </div>
                  </div>
                </div>

                <div class="userpwd" :class="userInfo.password.edit?'edit':''">
                  <img class="icon" src="/images/pwd_w.png" />
                  <p>
                    <span>{{userInfo.password.value || '未设置'}}</span>
                    <i v-if="!userInfo.password.assist" @click="passwordSet">修改密码</i>
                  </p>
                  <dd v-if="userInfo.password.value.length">
                    <template v-if="userInfo.password.sms_check">
                      <input
                        v-model="userInfo.password.choice"
                        type="password"
                        placeholder="请输入新的密码"
                        @input="userInfo.password.err=''"
                      />
                      <span v-if="userInfo.password.err" class="err">
                        <i class="el-icon-warning-outline"></i>
                        {{userInfo.password.err}}
                      </span>
                      <span v-if="twicepwd && !userInfo.password.err" class="err">
                        <img style="width:16px;height:16px;" src="/images/circle-check.png" />
                      </span>
                    </template>
                    <template v-else>
                      <span style="font-size: 14px;">为了您的账户安全，需验证原手机{{userInfo.phone.value}}的验证码</span>
                    </template>
                  </dd>
                  <dd v-else>
                    <input
                      v-model="userInfo.password.choice"
                      type="password"
                      placeholder="请输入新的密码"
                      @input="userInfo.password.err=''"
                    />
                    <span v-if="userInfo.password.err" class="err">
                      <i class="el-icon-warning-outline"></i>
                      {{userInfo.password.err}}
                    </span>
                    <span v-if="twicepwd && !userInfo.password.err" class="err">
                      <img style="width:16px;height:16px;" src="/images/circle-check.png" />
                    </span>
                  </dd>
                </div>
                <div v-if="userInfo.password.assist" class="userpwd_box" style="margin-top:-16px;">
                  <div style="width:34px;"></div>
                  <div style="flex:1;">
                    <template v-if="userInfo.password.sms_check">
                      <div style="margin-bottom:6px; min-height:35px">
                        <input
                          v-model="userInfo.password.check"
                          type="password"
                          placeholder="请再次输入密码"
                          @input="userInfo.password.check_err=''"
                        />
                        <span v-if="userInfo.password.check_err" class="err">
                          <i class="el-icon-warning-outline"></i>
                          {{userInfo.password.check_err}}
                        </span>
                        <span v-if="twicepwd && !userInfo.password.check_err" class="err">
                          <img style="width:16px;height:16px;" src="/images/circle-check.png" />
                        </span>
                      </div>
                    </template>
                    <template v-else>
                      <div
                        v-if="userInfo.password.value.length"
                        class="smsform"
                        style="display: flex;"
                      >
                        <div class="input_group" :class="userInfo.password.smsSleep?'disabled':''">
                          <input
                            v-model="userInfo.password.sms"
                            placeholder="请输入验证码"
                            @input="userInfo.password.sms_err=''"
                          />
                          <div
                            class="button"
                            @click="passwordSms"
                          >{{userInfo.password.smsSleep?(`再次发送(${userInfo.password.smsSleep}s)`):userInfo.password.smsTip}}</div>
                          <div style="clear: both;"></div>
                        </div>
                        <div class="err" v-if="userInfo.password.sms_err" style="padding:0 8px;">
                          <i class="el-icon-warning-outline"></i>
                          {{userInfo.password.sms_err}}
                        </div>
                      </div>
                      <div v-else style="margin-bottom:6px; min-height:35px">
                        <input
                          v-model="userInfo.password.check"
                          type="password"
                          placeholder="请再次输入密码"
                          @input="userInfo.password.check_err=''"
                        />
                        <span v-if="userInfo.password.check_err" class="err">
                          <i class="el-icon-warning-outline"></i>
                          {{userInfo.password.check_err}}
                        </span>
                        <span v-if="twicepwd && !userInfo.password.check_err" class="err">
                          <img style="width:16px;height:16px;" src="/images/circle-check.png" />
                        </span>
                      </div>
                    </template>

                    <div class="smsact" style=" width:200px;line-height:26px;padding:8px 0;">
                      <span
                        style="font-size: 14px;color: #888888;cursor: pointer;"
                        @click="passwordClear"
                      >取消</span>
                      <button
                        v-if="userInfo.password.value.length"
                        :class="userInfo.password.sms.length?'active':'disabled'"
                        style="float:right;width:90px;height:26px;line-height:26px;margin:0;"
                        @click="passwordSMSCheck"
                      >{{userInfo.password.sms_check?'确定修改':'下一步'}}</button>
                      <button
                        v-else
                        :class="checkpass?'active':'disabled'"
                        style="float:right;width:90px;height:26px;line-height:26px;margin:0;"
                        @click="passwordCheck"
                      >确定修改</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="infofoot" style="text-align:right;padding:40px;">
            <p style="cursor: pointer;">
              <img width="18" src="/images/shutdown.png" />
              <span
                style="font-size: 16px;line-height: 21px;color: #999;"
                @click="destroyAccount.show=true"
              >帐号注销</span>
            </p>
          </div>
        </div>

        <div v-if="menu == 'user-follow'" class="user-follow">
          <el-tabs v-model="activeName" @tab-click="pullFollowList">
            <el-tab-pane label="比赛" name="match">
              <span slot="label">
                <a href="javascript:;">
                  <!-- <i class="el-icon-chat-dot-square"></i> -->
                  比赛
                </a>
              </span>
              <div v-for="(item,index) in follow[activeName].data" :key="index">
                <follow-list :title="item.title" :alt="item.gid" :data="item.list" type="match" />
              </div>
            </el-tab-pane>

            <el-tab-pane v-if="followAll" label="赛事" name="competition">
              <span slot="label">
                <a href="javascript:;">
                  <!-- <i class="el-icon-office-building"></i> -->
                  赛事
                </a>
              </span>
              <div v-for="(item,index) in follow[activeName].data" :key="index">
                <follow-list
                  :title="item.title"
                  icon="/images/LPL.png"
                  :alt="item.gid"
                  :data="item.list"
                  type="competition"
                />
              </div>
            </el-tab-pane>

            <el-tab-pane v-if="followAll" label="战队" name="team">
              <span slot="label">
                <a href="javascript:;">
                  <!-- <i class="el-icon-office-building"></i> -->
                  战队
                </a>
              </span>
              <div v-for="(item,index) in follow[activeName].data" :key="index">
                <follow-list title icon :alt="item.gid" :data="item.list" type="team" />
              </div>
            </el-tab-pane>

            <el-tab-pane v-if="followAll" label="选手" name="player">
              <span slot="label">
                <a href="javascript:;">
                  <!-- <i class="el-icon-office-building"></i> -->
                  选手
                </a>
              </span>
              <div v-for="(item,index) in follow[activeName].data" :key="index">
                <follow-list title icon :alt="item.gid" :data="item.list" type="player" />
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div v-else>请登录 。。。</div>

    <el-dialog
      custom-class="close-account"
      title="注销账号"
      :lock-scroll="false"
      :append-to-body="true"
      :visible.sync="destroyAccount.show"
      width="400px"
      top="30vh"
      :close-on-click-modal="false"
    >
      <div class="txt">
        <p>1、您的账户注销之后将无法登录</p>
        <p>2、您所有的身份相关信息将会被清除</p>
        <p>3、您的数据清除之后将无法恢复</p>
        <p>4、您的所有操作和活动记录将无法查询</p>
        <p>5、该手机号将在30日内无法再次注册</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="phone">
          <img class="icon" src="/images/sms_w.png" />
          <p>
            <span>{{userInfo.phone.value}}</span>
          </p>
        </div>
        <div style="margin-top:0;">
          <div class="smsform" v-if="!destroyAccount.close">
            <div class="input_group" :class="destroyAccount.smsSleep?'disabled':''">
              <input
                v-model="destroyAccount.sms"
                placeholder="请输入验证码"
                @input="destroyAccount.sms_err=''"
              />
              <div
                class="button"
                @click="closeSms"
              >{{destroyAccount.smsSleep?(`再次发送(${destroyAccount.smsSleep}s)`):destroyAccount.smsTip}}</div>
              <div style="clear: both;"></div>
            </div>
          </div>
          <div class="err" v-if="destroyAccount.sms_err" style="padding:0 8px;">
            <i class="el-icon-warning-outline"></i>
            {{destroyAccount.sms_err}}
          </div>
          <div class="smsact" style=" width:200px;line-height:26px;padding:8px 0;">
            <button
              v-if="destroyAccount.close"
              class="active close"
              style="width:90px;height:26px;line-height:26px;margin:0;"
              @click="closeCheck"
            >确定注销</button>
            <button
              v-else
              :class="destroyAccount.sms.length?'active':'disabled'"
              style="width:90px;height:26px;line-height:26px; margin:0;"
              @click="closeCheck"
            >下一步</button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from "@/api/user";
import { mapState, mapGetters } from "vuex";
/*
team:"战队",
player:"选手",
competition:"赛事",
match:"比赛",
*/
export default {
  layout: "home",
  middleware: "authenticated",
  name: "user-box",
  components: {},
  fetch({ store, params }) {
    // console.log('fetch',store);
  },
  async asyncData({ store, app, route, params, req, query, env, $config }) {
    // console.log('this.$route',route.name);

    var cookie;
    if (process.server) {
      cookie = app.$utils.getCookieArray(req.headers.cookie); //获取cookie串并转为对象
    } else {
      cookie = app.$utils.getCookieArray();
    }
    // console.log(process.server,"cookiecookie",cookie);

    var userInfo = {
      avatar: {
        value: cookie.avatar_id || 1,
        edit: false, // 通用设置
        choice: cookie.avatar_id || 1
      },
      name: {
        value: cookie.nick_name,
        edit: false, // 通用设置
        choice: cookie.nick_name, // 默认赋值与value一致
        err: ""
      },
      phone: {
        value: cookie.mobile,
        edit: false, // 通用设置
        choice: "", // 默认赋值空
        err: "",
        assist: false, // 辅助设置
        sms: "",
        sms_err: "",
        smsTip: "获取验证码",
        smsSleep: 0,
        TIMER: null
      },
      password: {
        value: "", // 有密码显示位数*号
        edit: false, // 通用设置
        choice: "", // 默认赋值空
        err: "",
        assist: false, // 辅助设置
        check: "", // 现次密码校验
        check_err: "",
        sms: "",
        sms_err: "",
        sms_check: false, //添加校验结果
        smsTip: "获取验证码",
        smsSleep: 0,
        TIMER: null
      }
    };

    if (cookie.token) {
      userInfo.isLogin = cookie.token;
      store.commit("user/changeToken", cookie);
    }

    return {
      menu: "user-info",
      userInfo
    };
  },
  data() {
    return {
      title: "个人中心",
      modify: true, // 编辑模式
      expireday: 7, // 失效时间
      smsTimer: 60, //验证码倒计时时间?s
      destroyAccount: {
        show: false,
        close: false,
        sms: "",
        sms_err: "",
        smsTip: "获取验证码",
        smsSleep: 0,
        TIMER: null
      },
      // 关注列表
      activeName: "match",
      followAll: false, // 是否开启 赛事 战队 和 选手 的关注列表
      follow: {
        match: {
          name: "比赛",
          val: "0",
          data: []
        },
        team: {
          name: "战队",
          val: "1",
          data: []
        },
        competition: {
          name: "赛事",
          val: "2",
          data: []
        },
        player: {
          name: "选手",
          val: "3",
          data: []
        }
      }
    };
  },
  computed: {
    twicepwd() {
      if (this.userInfo.password.choice.length) {
        if (this.userInfo.password.check === this.userInfo.password.choice)
          return true;
      }
      return false;
    },
    code() {
      console.log("code", this.userInfo.phone);
      if (this.userInfo.phone.edit) {
        if (this.userInfo.phone.smsSleep) return !!this.userInfo.phone.smsSleep;
        return !this.userInfo.phone.choice.length;
      } else {
        return !!this.userInfo.phone.smsSleep;
      }
    },
    checkpass() {
      if (!this.userInfo.password.choice.length) return false;
      if (this.userInfo.password.value.length) {
        if (!this.userInfo.password.sms.length) return false;
      } else {
        if (!this.userInfo.password.check.length) return false;
        if (this.userInfo.password.choice !== this.userInfo.password.check)
          return false;
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
    formatList(data) {
      if (!data) return;
      /*

            [
                {
                "base": {
                    "match_id": 10003,
                    "box": "BO1",
                    "room_id": "5f9c4991a50dfa69f711ff240a28e93f",
                    "tournament_name": "SteelSeries GO 2012",
                    "tournament_id": 1003,
                    "tournament_logo": "",
                    "home": {
                    "team_id": 1008,
                    "team_img": "http://ti-img.inkr.xyz/storage/csgo_local/team/ct_1008.png",
                    "team_short_name": "Lemondogs"
                    },
                    "away": {
                    "team_id": 1007,
                    "team_img": "http://ti-img.inkr.xyz/storage/csgo_local/team/ct_1007.png",
                    "team_short_name": "E-Srael"
                    },
                    "status_id": 3,
                    "match_time": 1345895400
                },
                "info": {
                    "match_id": 0,
                    "box_num": 0,
                    "home": {
                    "team_id": 0,
                    "score": 0,
                    "win": 0,
                    "lose": 0,
                    "economic": 0,
                    "global_score": 1,
                    "icon_list": null
                    },
                    "away": {
                    "team_id": 0,
                    "score": 0,
                    "win": 0,
                    "lose": 0,
                    "economic": 0,
                    "global_score": 0,
                    "icon_list": null
                    },
                    "live_time": 0,
                    "room_persons": 0,
                    "status_id": 0,
                    "map_id": 0,
                    "title": "已结束"
                },
                "is_focus": true,
                "game_id": "CSGO"
                }
            ]

            
            [
            {
                game:{
                    pic:"/images/dota2.png",
                    name:"DOTA1"
                },
                time:"2020-11-1 15:30",
                competition:"黄金职业联赛黄金职业联赛黄金职业联赛黄金职业联赛黄金职业联赛黄金职业联赛黄金职业联赛黄金职业联赛",
                rule:"BO3",
                status:0, // 0 未开始 1进行中 2已结束
                home:{
                    amidithion:1,
                    name:"皇族",
                    logo:"/images/team.png",
                    score:9
                },
                away:{
                    amidithion:0,
                    name:"WE",
                    logo:"/images/team.png",
                    score:18
                },
                team:{
                    short_name:"RNG",
                    name:"Royal Never Give Up",
                    logo:"/images/team.png",
                }
            }
            ]
            */

      var _picUrl = {
        DOTA2: "/images/dota2.png",
        CSGO: "/images/csgo.png",
        LOL: "/images/lol.png"
      };
      var _list = [];
      for (let index = 0; index < data.length; index++) {
        var _group = {};
        var element = data[index];
        _group.title = element.group_str;
        _group.gid = element.group_name;
        _group.icon = element.group_icon;
        _group.color = element.group_icon;
        _group.list = [];
        for (let i = 0; i < element.group_item.length; i++) {
          var item = element.group_item[i];
          var _obj = {
            game: {
              pic: _picUrl[item.game_id.toUpperCase()],
              name: item.game_id.toUpperCase(),
              match_id: item.base.match_id
            },
            time: this.$utils.formatime(
              item.base.match_time * 1000,
              "yyyy-MM-dd hh:mm"
            ),
            competition: item.base.tournament_name,
            rule: item.base.box,
            // scene:"第一场",
            status: item.base.status_id,
            // 0比赛异常， 1未开赛， 2进行中， 3完场，11中断， 12取消， 13延期， 14腰斩， 15待定
            home: {
              amidithion: item.info.home.win,
              name: item.base.home.team_short_name,
              logo: item.base.home.team_img,
              id: item.base.home.team_id,
              score: item.info.home.global_score
            },
            away: {
              amidithion: item.info.away.win,
              name: item.base.away.team_short_name,
              logo: item.base.away.team_img,
              id: item.base.away.team_id,
              score: item.info.away.global_score
            },
            //关注战队的数据
            team: {
              short_name: "RNG",
              name: "Royal Never Give Up",
              logo: "/images/team.png"
            }
          };
          _group.list.push(_obj);
        }
        _list.push(_group);
      }
      console.log("_list:::::", _list);

      return _list;
    },
    pullFollowList(tab, event) {
      // console.log(tab.name,this.activeName);

      var _postData = {
        type: this.follow[this.activeName].val,
        op_type: 1 // 关注数据类型 0 id列表  1 数据列表
      };

      api
        .getFocus(_postData, data => {
          console.log("获取关注列表:", data);

          var _list = data.list;

          this.follow[this.activeName].data = this.formatList(_list);
        })
        .catch(err => {
          var _err = err.message || err;
          this.$message({
            showClose: true,
            type: "error",
            message: _err
          });
          return;
        });
    },

    refreshCache(data) {
      //更新 cookie
      console.log("==本地刷新缓存==");
      if (data) {
        for (const key in data) {
          this.$utils.appCookie(key, data[key], this.expireday, "/");
        }
        this.$store.commit("user/changeToken", data);
      }
    },
    phoneClear() {
      this.userInfo.phone.edit = false;
      this.userInfo.phone.sms_err = "";
      this.userInfo.phone.err = "";
      this.userInfo.phone.sms = ""; // 清空验证码
      this.userInfo.phone.choice = "";
      this.userInfo.phone.assist = false;
      this.userInfo.phone.smsSleep = 0;
      clearInterval(this.userInfo.phone.TIMER);
    },
    phoenSms() {
      console.log("修改手机号 - 发送验证码");
      if (this.userInfo.phone.smsSleep) return;

      var _postData = { type: "4" };

      if (this.userInfo.phone.edit) {
        // 新手机验证
        if (!this.userInfo.phone.choice.length) {
          this.userInfo.phone.err = "手机号码不能为空!";
          this.$message({
            showClose: true,
            type: "error",
            message: this.userInfo.phone.err
          });
          return;
        }

        if (!this.isMobile(this.userInfo.phone.choice)) {
          this.userInfo.phone.err = "请填写正确的手机号码!";
          this.$message({
            showClose: true,
            type: "error",
            message: this.userInfo.phone.err
          });
          return;
        }
        _postData.type = "5";
        _postData.mobile = this.userInfo.phone.choice;
      }

      // 给旧手机或新手机 发送验证码
      api
        .sendSMS(_postData, data => {
          // console.log("发送验证码:",data);alert(data.result ||data);
        })
        .catch(err => {
          var _err = err.message || err;
          this.userInfo.phone.sms_err = _err;
          this.$message({
            showClose: true,
            type: "error",
            message: _err
          });
          return;
        });

      this.userInfo.phone.smsSleep = this.smsTimer;
      this.userInfo.phone.TIMER = setInterval(() => {
        this.userInfo.phone.smsSleep--;
        if (this.userInfo.phone.smsSleep < 1) {
          clearInterval(this.userInfo.phone.TIMER);
          this.userInfo.phone.smsSleep = 0;
        }
      }, 1000);
      this.$message({
        showClose: true,
        type: "success", //type: 'error',
        message: "短信已发送请注意查收!"
      });
      this.userInfo.phone.sms = "";
    },
    phoenCheck() {
      if (!this.userInfo.phone.sms.length) return;

      if (!this.userInfo.phone.sms.length) {
        this.userInfo.phone.sms_err = "请填写验证码！";
        this.$message({
          showClose: true,
          type: "error",
          message: this.userInfo.phone.sms_err
        });
        console.log(this.userInfo.phone);
        return;
      }

      if (this.userInfo.phone.edit) {
        console.log("确认修改的校验");
        if (!this.userInfo.phone.choice.length) {
          this.userInfo.phone.err = "手机号码不能为空!";
          this.$message({
            showClose: true,
            type: "error",
            message: this.userInfo.phone.err
          });
          return;
        }

        if (!this.isMobile(this.userInfo.phone.choice)) {
          this.userInfo.phone.err = "请填写正确的手机号码!";
          this.$message({
            showClose: true,
            type: "error",
            message: this.userInfo.phone.err
          });
          return;
        }

        console.log("修改手机号 - 检查验证码");

        // 旧手机验证

        //校验短信验证码
        // api.checkSMS({
        //     type:"5",
        //     code:this.userInfo.phone.sms,
        //     mobile:this.userInfo.phone.choice
        // },(data)=>{});

        api
          .modifyPhone(
            {
              code: this.userInfo.phone.sms,
              mobile: this.userInfo.phone.choice
            },
            data => {
              // 修改手机号 - 保存
              console.log("修改手机号 - 保存", data);
              // 修改手机或修改密码时本地刷新缓存
              this.userInfo.phone.value =
                data && data.mobile ? data.mobile : this.userInfo.phone.choice;
              this.refreshCache(data);
              this.phoneClear();
            }
          )
          .catch(err => {
            var _err = err.message || err;
            this.userInfo.phone.sms_err = _err;
            this.$message({
              showClose: true,
              type: "error",
              message: _err
            });
            return;
          });
      } else {
        console.log("修改手机号 - 检查验证码");

        // 旧手机验证 校验短信验证码
        api
          .checkSMS(
            {
              type: "4",
              code: this.userInfo.phone.sms
            },
            data => {
              /*
                    {
                        "code": "0",
                        "message": "请求操作成功！",
                        "data": "有效验证码！"
                    }
                    */
              // console.log("校验短信验证码:",data);alert(data.result ||data);

              this.userInfo.phone.edit = true;
              this.userInfo.phone.smsSleep = 0;
              clearInterval(this.userInfo.phone.TIMER);
              this.userInfo.phone.sms = "";
            }
          )
          .catch(err => {
            var _err = err.message || err;
            this.userInfo.phone.sms_err = _err;
            this.$message({
              showClose: true,
              type: "error",
              message: _err
            });
            return;
          });
      }
    },
    usernameClear() {
      this.userInfo.name.choice = this.userInfo.name.value;
      this.userInfo.name.edit = false;
    },
    saveUserName() {
      // 确认修改
      if (!this.userInfo.name.choice.length) {
        this.userInfo.name.err = "请输入正确的昵称格式";
        this.$message({
          showClose: true,
          type: "error",
          message: this.userInfo.name.err
        });
        return;
      }

      var _postData = {
        nick_name: this.userInfo.name.choice
      };
      if (_postData.nick_name == this.userInfo.name.value) {
        // 变更状态
        this.usernameClear();
        return;
      }

      // 修改个人资料
      api
        .modifyUserInfo(_postData, data => {
          // console.log("修改个人资料:",data);

          // 变更状态
          this.userInfo.name.value = this.userInfo.name.choice;
          this.usernameClear();

          // 更新本地缓存
          this.refreshCache(data || _postData);
        })
        .catch(err => {
          var _err = err.message || err;
          // this.userInfo.phone.sms_err = err;
          this.$message({
            showClose: true,
            type: "error",
            message: _err
          });
          return;
        });
    },
    avatarCancel() {
      if (this.userInfo.avatar.edit)
        this.userInfo.avatar.choice = this.userInfo.avatar.value;
      this.userInfo.avatar.edit = !this.userInfo.avatar.edit;
    },
    avatarClear() {
      this.userInfo.avatar.edit = false;
      this.userInfo.avatar.choice = this.userInfo.avatar.value;
    },
    saveUserAvatar() {
      var _postData = {
        avatar_id: this.userInfo.avatar.choice + ""
      };
      if (_postData.avatar_id == this.userInfo.avatar.value) {
        // 变更状态
        // this.modify = false;
        this.avatarClear();
        return;
      }

      // 修改个人资料
      api
        .modifyUserInfo(_postData, data => {
          // console.log("修改个人资料:",data);

          // 修改头像
          this.userInfo.avatar.value = this.userInfo.avatar.choice;
          this.avatarClear();
          // 更新本地缓存
          this.refreshCache(data || _postData);
        })
        .catch(err => {
          var _err = err.message || err;
          // this.userInfo.phone.sms_err = err;
          this.$message({
            showClose: true,
            type: "error",
            message: _err
          });
          return;
        });
    },
    passwordSet() {
      this.userInfo.password.edit = true;
      this.userInfo.password.assist = true;
      this.userInfo.password.choice = "";
    },
    passwordClear() {
      this.userInfo.password.edit = false;
      this.userInfo.password.sms_err = "";
      this.userInfo.password.sms = "";
      this.userInfo.password.sms_check = false;
      this.userInfo.password.err = "";
      this.userInfo.password.choice = "";
      this.userInfo.password.assist = false;
      this.userInfo.password.check = "";
      this.userInfo.password.check_err = "";
      this.userInfo.password.smsSleep = 0;
      clearInterval(this.userInfo.password.TIMER);
    },
    passwordChange() {
      // 设置新密码或修改密码 - 保存
      // console.log('设置新密码或修改密码 - 保存',this.userInfo.password.edit ,this.userInfo.password.choice);
      var _postData = {
        pass: this.userInfo.password.choice
      };

      var _logout = false;

      // 如果设置新密码
      if (this.userInfo.password.value.length) {
        _logout = true;
        _postData.code = this.userInfo.password.sms;
      }

      // 设置新密码 或 修改密码
      api
        .modifyPass(_postData, data => {
          this.userInfo.password.value = "************";
          this.refreshCache(data);
          this.passwordClear();
          this.$message({
            showClose: true,
            type: "success", //type: 'error',
            message: "您的密码已更新!"
          });
        })
        .catch(err => {
          // console.log("错划划",err);
          var _err = err.message || err;
          if (this.userInfo.password.value.length) {
            this.userInfo.password.sms_err = _err;
          } else {
            this.userInfo.password.check_err = _err;
          }

          this.$message({
            showClose: true,
            type: "error",
            message: _err
          });
          return;
        });
    },
    passwordSms() {
      console.log("修改密码 - 发送验证码");
      if (this.userInfo.password.smsSleep) return;

      // 给旧手机或新手机 发送验证码
      api
        .sendSMS(
          {
            type: "3"
          },
          data => {
            // console.log("发送验证码:",data);alert(data.result ||data);
          }
        )
        .catch(err => {
          var _err = err.message;
          this.userInfo.password.sms_err = _err;
          this.$message({
            showClose: true,
            type: "error",
            message: _err
          });
          return;
        });

      this.userInfo.password.smsSleep = this.smsTimer;
      this.userInfo.password.TIMER = setInterval(() => {
        this.userInfo.password.smsSleep--;
        if (this.userInfo.password.smsSleep < 1) {
          clearInterval(this.userInfo.password.TIMER);
          this.userInfo.password.smsSleep = 0;
        }
      }, 1000);
      this.$message({
        showClose: true,
        type: "success", //type: 'error',
        message: "短信已发送请注意查收!"
      });
      this.userInfo.password.sms = "";
    },
    passwordSMSCheck() {
      // console.log('passwordSMSCheck:',this.userInfo.password.sms_check);
      if (this.userInfo.password.sms_check) {
        this.passwordCheck();
      } else {
        // 验证修改密码
        api
          .checkSMS(
            {
              type: "3",
              code: this.userInfo.password.sms
            },
            data => {
              // console.log("修改密码校验短信验证码:",data);alert(data.result ||data);
              this.userInfo.password.sms_check = true; // 验证成功
            }
          )
          .catch(err => {
            var _err = err.message || err;
            this.userInfo.password.sms_err = _err;
            this.$message({
              showClose: true,
              type: "error",
              message: _err
            });
            return;
          });
      }
    },
    passwordCheck() {
      // 新密码验证
      if (!this.userInfo.password.choice.length) {
        this.userInfo.password.err = "新密码不能为空!";
        this.$message({
          showClose: true,
          type: "error",
          message: this.userInfo.password.err
        });
        return;
      }

      // 如果修改旧密码
      if (this.userInfo.password.value.length) {
        if (!this.userInfo.password.sms.length) {
          this.userInfo.password.sms_err = "请填写验证码！";
          this.$message({
            showClose: true,
            type: "error",
            message: this.userInfo.password.sms_err
          });
          return;
        }
      } else {
        // 如果不是修改密码而是新设置密码

        // 第二次密码验证
        if (!this.userInfo.password.check.length) {
          this.userInfo.password.check_err = "再次确认密码不能为空!";
          this.$message({
            showClose: true,
            type: "error",
            message: this.userInfo.password.check_err
          });
          return;
        }

        if (this.userInfo.password.check != this.userInfo.password.choice) {
          this.userInfo.password.check_err = "两次密码不一致!";
          this.$message({
            showClose: true,
            type: "error",
            message: this.userInfo.password.check_err
          });
          return;
        }
      }

      // 保存密码
      this.passwordChange();
    },
    closeSms() {
      console.log("注销帐户 - 发送验证码");
      if (this.destroyAccount.smsSleep) return;

      // 发送验证码
      api
        .sendSMS({ type: "7" }, data => {
          // console.log("发送验证码:",data);alert(data.result ||data);
        })
        .catch(err => {
          var _err = err.message || err;
          this.destroyAccount.sms_err = _err;
          this.$message({
            showClose: true,
            type: "error",
            message: _err
          });
          return;
        });

      this.destroyAccount.smsSleep = this.smsTimer;
      this.destroyAccount.TIMER = setInterval(() => {
        this.destroyAccount.smsSleep--;
        if (this.destroyAccount.smsSleep < 1) {
          clearInterval(this.destroyAccount.TIMER);
          this.destroyAccount.smsSleep = 0;
        }
      }, 1000);
      this.$message({
        showClose: true,
        type: "success", //type: 'error',
        message: "短信已发送请注意查收!"
      });
      this.destroyAccount.sms = "";
    },
    closeCheck() {
      if (this.destroyAccount.close) {
        // 注销帐户
        api
          .destroyUser({ type: 1, code: this.destroyAccount.sms }, data => {
            this.destroyAccount.show = false; // 恢复状态
            this.forcedLogout("您的帐号已成功注销!!后会有期江湖再见！");
          })
          .catch(err => {
            var _err = err.message || err;
            this.destroyAccount.sms_err = _err;
            this.$message({
              showClose: true,
              type: "error",
              message: _err
            });
            return;
          });
      } else {
        if (!this.destroyAccount.sms.length) return;

        // 验证注销
        api
          .checkSMS(
            {
              type: "7",
              code: this.destroyAccount.sms
            },
            data => {
              // console.log("校验短信验证码:",data);alert(data.result ||data);

              this.destroyAccount.sms_err = "";
              this.destroyAccount.close = true; // 验证成功
            }
          )
          .catch(err => {
            var _err = err.message || err;
            this.destroyAccount.sms_err = _err;
            this.$message({
              showClose: true,
              type: "error",
              message: _err
            });
            // this.destroyAccount.sms_err ="";
            // this.destroyAccount.close = true; // debug
            return;
          });
      }
    },
    forcedLogout(msg) {
      // 强制登出已注销帐号

      var _token = this.userInfo.isLogin;
      console.log("_token", _token);

      this.$utils.appCookie("token", "del", -1, "/");
      this.$message({
        type: "success",
        message: msg || "已退出登录！"
      });
      api.logout({ stk: _token });
      setTimeout(() => {
        this.$router.go(0);
      }, 500);
    },
    menuChange(event) {
      // 切换菜单
      this.menu = event.target.parentNode.getAttribute("name");
    }
  },
  created() {
    if (this.userInfo.isLogin) {
      api.getUserInfo({ type: "1" }, data => {
        this.userInfo.password.value =
          data && data.result ? "************" : "";
      });
      this.pullFollowList();
    }
  },
  mounted() {},
  // watchQuery: ['page'],
  head() {
    return {
      title: this.title,
      meta: [
        { name: "keywords", content: this.title },
        {
          hid: "description", //为了避免子组件中的 meta 标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 hid 键为 meta 标签配一个唯一的标识编号。
          name: "description",
          content: this.title
        }
      ]
    };
  }
};
</script>

<style lang="less">
.close-account {
  background: #fff;
  border-radius: 6px;
  padding: 0 40px;
  color: #333;
  .el-dialog__title {
    font-size: 18px;
    font-weight: bold;
    color: #fc5353;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #666;
    background: #ccc;
    border-radius: 50%;
    padding: 2px;
  }
  .el-dialog__body {
    padding: 0 20px;
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
    button {
      color: #bbb;
      height: 30px;
      line-height: 30px;
      border: 1px solid #ddd;
      border-radius: 20px;
      font-size: 14px;
      margin: 0 10px;
      background: transparent;
      padding: 0 16px;
      cursor: pointer;
      &:not(.active):hover {
        color: #1c6fdb;
        border-color: #1c6fdb;
      }
      &.active {
        cursor: pointer;
        color: #fff;
        background: linear-gradient(180deg, #6521D7 0%, #BF49EB 100%);
        // box-shadow: 0px 4px 6px rgba(42, 47, 247, 0.8);
        border: none;
      }
      &.close {
        background: #fc5353;
        box-shadow: 0px 4px 6px rgba(247, 42, 42, 0.8);
      }
      &.disabled {
        color: #666;
        background: #ccc;
        border: none;
        cursor: default;
        &:hover {
          color: #666;
        }
      }
    }
    .button {
      width: 90px;
      height: 32px;
      line-height: 32px;
      background: #6521D7;
      border: 1px solid #6521D7;
      border-radius: 0px 4px 4px 0px;
      color: #ddd;
      font-size: 14px;
      text-align: center;
    }
    input {
      color:#6521D7;
      font-size: 18px;
      background-color: transparent;
      border: 1px solid #fff;
      border-radius: 4px;
      height: 32px;
      line-height: 32px;
      width: 200px;
      padding: 0 8px;
      &:focus {
        border: 1px solid #1d69de;
      }

      &::-webkit-input-placeholder {
        font-size: 14px;
        line-height: 32px;
        color: #888;
      }
    }
    .phone {
      display: flex;
      align-items: center;
      min-height: 35px;
      margin: 10px 0;
      img {
        width: 22px;
        height: 22px;
        margin-right: 12px;
      }
      p {
        flex: 1;
        height: 33px;
        line-height: 33px;
        font-size: 18px;
        font-weight: 400;
      }
    }
    .input_group {
      position: relative;
      input {
        float: left;
        width: 114px;
        border-color: #888;
        &:focus {
          border: 1px solid #1d69de;
        }
      }
      .button {
        float: left;
        margin-left: -4px;
        cursor: pointer;
      }
      &.disabled {
        .button {
          background: #888;
          border: 1px solid #888;
          font-size: 12px;
          cursor: default;
        }
      }
    }
  }
}
.user-content {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
  text-align: center;
  .user-sidebar {
    width: 190px;
    background: rgba(255, 255, 255, 0.6);
    // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    min-height: 612px;
    .pic {
      padding: 40px 0 10px 0;
    }
    .name {
      font-size: 14px;
      font-weight: 400;
      line-height: 30px;
    }
    li {
      margin: 6px 0;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      a {
        width: 100%;
        height: 40px;
        display: block;
        color: #333;
      }
      &.active,
      &:hover {
        a {
          color: #fff;
          font-weight: bold;
          background: linear-gradient(180deg, #6521D7 0%, #BF49EB 100%);
        }
      }
    }
  }
  .user-detail {
    margin-left: 12px;
    flex: 1;
    background: rgba(255, 255, 255, 0.6);
    // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    .user-info {
      .editbox {
        display: flex;
        align-items: stretch;
        justify-content: center;
        min-height: 540px;
      }

      .avatar {
        width: 400px;
        box-sizing: border-box;
        font-size: 0;

        display: flex;
        align-items: center;
        justify-content: flex-end;
        img {
          border-radius: 50%;
          &.active {
            border: 4px solid rgba(93, 43, 207, 0.8);
          }
        }
        .avatar_disp {
          position: relative;
          text-align: center;
          .border {
            border: 4px solid rgba(93, 43, 207, 0.8);
            position: relative;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            overflow: hidden;
            & > div {
              position: absolute;
              bottom: 0;
              text-align: center;
              width: 100%;
              height: 30px;
              z-index: 1;
              background: rgba(255, 255, 255, 0.7);
              color: #666;
              font-size: 14px;
              line-height: 30px;
              cursor: pointer;
              // display: none;
            }
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .avatar_form {
          display: none;
          padding-right: 10px;
          transition: all 0.2s linear 0s;
          overflow: hidden;
          img {
            cursor: pointer;
            margin: 8px 12px;
            float: right;
          }
          img:hover {
            background: linear-gradient(88deg, #6521D7 0%, #BF49EB 100%);
            box-shadow: 0px 2px 8px rgba(109, 73, 235, 0.3);
          }
        }

        &.edit {
          .avatar_form {
            display: block;
          }
          // .avatar_disp{
          //     .border{
          //         &>div{
          //             display: none;
          //         }
          //     }
          // }
        }
      }

      .line {
        flex: 1;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .base {
        text-align: left;
        width: 500px;
        color: #333;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .form {
          width: 100%;
          font-size: 24px;
          line-height: 30px;
          & > div {
            display: flex;
            align-items: center;
            margin: 20px 0;
            min-height: 35px;
            dd {
              min-height: 35px;
            }
            img {
              width: 22px;
              height: 22px;
              margin-right: 12px;
            }
            p {
              flex: 1;
              height: 33px;
              line-height: 33px;
              font-size: 18px;
              font-weight: 400;
              i {
                font-size: 14px;
                color: #999;
                font-style: normal;
                cursor: pointer;
                display: none;
              }
            }
            dd {
              display: none;
            }

            &.edit {
              & > p {
                display: none;
              }
              & > dd {
                display: block;
              }
            }
          }
        }
      }

      button {
        color: #bbb;
        height: 30px;
        line-height: 30px;
        border: 1px solid #ddd;
        border-radius: 20px;
        font-size: 14px;
        margin: 0 10px;
        background: transparent;
        padding: 0 16px;
        cursor: pointer;
        .icon {
          background-size: cover;
          display: inline-block;
          width: 16px;
          height: 16px;
          background-image: url("/images/edit_g.png");
          vertical-align: middle;
          margin-top: -2px;
        }
        &:not(.active):hover {
          color: #1c6fdb;
          border-color: #1c6fdb;
          .icon {
            background-image: url("/images/edit_b.png");
          }
        }
        &.active {
          cursor: pointer;
          color: #fff;
          background: linear-gradient(180deg, #6521D7 0%, #BF49EB 100%);
          // box-shadow: 0px 4px 6px rgba(42, 47, 247, 0.8);
          border: none;
        }
        &.disabled {
          color: #666;
          background: #ccc;
          border: none;
          cursor: default;
          &:hover {
            color: #666;
          }
        }
      }
      .button {
        width: 90px;
        height: 32px;
        line-height: 32px;
        background: #6521D7;
        border: 1px solid #6521D7;
        border-radius: 0px 4px 4px 0px;
        color: #ddd;
        font-size: 14px;
        text-align: center;
      }
      input {
        color: #333;
        font-size: 18px;
        background-color: transparent;
        border: 1px solid #ccc;
        border-radius: 4px;
        height: 32px;
        line-height: 32px;
        width: 200px;
        padding: 0 8px;
        &:focus {
          border: 1px solid #1d69de;
        }

        &::-webkit-input-placeholder {
          font-size: 14px;
          line-height: 32px;
          color: #888;
        }
      }

      .err {
        i {
          font-size: 16px;
        }
        color: #fc5353;
        height: 32px;
        font-size: 12px;
        line-height: 32px;
        text-align: left;
        flex: 1;
      }

      .input_group {
        position: relative;
        input {
          float: left;
          width: 114px;
          border-color: #888;
          &:focus {
            border: 1px solid #1d69de;
          }
        }
        .button {
          float: left;
          margin-left: -4px;
          cursor: pointer;
        }
        &.disabled {
          .button {
            background: #888;
            border: 1px solid #888;
            font-size: 12px;
            cursor: default;
          }
        }
      }

      span.edit {
        font-size: 14px;
        line-height: 21px;
        color: #888;
        font-weight: 400;
        cursor: pointer;
      }
      .centerbox {
        position: relative;
        display: inline-block;
        span {
          position: absolute;
          right: -48px;
          color: #888;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }

    .user-follow {
      .el-tabs__header {
        margin: 0;
      }
      .el-tabs__nav-scroll {
        padding: 10px 24px 0 24px;
      }
      .el-tabs__nav-wrap:after {
        background-color: transparent;
      }
      .el-tabs__nav .el-tabs__item a {
        font-size: 16px;
        line-height: 21px;
        color: #a1a1a1;
      }
      .el-tabs__item.is-active a {
        font-weight: bold;
        color: #6521D7;
        // text-shadow: -2.5px 4px 6px rgba(42, 47, 247, 0.8);
      }
      .el-tabs__nav .el-tabs__item a:hover {
        color: #fff;
      }
      .el-tabs__item.is-active a:hover {
        color: #6521D7;
      }
      .el-tabs__active-bar {
        display: none;
      }
    }

    &.modify {
      .avatar .avatar_disp .border {
        & > div {
          display: block;
        }
      }
      .base {
        .form {
          & > div {
            & > p {
              i {
                display: inline-block;
              }
            }
          }
        }
      }
    }
  }
}
</style>
