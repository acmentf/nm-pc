<!--
  功能：功能描述
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2020年12月11日 17:16:15
-->
<template>
  <div class="schedule-deail">
    <app-carousel></app-carousel>
    <Breadcrumb class="breadcrumb">
      <breadcrumb-item>联赛</breadcrumb-item>
    </Breadcrumb>
    <div class="detail-content">
      <!-- 赛事总览 -->
      <div class="schedule-session">
        <!-- 赛事图片 -->
        <div class="schedule-session-left flex">
          <div class="schedule-pic">
            <el-image :src="topDetail.tournament_logo" class="tournament-logo" fit="contain">
              <div slot="error" class="image-slot">
                <img src="/images/league_default.png" alt width="72" />
              </div>
            </el-image>
          </div>
          <div class="schedule-detail-info">
            <div class="schedule-name">
              <span>{{topDetail.tournament_name}}</span>
              <span class="schedule-status" v-if="topDetail.state_id===1">未开始</span>
              <span class="schedule-status ing" v-if="topDetail.state_id===2">进行中</span>
              <span class="schedule-status" v-if="topDetail.state_id===3">已结束</span>
            </div>
            <!-- 联赛基础数据 -->
            <div class="schedule-data flex">
              <span class="flex">
                <img src="/images/time.png" alt class="data-icon" />
                <div class="data-info">
                  <span class="title">赛季时间</span>
                  <p>{{topDetail.begin_time}}-{{topDetail.end_time}}</p>
                </div>
              </span>
              <span class="flex">
                <img src="/images/money.png" alt class="data-icon" />
                <div class="data-info">
                  <span class="title">赛事奖金</span>
                  <p>{{topDetail.bonus}}</p>
                </div>
              </span>
              <span class="flex">
                <img src="/images/zb.png" alt class="data-icon" />
                <div class="data-info">
                  <span class="title">举办地点</span>
                  <p>{{topDetail.match_address}}</p>
                </div>
              </span>
            </div>
          </div>
        </div>
        <!-- <div class="schedule-session-right">
          <app-follow game_id="LOL" type="competition" />
        </div>-->
      </div>
      <div class="team-session">
        <app-title title="战队数据" type="1" color="#333" />
        <div class="switch-wrapper">
          <el-switch
            v-model="isShow"
            active-color="#6521D7"
            inactive-color="#999"
            active-text="显示队员"
          ></el-switch>
        </div>
        <div class="team-content">
          <ul class="team-list" v-if="teamsList.length">
            <li
              class="team-item cursor-pointer"
              v-for="(item,index) in teamsList"
              :key="index"
              @mouseenter="focusIndex = index"
              @mouseleave="focusIndex = -1"
              :class="focusIndex === index && !isShow?'avticed':''"
            >
              <div class="team-fm">
                <div class="team-fm-content flex">
                  <div class="team-pic">
                    <el-image :src="item.team_img" fit="contain">
                      <div slot="error" class="image-slot">
                        <img src="/images/team_default.png" alt width="72" />
                      </div>
                    </el-image>
                  </div>
                </div>
                <div class="position-info" v-show="isShow || focusIndex === index">
                  <div class="team-detail">
                    <p v-for="(_item,_index) in item.team_member" :key="_index">
                      <span v-if="game_id !== 'CSGO' && _item.position !==0">{{_item.position_str}}:</span>
                      {{_item.player_name}}
                    </p>
                  </div>
                </div>
              </div>
              <div class="team-name-box">
                  <p class="team-name">{{item.team_name}}</p>
              </div>
            </li>
          </ul>
          <empty-img
            class="defaultBox"
            v-else
            width="300px"
            height="300px"
            src="/images/follow_null.png"
          >暂无数据</empty-img>
        </div>
      </div>
      <!-- 数据统计 -->
      <div class="data-session">
        <app-title title="数据统计" type="1" color="#333" />
        <ul class="data-tabs flex">
          <li
            class="flex"
            v-for="(item,index) in tabs"
            :key="index"
            :class="item.id===tabsIndex?'actived':''"
            @click="tabChange(item.id)"
          >{{item.title}}</li>
        </ul>
        <!-- // 1战队 2 选手 3 英雄 4 地图 -->
        <div class="data-table" v-if="game_id==='CSGO'">
          <el-table :data="tableData" style="width: 100%" v-show="tabsIndex===1">
            <template slot="empty">
              <defaultBox
                style="padding:10px"
                width="260px"
                height="260px"
                src="/images/battle_details.png"
              >暂无数据</defaultBox>
            </template>
            <el-table-column prop="level" label="排名" align="right" width="50">
              <template slot-scope="scope">
                <table-ranking :ranking="scope.$index+1" />
              </template>
            </el-table-column>
            <el-table-column prop="level" label="队名" class-name="nowrap">
              <template slot-scope="scope">
                <div class="hero-icon">
                  <el-image :src="scope.row.TeamIcon" fit="contain">
                    <div slot="error" class="image-slot">
                      <img src="/images/team_default.png" alt width="24" />
                    </div>
                  </el-image>
                  <span>{{scope.row.TeamName}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="胜率" align="left">
              <template slot-scope="scope">
                <span>{{scope.row.WinRate}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="kda" label="K/D" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.KD}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="GunRate" label="手枪局胜率" align="center" sortable width="120">
              <template slot-scope="scope">
                <span>{{scope.row.GunRate}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="HeadRate" label="爆头率" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.HeadRate}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="AvgKill" label="场均击杀" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.AvgKill}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="AvgDie" label="场均死亡" align="center" sortable></el-table-column>
            <el-table-column prop="AvgAssists" label="场均助攻" align="center" sortable></el-table-column>
            <el-table-column prop="TotalKill" label="总击杀" align="center" sortable></el-table-column>
            <el-table-column prop="TotalDie" label="总死亡" align="center" sortable></el-table-column>
            <el-table-column prop="TotalAssists" label="总助攻" align="center" sortable></el-table-column>
          </el-table>
          <el-table :data="tableData" style="width: 100%" v-show="tabsIndex===4">
            <template slot="empty">
              <defaultBox
                style="padding:10px"
                width="260px"
                height="260px"
                src="/images/battle_details.png"
              >暂无数据</defaultBox>
            </template>
            <el-table-column prop="level" label="排名" align="center" width="50">
              <template slot-scope="scope">
                <table-ranking :ranking="scope.$index+1" />
              </template>
            </el-table-column>
            <el-table-column prop="name" label="地图名" align="left">
              <template slot-scope="scope">
                <div class="hero-icon">
                  <el-image :src="scope.row.map_cover" fit="contain">
                    <div slot="error" class="image-slot">
                      <img src="/images/team_default.png" alt width="24" />
                    </div>
                  </el-image>
                  <span>{{scope.row.name}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="use_times" label="使用次数" align="center" sortable></el-table-column>
            <el-table-column prop="overtime_times" label="总回合数" align="center" sortable></el-table-column>
            <el-table-column prop="total_rounds" label="加时赛次数" align="center" sortable></el-table-column>
            <el-table-column prop="t_win_rate" label="T胜率" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.t_win_rate}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="ct_win_rate" label="CT胜率" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.ct_win_rate}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="avg_round" label="场均回合" align="center" sortable></el-table-column>
          </el-table>
          <el-table :data="tableData" style="width: 100%" v-show="tabsIndex===2">
            <template slot="empty">
              <defaultBox
                style="padding:10px"
                width="260px"
                height="260px"
                src="/images/battle_details.png"
              >暂无数据</defaultBox>
            </template>
            <el-table-column prop="level" label="排名" align="right" width="50">
              <template slot-scope="scope">
                <table-ranking :ranking="scope.$index+1" />
              </template>
            </el-table-column>
            <el-table-column prop="name" label="选手名" align="left">
              <template slot-scope="scope">
                <div class="hero-icon">
                  <el-image :src="scope.row.PlayerIcon" fit="contain">
                    <div slot="error" class="image-slot">
                      <img src="/images/hero_default.png" alt width="24" />
                    </div>
                  </el-image>
                  <span>{{scope.row.PlayerName}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="WinRate" label="胜率" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.WinRate}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="KD" label="K/D" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.KD}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="HeadRate" label="爆头率" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.HeadRate}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="KAST" label="KAST" align="center" sortable></el-table-column>
            <el-table-column prop="ADR" label="ADR" align="center" sortable></el-table-column>
            <el-table-column prop="TotalAssists" label="总助攻" align="center" sortable></el-table-column>
            <el-table-column prop="FirstKillPM" label="首杀" align="center" sortable></el-table-column>
            <el-table-column prop="AwpKillPM" label="awp击杀" align="center" sortable></el-table-column>
          </el-table>
        </div>
        <div class="data-table" v-if="game_id ==='LOL'">
          <!-- 战队榜 -->
          <el-table :data="tableData" style="width: 100%;" v-show="tabsIndex===1">
            <template slot="empty">
              <defaultBox
                style="padding:10px"
                width="260px"
                height="260px"
                src="/images/battle_details.png"
              >暂无数据</defaultBox>
            </template>
            <el-table-column prop="level" label="排名" align="center" width="50">
              <template slot-scope="scope">
                <table-ranking :ranking="scope.$index+1" />
              </template>
            </el-table-column>
            <el-table-column label="队名" align="left">
              <template slot-scope="scope">
                <div class="hero-icon">
                  <el-image :src="scope.row.TeamIcon" fit="contain">
                    <div slot="error" class="image-slot">
                      <img src="/images/team_default.png" alt width="24" />
                    </div>
                  </el-image>
                  <span>{{scope.row.TeamName}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="KDA" align="center" sortable>
              <template slot-scope="scope">
                <div class="kad">{{scope.row.KDA}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="WinRate" label="胜率" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.WinRate}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="AvgKill" label="场均击杀" align="center" sortable width="100">
              <template slot-scope="scope">
                <span>{{scope.row.AvgKill}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="AvgDie" label="场均死亡" align="center" sortable width="100">
              <template slot-scope="scope">
                <span>{{scope.row.AvgDie}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WinRate" label="分均输出" align="center" sortable width="100">
              <template slot-scope="scope">
                <span>{{scope.row.WinRate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="AttackPM" label="分均经济" align="center" sortable width="100">
              <template slot-scope="scope">
                <span>{{scope.row.AttackPM}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="SoldiersPM" label="分均补刀" align="center" sortable width="100">
              <template slot-scope="scope">
                <span>{{scope.row.SoldiersPM}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="FBloodRate" label="一血率" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.FBloodRate}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="FTowerRate" label="一塔率" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.FTowerRate}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="FSDragonRate" label="首小龙率" align="center" sortable width="100">
              <template slot-scope="scope">
                <span>{{scope.row.FSDragonRate}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="FBDragonRate" label="首大龙率" align="center" sortable width="100">
              <template slot-scope="scope">
                <span>{{scope.row.FBDragonRate}}%</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- 英雄榜 -->
          <el-table :data="tableData" style="width: 100%" v-show="tabsIndex===3">
            <template slot="empty">
              <defaultBox
                style="padding:10px"
                width="260px"
                height="260px"
                src="/images/battle_details.png"
              >暂无数据</defaultBox>
            </template>
            <el-table-column label="排名" align="right" width="50">
              <template slot-scope="scope">
                <table-ranking :ranking="scope.$index+1" />
              </template>
            </el-table-column>
            <el-table-column label="英雄名" align="left">
              <template slot-scope="scope">
                <div class="hero-icon">
                  <el-image :src="scope.row.HeroIcon" fit="contain">
                    <div slot="error" class="image-slot">
                      <img src="/images/hero_default.png" alt width="24" />
                    </div>
                  </el-image>
                  <span>{{scope.row.HeroName}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="Enter" label="出场次数" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.Enter}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="EnterRate" label="出场率" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.EnterRate}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="WinNum" label="胜场" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.WinNum}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WinRate" label="胜率" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.WinRate}}%</span>
              </template>
            </el-table-column>

            <el-table-column prop="DisableNum" label="禁用次数" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.DisableNum}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="DisableRate" label="禁用率" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.DisableRate}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="BPRate" label="BP率" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.BPRate}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="KDA" label="KDA" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.KDA}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="frist_blood" label="一血率" align="center" sortable></el-table-column>
            <el-table-column prop="frist_tower" label="一塔率" align="center" sortable></el-table-column>
            <el-table-column prop="five" label="五杀率" align="center" sortable></el-table-column>
            <el-table-column prop="ten" label="十杀率" align="center" sortable></el-table-column>-->
          </el-table>
          <!-- 选手榜 -->
          <el-table
            :data="tableData.filter(item=> position_lol == '' || item.position == position_lol)"
            style="width: 100%"
            v-show="tabsIndex===2"
          >
            <template slot="empty">
              <defaultBox
                style="padding:10px"
                width="260px"
                height="260px"
                src="/images/battle_details.png"
              >暂无数据</defaultBox>
            </template>
            <el-table-column prop="level" label="排名" align="right" width="50">
              <template slot-scope="scope">
                <table-ranking :ranking="scope.$index+1" />
              </template>
            </el-table-column>
            <!-- 自定义表头 -->
            <el-table-column align="left" width="150">
              <template slot="header" slot-scope="scope">
                <div class="custom-header">
                  <span>选手名</span>
                  <table-select
                    style="width:80px;margin-left:8px"
                    v-model="position_lol"
                    :options="options_lol"
                  ></table-select>
                </div>
              </template>
              <template slot-scope="scope">
                <div class="hero-icon">
                  <el-image :src="scope.row.PlayerIcon" fit="contain">
                    <div slot="error" class="image-slot">
                      <img src="/images/player_default.png" alt width="24" />
                    </div>
                  </el-image>
                  <span>{{scope.row.PlayerName}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="Appearances" label="出场次数" align="center" sortable width="100">
              <template slot-scope="scope">
                <span>{{scope.row.Enter}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="KDA" label="KDA" align="center" sortable width="80">
              <template slot-scope="scope">
                <div class="kda">{{scope.row.KDA}}</div>
              </template>
            </el-table-column>

            <el-table-column prop="AvgGroupRate" label="参团率" align="center" sortable width="90">
              <template slot-scope="scope">
                <div>{{scope.row.AvgGroupRate}}%</div>
              </template>
            </el-table-column>
            <el-table-column prop="AvgKill" label="场均击杀" align="center" sortable width="100">
              <template slot-scope="scope">
                <span>{{scope.row.AvgKill}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="win" label="场均助攻" align="center" sortable></el-table-column> -->
            <el-table-column prop="AVGDie" label="场均死亡" align="center" sortable width="100">
              <template slot-scope="scope">
                <span>{{scope.row.AVGDie}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="GPM" label="GPM" align="center" sortable width="80">
              <template slot-scope="scope">
                <span>{{scope.row.GPM}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="EconomyRate" label="经济占比" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.EconomyRate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="AttackPM" label="每分钟输出" align="center" sortable width="115">
              <template slot-scope="scope">
                <span>{{scope.row.AttackPM}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="BearPM" label="每分钟承伤" align="center" sortable width="115">
              <template slot-scope="scope">
                <span>{{scope.row.BearPM}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="SoldiersPM" label="每分钟补刀" align="center" sortable width="115">
              <template slot-scope="scope">
                <span>{{scope.row.SoldiersPM}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="data-table" v-if="game_id ==='DOTA2'">
          <el-table :data="tableData" style="width: 100%" v-show="tabsIndex===1">
            <template slot="empty">
              <defaultBox
                style="padding:10px"
                width="260px"
                height="260px"
                src="/images/battle_details.png"
              >暂无数据</defaultBox>
            </template>
            <el-table-column prop="level" label="排名" align="right" width="50">
              <template slot-scope="scope">
                <table-ranking :ranking="scope.$index+1" />
              </template>
            </el-table-column>
            <el-table-column prop="level" label="队名" align="left">
              <template slot-scope="scope">
                <div class="hero-icon">
                  <el-image :src="scope.row.TeamIcon" fit="contain">
                    <div slot="error" class="image-slot">
                      <img src="/images/team_default.png" alt width="24" />
                    </div>
                  </el-image>
                  <span>{{scope.row.TeamName}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="KDA" label="KDA" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.KDA}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WinRate" label="胜率" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.WinRate}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="AvgKill" label="场均击杀" align="center" sortable width="100">
              <template slot-scope="scope">
                <span>{{scope.row.AvgKill}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="AvgDie" label="场均死亡" align="center" sortable width="100">
              <template slot-scope="scope">
                <span>{{scope.row.AvgDie}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="GPM" label="分均经济" align="center" sortable width="100">
              <template slot-scope="scope">
                <span>{{scope.row.GPM}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="SoldiersPM" label="分均正补" align="center" sortable width="100">
              <template slot-scope="scope">
                <span>{{scope.row.SoldiersPM}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="FBloodRate" label="一血率" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.FBloodRate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="FTowerRate" label="一塔率" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.FTowerRate}}%</span>
              </template>
            </el-table-column>

            <el-table-column prop="FRoshan" label="首肉山率" align="center" sortable width="100">
              <template slot-scope="scope">
                <span>{{scope.row.FRoshan}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="AVGAttack" label="场均伤害" align="center" sortable width="100">
              <template slot-scope="scope">
                <span>{{scope.row.AVGAttack}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="tableData" style="width: 100%" v-show="tabsIndex===3">
            <template slot="empty">
              <defaultBox
                style="padding:10px"
                width="260px"
                height="260px"
                src="/images/battle_details.png"
              >暂无数据</defaultBox>
            </template>
            <el-table-column prop="level" label="排名" align="right" width="50">
              <template slot-scope="scope">
                <table-ranking :ranking="scope.$index+1" />
              </template>
            </el-table-column>
            <el-table-column label="英雄名" align="left">
              <template slot-scope="scope">
                <div class="hero-icon">
                  <el-image :src="scope.row.HeroIcon" fit="contain">
                    <div slot="error" class="image-slot">
                      <img src="/images/hero_default.png" alt width="24" />
                    </div>
                  </el-image>
                  <span>{{scope.row.HeroName}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="Enter" label="出场次数" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.Enter}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="EnterRate" label="出场率" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.EnterRate}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="WinNum" label="胜场" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.WinNum}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WinRate" label="胜率" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.WinRate}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="DisableNum" label="禁用次数" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.DisableNum}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="DisableRate" label="禁用率" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.DisableRate}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="BPRate" label="BP率" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.BPRate}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="KDA" label="KDA" align="center" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.KDA}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-table
            :data="tableData.filter(item=> position_dota2 == '' || item.position == position_dota2)"
            style="width: 100%"
            v-show="tabsIndex===2"
          >
            <template slot="empty">
              <defaultBox
                style="padding:10px"
                width="260px"
                height="260px"
                src="/images/battle_details.png"
              >暂无数据</defaultBox>
            </template>
            <el-table-column prop="level" label="排名" align="right" width="65">
              <template slot-scope="scope">
                <table-ranking :ranking="scope.$index+1" />
              </template>
            </el-table-column>
            <el-table-column prop="name" label="选手名" align="left" width="150">
              <template slot="header">
                <div class="custom-header">
                  <span>选手名</span>
                  <table-select
                    style="width:80px;margin-left:8px"
                    v-model="position_dota2"
                    :options="options_dota2"
                  ></table-select>
                </div>
              </template>
              <template slot-scope="scope">
                <div class="hero-icon">
                  <el-image :src="scope.row.PlayerIcon" fit="contain">
                    <div slot="error" class="image-slot">
                      <img src="/images/player_default.png" alt width="24" />
                    </div>
                  </el-image>
                  <span>{{scope.row.PlayerName}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="Enter" label="出场次数" align="center" sortable width="100">
              <template slot-scope="scope">
                <span>{{scope.row.Enter}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="KDA" label="KDA" align="center" sortable width="80">
              <template slot-scope="scope">
                <span>{{scope.row.KDA}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="win" label="参团率" align="center" sortable width="90">
              <template slot-scope="scope">
                <span>{{scope.row.GroupRate}}%</span>
              </template>
            </el-table-column>
            <el-table-column prop="AvgKill" label="场均击杀" align="center" sortable width="100">
              <template slot-scope="scope">
                <span>{{scope.row.AvgKill}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="AvgDie" label="场均死亡" align="center" sortable width="100">
              <template slot-scope="scope">
                <span>{{scope.row.AvgDie}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="GPM" label="每分钟经济" align="center" sortable width="120">
              <template slot-scope="scope">
                <span>{{scope.row.GPM}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="XPM" label="每分钟经验" align="center" sortable width="120">
              <template slot-scope="scope">
                <span>{{scope.row.XPM}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="AttackPM" label="输出" align="center" sortable width="75">
              <template slot-scope="scope">
                <span>{{scope.row.AttackPM}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="BearPM" label="承伤" align="center" sortable width="75">
              <template slot-scope="scope">
                <span>{{scope.row.BearPM}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="SoldiersPM" label="每分钟补刀" align="center" sortable width="120">
              <template slot-scope="scope">
                <span>{{scope.row.SoldiersPM}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 赛事安排 -->
      <div class="schedule-plan" id="sample">
        <app-title title="赛事安排" type="1" color="#333" />
        <div
          id="myDiagramDiv"
          style="width:1200px; min-height:1000px;background:rgba(255, 255, 255, 0.6);overflow:hidden"
        v-show="pvp&& pvp.pmp_map&&pvp.pmp_map.length"
        ></div>
        <div v-show="!pvp || !pvp.pmp_map || !pvp.pmp_map.length">
          <defaultBox
            style="padding:10px"
            width="260px"
            height="260px"
            src="/images/battle_details.png"
          >暂无数据</defaultBox>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import defaultBox from "~/components/common/default";
import go from "gojs";
export default {
  layout: "home",
  name: "",
  components: { defaultBox },
  async asyncData({ query, store }) {
    let { game, tournament_id, type } = query;
    var game_id = game ? game.toUpperCase() : ""; // by FeikeQ
    // 1战队 2 选手 3 英雄 4 地图
    let tabs = [];
    if (game_id === "CSGO") {
      tabs = [
        { title: "战队榜", id: 1 },
        { title: "地图榜", id: 4 },
        { title: "选手榜", id: 2 }
      ];
    } else {
      tabs = [
        { title: "战队榜", id: 1 },
        { title: "英雄榜", id: 3 },
        { title: "选手榜", id: 2 }
      ];
    }
    store.dispatch("schedule/_setState", {
      game_id,
      tournament_id: Number(tournament_id)
    });

    let topDetail = await store.dispatch("schedule/_getScheduleDetailTop");
    let teamsList = await store.dispatch("schedule/_getTeamsDetail");

    let tableData = await store.dispatch(
      "schedule/_getTeamsTableList",
      type ? Number(type) : 1
    );
  
    return {
      tabs,
      game_id,
      teamsList,
      topDetail,
      tableData,
      tabsIndex: type ? Number(type) : 1,
      myDiagram: null,
    };
  },
  data() {
    return {
      pvp:{pmp_map:[]},
      topDetail: {},
      focusIndex: -1,
      teamList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      schedule_plan: [
        {
          level: 1,
          list: [{}, {}, {}, {}, {}, {}, {}, {}]
        },
        {
          level: 2,
          list: [{}, {}, {}, {}]
        },
        {
          level: 3,
          list: [{}, {}]
        },
        {
          level: 4,
          list: [{}]
        }
      ],
      test: {},
      tabs: [{ title: "战队榜" }, { title: "英雄榜" }, { title: "选手榜" }],
      isShow: false,
      options_dota2: [
        {
          value: "",
          label: "全部"
        },
        {
          value: 1,
          label: "一号位"
        },
        {
          value: 2,
          label: "二号位"
        },
        {
          value: 3,
          label: "三号位"
        },
        {
          value: 4,
          label: "四号位"
        },
        {
          value: 5,
          label: "五号位"
        }
      ],
      position_lol: "",
      options_lol: [
        {
          value: "",
          label: "全部"
        },
        {
          value: 1,
          label: "ADC"
        },
        {
          value: 2,
          label: "中单"
        },
        {
          value: 3,
          label: "上单"
        },
        {
          value: 4,
          label: "打野"
        },
        {
          value: 5,
          label: "辅助"
        }
      ],
      position_dota2: ""
    };
  },
  computed: {},
  watch: {},
  methods: {
    toSingleField(id, game, status) {
      //跳转单场详情
      if (!game) return;
      var _map = ["err", "notStarted", "processing", "over"];
      var _game = game.toLowerCase();
      var _url = {
        path: "/home/" + _game,
        query: { match_id: id }
      };
      if (_game !== "csgo") _url.path += "/" + _map[status];
      this.$router.push(_url);
    },
    async fetchData() {
      this.pvp = await this.$store.dispatch("schedule/_getLeagueResult");
      if (this.pvp) {
        console.log(this.pvp);
        let { pmp_map, list, count } = this.pvp;
        this.goInit(pmp_map, list, count);
      }
    },
    goInit(data, list, count) {
      let _that = this;
      if (window.goSamples) goSamples(); // init for these samples -- you don't need to call this
      var $ = go.GraphObject.make; // for conciseness in defining templates
      _that.myDiagram = $(
        go.Diagram,
        "myDiagramDiv", // create a Diagram for the DIV HTML element
        {
          initialContentAlignment: go.Spot.Center,
          initialPosition: new go.Point(100, 100),
          "textEditingTool.starting": go.TextEditingTool.SingleClick,
          //"textEditingTool.textValidation": isValidScore,
          "toolManager.mouseWheelBehavior": go.ToolManager.WheelNone,
          layout: $(go.TreeLayout, { angle: 180, layerSpacing: 80 }),
          "undoManager.isEnabled": true,
          allowHorizontalScroll: true,
          allowVerticalScroll: true,
          "dragSelectingTool.isEnabled": true,
          autoScale: go.Diagram.Uniform,
          padding: 20,
          scale: 1,
          minScale: 1,
          maxScale: 2.0,
          isReadOnly: true // 只读
        }
      );

      // 定义简单节点模板
      _that.myDiagram.nodeTemplate = $(
        go.Node,
        "Auto",
        { selectable: false },
        $(
          go.Shape,
          "Rectangle",
          { fill: "rgba(102, 102, 102, 0.1)", stroke: null },
          // Shape.fill is bound to Node.data.color
          new go.Binding("fill", "color"),
          {
            click: function (e, obj) {
              // 双击事件
              if (window.jsInterface) {
                window.jsInterface.goDetail(obj.part.data.match_id);
              } else {
                _that.toSingleField(obj.part.data.match_id,obj.part.data.game_id,obj.part.data.match_state);
              }
            }
          }
        ),
        $(
          go.Panel,
          "Table",
          $(go.RowColumnDefinition, { column: 0, separatorStroke: "#0F1E45" }),
          // $(go.RowColumnDefinition, {
          //   column: 1,
          //   separatorStroke: "#0F1E45",
          //   background: "#BABABA"
          // }),
          // $(go.RowColumnDefinition, { row: 0, separatorStroke: "#0F1E45" }),
          // $(go.RowColumnDefinition, { row: 1, separatorStroke: "#0F1E45" }),
          $(
            go.Picture,
            {
              column: 0,
              row: 0,
              margin: new go.Margin(6, 12, 8, 16),
              width: 28,
              height: 28
            },
            // Picture.source is data bound to the "source" attribute of the model data
            new go.Binding("source", "teama_logo")//
          ),
          $(
            go.Picture,
            // Pictures should normally have an explicit width and height.
            // This picture has a red background, only visible when there is no source set
            // or when the image is partially transparent.
            {
              column: 0,
              row: 1,
              margin: new go.Margin(6, 12, 8, 16),
              width: 28,
              height: 28
            },
            // Picture.source is data bound to the "source" attribute of the model data
            new go.Binding("source", "teamb_logo")//
          ),
          $(
            go.TextBlock,
            "",
            {
              row: 0,
              column: 1,
              wrap: go.TextBlock.None,
              margin: 6,
              width: 80,
              isMultiline: false,
              textAlign: "left",
              font: "bold 12px  Segoe UI,sans-serif",
              stroke: "#33C6D6"
            },
            new go.Binding("text", "teama_name").makeTwoWay()
          ),
          $(
            go.TextBlock,
            "",
            {
              row: 1,
              wrap: go.TextBlock.None,
              column: 1,
              margin: 5,
              width: 80,
              isMultiline: false,
              textAlign: "left",
              font: "bold 11px  Segoe UI,sans-serif",
              stroke: "#F05365"
            },
            new go.Binding("text", "teamb_name").makeTwoWay()
          ),
          $(
            go.TextBlock,
            "",
            {
              column: 2,
              row: 0,
              wrap: go.TextBlock.None,
              margin: 8,
              width: 25,
              isMultiline: false,
              editable: true,
              textAlign: "left",

              font: "bold 11px  Segoe UI,sans-serif",
              stroke: "#33C6D6"
            },
            new go.Binding("text", "teama_score").makeTwoWay()
          ),
          $(
            go.TextBlock,
            "",
            {
              column: 2,
              row: 1,
              wrap: go.TextBlock.None,
              margin: 8,
              width: 25,
              isMultiline: false,
              editable: true,
              textAlign: "left",
              font: "bold 11px  Segoe UI,sans-serif ",
              stroke: "#EB47B1"
            },
            new go.Binding("text", "teamb_score").makeTwoWay()
          ),
          $(
            go.Panel,
            "Horizontal",
            {
              margin: 4,
              column: 0,
              row: 3,
              columnSpan: 3,
              height: 32,
              background: "#ccc",
              width: 192
            },
            $(
              go.TextBlock,
              "",
              {
                margin: new go.Margin(0, 0, 0, 16),
                stroke: "#333",
                font: "12px  Segoe UI,sans-serif "
              },
              new go.Binding("text", "start_time").makeTwoWay()
            ),
            $(
              go.TextBlock,
              "",
              {
                margin: new go.Margin(0, 16, 0, 36),
                stroke: "#333",
                font: "12px  Segoe UI,sans-serif "
              },
              new go.Binding("text", "sz").makeTwoWay()
            )
          )
        )
      );
      // define the Link template
      _that.myDiagram.linkTemplate = $(
        go.Link,
        {
          routing: go.Link.Orthogonal,
          selectable: false
        },
        $(go.Shape, { strokeWidth: 1, stroke: "#5D2BCF" })
      );
      
      // 更具数据级级定义晋级图的提示信息显示面板
      //胜者组

      list.listW.forEach((item, index) => {
        _that.myDiagram.add(
          $(
            go.Part,
            {
              // background: "lightgreen",
              location: new go.Point(280 * index, -30)
            },
            $(
              go.Panel,
              "Vertical",
              {
                margin: 0,
                width: 192
              },
              $(go.TextBlock, item.name, {
                margin: new go.Margin(0, 0, 0, 0),
                stroke: "#666",
                font: "18px  Segoe UI,sans-serif ",
                textAlign: "center",
                width: 192
              })
            )
          )
        );
      });
      list.listL.forEach((item, index) => {
        console.log('count',count);
        _that.myDiagram.add(
          $(
            go.Part,
            {
              // background: "lightgreen",
              location: new go.Point(280 * index, count * 140)
            },
            $(
              go.Panel,
              "Vertical",
              {
                margin: 0,
                width: 192
              },
              $(go.TextBlock, item.name, {
                margin: new go.Margin(0, 0, 0, 0),
                stroke: "#666",
                font: "18px  Segoe UI,sans-serif ",
                textAlign: "center",
                width: 192
              })
            )
          )
        );
      });

      var myModel = $(go.TreeModel);
      myModel.nodeDataArray =  data;
      _that.myDiagram.model = myModel;
    },
    async tabChange(tabsIndex) {
      this.tabsIndex = tabsIndex;
      this.tableData = await this.$store.dispatch(
        "schedule/_getTeamsTableList",
        tabsIndex
      );
    }
  },
  created() {
    this.fetchData();
  },
  mounted() {
    // this.goInit();
  }
};
</script>
<style lang='less' >
.schedule-deail {
  .el-switch__label {
    color: #666;
  }
  overflow: hidden;
  color: #666;
  .breadcrumb {
    padding: 20px 0;
  }
  .detail-content {
    .schedule-session {
      height: 112px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.6);
      box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
      padding-right: 12px;
      padding-left: 33px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .schedule-pic {
        width: 156px;
        height: 72px;
        margin-right: 20px;
        overflow: hidden;
        .tournament-logo {
          width: 156px;
          height: 72px;
        }
      }
      .schedule-name {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
        color: #333;
        display: flex;
        align-items: center;
        .schedule-status {
          width: 54px;
          height: 18px;
          text-align: center;
          line-height: 18px;
          background: #808080;
          opacity: 1;
          border-radius: 4px;
          font-size: 12px;
          margin-left: 12px;
          &.ing {
            color: #fff;
            background: linear-gradient(90deg, #f9a262 0%, #ff3f50 100%);
          }
        }
      }
      .schedule-data {
        & > span {
          margin-right: 36px;
          .data-info {
            font-size: 12px;
            .title {
              font-size: 14px;
            }
          }
          .data-icon {
            width: 30px;
            height: 30px;
            margin-right: 8px;
          }
        }
      }
    }
    .team-session {
      margin: 20px 0;
      .switch-wrapper {
        text-align: right;
      }
      .team-content {
        margin-top: 20px;
        .team-list {
          display: flex;
          flex-wrap: wrap;
          & > li {
            width: 190px;
            height: 160px;
            margin-right: 12px;
            margin-bottom: 20px;
            border: 1px solid transparent;
            overflow: hidden;
            position: relative;
            border-radius: 4px;
            &.avticed {
              border: 1px solid #1c5cb2;
            }
            &:nth-child(6n) {
              margin-right: 0px;
            }
            .team-pic {
              width: 72px;
              height: 80px;
              margin: 0 auto;
              text-align: center;
            }
            height: 160px;
            & > .team-fm {
              width: 190px;
              height: 120px;
              position: relative;
              background: rgba(255, 255, 255, 0.6);
              .team-fm-content {
                display: flex;
                height: 100%;
              }
              .position-info {
                height: 100%;
                width: 100%;
                top:0;left: 0;
                position: absolute;
                background: rgba(255, 255, 255, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                .team-detail {
                  font-size: 12px;
                  font-weight: bold;
                  & > p {
                    color: #333;
                    width: 188px;
                    padding: 0 10px;
                    margin-bottom: 4px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    &:last-child {
                      margin-bottom: 0px;
                    }
                  }
                }
              }
            }
            & > .team-name-box {
              background:rgba(101, 33, 215, 0.6);
              height: 40px;
              .team-name {
                line-height: 40px;
                  font-size: 14px;
                  color: #fff;
                  font-weight: bold;
                  text-align: center;
                }
            }
            & > .team-detail-wrapper {
            }
          }
        }
      }
    }
    .data-session {
      .data-tabs {
        & > li {
          width: 84px;
          height: 30px;
          border: 1px solid #858a98;
          margin: 20px 12px;
          border-radius: 4px;
          color: #858a98;
          &:hover {
            cursor: pointer;
          }
          &.actived {
            background: linear-gradient(180deg, #6521D7 0%, #BF49EB 100%);
            // box-shadow: 0px 3px 6px rgba(42, 47, 247, 0.8);
            color: #fff;
            border: 1px solid transparent;
            &:hover {
              cursor: text;
            }
          }
        }
      }
    }
    .schedule-plan {
      margin-top: 20px;
      .schedule-plan-list {
        display: flex;
        justify-items: center;
        align-items: center;
        & > div {
          margin-right: 120px;
          & > .schedule-plan-item {
            width: 200px;
            height: 120px;
            background: #ddd;
            font-size: 0;
            margin-bottom: 12px;
          }
          &.schedule-plan-2 {
            & > div {
              margin-bottom: 150px;
              &:last-child {
                margin-bottom: 0;
              }
            }
          }
          &.schedule-plan-3 {
            & > div {
              margin-bottom: 414px;
              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }
    }
  }
  th {
    padding-top: 15px;
  }
}

#myDiagramDiv {
  margin-top: 20px;
}
.kad {
  font-size: 14px;
  color: #fff;
  line-height: 19px;
}
.kad-info {
  font-size: 12px;
  color: #bbbbbb;
  line-height: 16px;
}
.hero-icon {
  display: flex;
  align-items: center;
  .el-image {
    width: 24px;
    display: flex;
  }
  img {
    width: 24px;
  }
  & > span {
    padding-left: 10px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.custom-header {
  display: flex;
}
</style>