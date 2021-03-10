<!--  -->
<template>
  <div class="detail-box">
    <div class="liveBroadcast">
      <div style="position: relative;margin-bottom:13px;width:100%;">
        <Breadcrumb>
          <breadcrumb-item>{{mnl.team_home.team_short_name}} VS {{mnl.team_away.team_short_name}}</breadcrumb-item>
        </Breadcrumb>
        <app-follow
          type="match"
          game_id="LOL"
          style="position: absolute; top:0px; right:0;"
          :ids="mnl.match_id"
        />
      </div>
      <div style="margin-bottom:12px" class="live-box">
        <!-- 比赛未开始（开始倒计时） -->
        <not-started :startTime="mnl.match_time*1000"></not-started>
        <div class="log-box">
          <div class="centent_box">
            <div class="centent_box_title">
              <span
                class="gameName"
                style="color:#33C6D6;text-align:right;"
              >{{mnl.team_home.team_short_name}}</span>
              <el-image
                :src="mnl.team_home.team_img"
                fit="contain"
                style="margin:0 12px 0 20px;width:30px;"
              >
                <div slot="error" class="image-slot">
                  <img src="/images/team_default.png" alt width="30" />
                </div>
              </el-image>
              <span class="vs">vs</span>
              <el-image
                :src="mnl.team_away.team_img"
                fit="contain"
                style="margin:0 12px 0 20px;width:30px;"
              >
                <div slot="error" class="image-slot">
                  <img src="/images/team_default.png" alt width="30" />
                </div>
              </el-image>
              <span class="gameName" style="color: #F05365;">{{mnl.team_away.team_short_name}}</span>
            </div>
            <h1 class="notstart">未开始</h1>
          </div>
        </div>
      </div>
      <app-title style="margin:66px 0 24px 0" title="选手阵容" type="1" color="#333" />
      <div class="lineUp-box">
        <div v-if="position_list.length" class="lineUp">
          <ul>
            <li
              v-for="(item,index) in position_list"
              :key="index"
              :class="actived === item.position ? 'sessionActive':''"
              @click="changePlayer(index,item.position)"
            >{{item.position_name}}</li>
          </ul>
          <span v-if="player_detail">
            <div class="handler">
              <span>近&nbsp;&nbsp;</span>
              <table-select
                style="width:80px;margin-left:8px"
                v-model="positionSelect"
                :options="selectVal"
                @change="positionChange"
              ></table-select>
              <span>&nbsp;&nbsp;场</span>
            </div>
            <div class="player-box">
              <div class="player-info">
                <div style="margin-right:40px;">
                  <h6 class="titleHero">常用英雄</h6>
                  <div
                    style="display: inline-block;margin-left:20px;text-align:center;"
                    v-for="(item,index) in player_detail.role_history.player_home.slice(0,3)"
                    :key="index"
                  >
                    <img
                      height="44px"
                      :src="item.role_img_url"
                      alt="hero"
                      style="margin-bottom:8px;"
                    />
                    <p>
                      {{item.win}}/
                      <font color="#888888">{{item.enter}}</font>
                    </p>
                  </div>
                </div>
                <div class="charts-box">
                  <h1 class="charts-title">
                    <span class="name">{{player_detail.player_base.player_home.player_name}}</span>
                    <div class="line" style="border-bottom: 4px solid #33C6D6;"></div>
                  </h1>
                  <div class="pie-wrapper">
                    <el-image
                      :src="player_detail.player_base.player_home.player_logo"
                      fit="contain"
                      class="playerImg"
                      style="width:105px;"
                    >
                      <div slot="error" class="image-slot">
                        <img src="/images/player_default.png" alt width="105" />
                      </div>
                    </el-image>
                    <pie
                      width="140"
                      height="140"
                      type="1"
                      :rate="player_detail.player_base.player_home.win_rate"
                    />
                  </div>

                  <div class="data-box" style="text-align:center;">
                    <h4 class="textStyle">胜率</h4>
                    <div class="dataCentent">
                      <img width="20px" height="20px" src="/images/victory_b.png" alt="victory_b" />
                      <div
                        style="display: inline-block;padding: 0 20px 0 12px"
                      >{{player_detail.player_base.player_home.win}}</div>
                      <img width="20px" height="20px" src="/images/time123.png" alt="time123" />
                      <div
                        style="display: inline-block; padding: 0 20px 0 12px"
                      >{{player_detail.player_base.player_home.lost}}</div>
                      <div
                        class="dataText"
                        style="color: #33C6D6;"
                      >{{player_detail.player_base.player_home.win_rate}}%</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="player-chart">
                <div class="radar-chart" ref="ability"></div>
              </div>
              <div class="player-info">
                <div class="charts-box">
                  <h1 class="charts-title">
                    <span class="name">{{player_detail.player_base.player_away.player_name}}</span>
                    <div class="line" style="border-bottom: 4px solid #F05365;"></div>
                  </h1>
                  <div class="pie-wrapper">
                    <el-image
                      :src="player_detail.player_base.player_away.player_logo"
                      fit="contain"
                      class="playerImg"
                      style="width:105px;"
                    >
                      <div slot="error" class="image-slot">
                        <img src="/images/player_default.png" alt width="105" />
                      </div>
                    </el-image>
                    <pie
                      width="140"
                      height="140"
                      :rate="player_detail.player_base.player_away.win_rate"
                    />
                  </div>

                  <div class="data-box" style="text-align:center;">
                    <h4 class="textStyle">胜率</h4>
                    <div class="dataCentent">
                      <img width="20px" height="20px" src="/images/victory_b.png" alt="victory_b" />
                      <div
                        style="display: inline-block;padding: 0 20px 0 12px"
                      >{{player_detail.player_base.player_away.win}}</div>
                      <img width="20px" height="20px" src="/images/time123.png" alt="time123" />
                      <div
                        style="display: inline-block;padding: 0 20px 0 12px"
                      >{{player_detail.player_base.player_away.lost}}</div>
                      <div
                        class="dataText"
                        style="color: #F05365;"
                      >{{player_detail.player_base.player_away.win_rate}}%</div>
                    </div>
                  </div>
                </div>
                <div style="margin-left:40px;">
                  <h6 class="titleHero" style="text-align:left;">常用英雄</h6>
                  <div
                    style="display: inline-block;margin-right:20px;text-align:center;"
                    v-for="(item,index) in player_detail.role_history.player_away.slice(0,3)"
                    :key="index"
                  >
                    <img
                      width="44px"
                      height="44px"
                      :src="item.role_img_url"
                      alt="hero"
                      style="margin-bottom:8px;"
                    />
                    <p>
                      {{item.win}}/
                      <font color="#888888">{{item.enter}}</font>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="percentage-box">
              <div class="percentage" v-for="(item,index) in player_detail.stat_radar" :key="index">
                <row-bar :pramas="renderPramas(item)" :dw="item.type===1?'%':''">{{item.name}}</row-bar>
              </div>
            </div>
          </span>

          <defaultBox
            v-else
            style="margin-top:150px;"
            width="260px"
            height="260px"
            src="/images/follow_null.png"
          >暂无选手阵容</defaultBox>
        </div>
      </div>
      <app-title style="margin:66px 0 24px 0" title="历史交锋" type="1" color="#333" />
      <div class="history-box">
        <div class="history-left">
          <div v-if="true" class="centent">
            <div class="title-text">
              <img
                width="22px"
                height="22px"
                style="margin-right:6px;"
                src="/images/cup.png"
                alt="cup"
              />取得成绩
              <div class="select-wrapper">
                <span>近&nbsp;&nbsp;</span>
                <table-select
                  style="width:80px;margin-left:8px"
                  v-model="historySelect"
                  :options="selectVal"
                  @change="historyChange"
                ></table-select>
                <span>&nbsp;&nbsp;场</span>
              </div>
            </div>
            <div class="centent-table">
              <el-table
                :data="history_match_info"
                style="width: 100%;background: transparent;"
                height="538"
              >
                <el-table-column align="left" width="160">
                  <template slot="header" slot-scope="scope">
                    <div class="custom-header left">
                      <img
                        width="18px"
                        height="18px"
                        style
                        src="/images/game-icon.png"
                        alt="schedule"
                      /> 赛事
                    </div>
                  </template>
                  <template slot-scope="scope">
                    <span class="nowrap">{{scope.row.TtName}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="时间" align="left" width="105">
                  <template slot="header" slot-scope="scope">
                    <div class="custom-header left">
                      <img width="18px" height="18px" src="/images/time-icon.png" alt="time-icon" /> 时间
                    </div>
                  </template>
                  <template slot-scope="scope">
                    <span>{{scope.row.Time}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="比分" align="center">
                  <template slot="header" slot-scope="scope">
                    <div class="custom-header">
                      <img width="18px" height="18px" src="/images/strike.png" alt="strike" /> 比分
                    </div>
                  </template>
                  <template slot-scope="scope">
                    <div class="table-score">
                      <span class="home">{{scope.row.Win}}</span>
                      <span>-</span>
                      <span class="away">{{scope.row.Lost}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="先五杀" align="center" width="85">
                  <template slot="header" slot-scope="scope">
                    <div class="custom-header">
                      <img width="18px" height="18px" src="/images/pentaKill.png" alt="pentaKill" />先五杀
                    </div>
                  </template>
                  <template slot-scope="scope">
                    <div class="pic">
                      <img :src="scope.row.FiveKills" alt width="20" />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="时长" align="left">
                  <template slot="header" slot-scope="scope">
                    <div class="custom-header">
                      <img width="18px" height="18px" src="/images/duration.png" alt="duration" /> 时长
                    </div>
                  </template>
                  <template slot-scope="scope">
                    <span>{{scope.row.GameTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="一塔/首小龙" align="center" width="120">
                  <template slot="header" slot-scope="scope">
                    <div class="custom-header">
                      <img width="18px" height="18px" src="/images/snake.png" alt="duration" /> 一塔/首小龙
                    </div>
                  </template>
                  <template slot-scope="scope">
                    <div class="pic">
                      <img :src="scope.row.FirstTowers" alt width="20" />
                      <img :src="scope.row.FirstSmallD" alt width="20" />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="首大龙" align="center" width="85">
                  <template slot="header" slot-scope="scope">
                    <div class="custom-header">
                      <img width="18px" height="18px" src="/images/dalong.png" /> 首大龙
                    </div>
                  </template>
                  <template slot-scope="scope">
                    <div class="pic">
                      <img :src="scope.row.FirstBigD" alt width="20" />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="胜负" align="center">
                  <template slot="header" slot-scope="scope">
                    <div class="custom-header">
                      <img width="18px" height="18px" src="/images/win-icon.png" alt="win-icon" /> 胜负
                    </div>
                  </template>
                  <template slot-scope="scope">
                    <div class="pic">
                      <img :src="scope.row.WLImg" alt width="20" />
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <defaultBox
            v-else
            style="margin-top:120px;"
            width="260px"
            height="260px"
            src="/images/achieve_resuits.png"
          >暂无取得成绩</defaultBox>
        </div>
        <div class="history-right">
          <div v-if="true" class="centent">
            <div class="title-text">
              <img
                width="22px"
                height="22px"
                style="margin-right:6px;"
                src="/images/ranking.png"
                alt="data"
              />数据对比
            </div>
            <!-- {{mnl.team_home.team_short_name}} VS {{mnl.team_away.team_short_name}} -->
            <div class="centent_title">
              <span class="gameName" style="color: #33C6D6;">{{mnl.team_home.team_short_name}}</span>
              <img
                style="margin:0 20px 0 12px;"
                width="50px"
                height="50px"
                :src="mnl.team_home.team_img"
                alt="1"
              />
              <span class="vs">vs</span>
              <img
                style="margin:0 12px 0 20px;"
                width="50px"
                height="50px"
                :src="mnl.team_away.team_img"
                alt="4"
              />
              <span
                class="gameName"
                style="color: #F05365;text-align:left;"
              >{{mnl.team_away.team_short_name}}</span>
            </div>
            <div class="proportion-box">
              <div class="proportion">
                <span class="home">{{history_battle_gkd.team_home.win_rate.value}}%</span>
                <pie type="1" :rate="history_battle_gkd.team_home.win_rate.value" width="80" />
              </div>
              <div class="proportion">胜率</div>
              <div class="proportion">
                <span class="away">{{history_battle_gkd.team_away.win_rate.value}}%</span>
                <pie :rate="history_battle_gkd.team_away.win_rate.value" width="80" />
              </div>
            </div>
            <div class="score">
              <row-bar
                v-for="(item,index) in history_battle_gkd.history_gkd"
                :key="index"
                v-show="index"
                :pramas="{
                home: item.a_value,
                away: item.b_value,
              }"
              >{{item.name}}</row-bar>
            </div>
          </div>
          <defaultBox
            v-else
            style="margin-top:120px;"
            width="260px"
            height="260px"
            src="/images/follow_null.png"
          >暂无历史交锋</defaultBox>
        </div>
      </div>
      <app-title style="margin:66px 0 24px 0" title="近期数据统计" type="1" color="#333" />
      <div class="Statistics-box">
        <div class="handler">
          近&nbsp;&nbsp;
          <table-select
            style="width:80px;margin-left:8px"
            v-model="nearlySelect"
            :options="selectVal"
            @change="nearlySelectChange"
          ></table-select>&nbsp;&nbsp;场
        </div>

        <div v-if="nearlyData" class="Statistics">
          <div class="centent">
            <div class="centent-child">
              <h1 class="charts-title">
                <span class="name">{{nearlyData.team_home.team_short_name}}</span>
                <div class="line"></div>
              </h1>
              <div class="pie-wrapper">
                <el-image
                  class="playerImg"
                  :src="nearlyData.team_home.team_img"
                  fit="contain"
                  style="width:100px;"
                >
                  <div slot="error" class="image-slot">
                    <img src="/images/team_default.png" alt width="100" />
                  </div>
                </el-image>
                <pie type="1" width="140" height="140" :rate="nearlyData.team_home.win_rate.value"></pie>
              </div>

              <div class="data-box" style="text-align:center;">
                <h4 class="textStyle">胜率</h4>
                <div
                  class="dataText"
                  style="color: #33C6D6;"
                >{{nearlyData.team_home.win_rate.value}}%</div>
              </div>
            </div>
            <div class="center">
              <row-bar
                class="row-bar-colum"
                v-for="(item,index) in nearlyData.history_gkd"
                :key="index"
                :dw="item.type ==1 ?'%':''"
                :pramas="{
                 home: item.a_value,
                 away: item.b_value,
                 total: Number(item.a_value)+Number(item.b_value)
              }"
              >{{item.name}}</row-bar>
            </div>
            <div class="centent-child">
              <h1 class="charts-title">
                <span class="name">{{nearlyData.team_away.team_short_name}}</span>
                <div class="line red"></div>
              </h1>
              <div class="pie-wrapper">
                <el-image
                  :src="nearlyData.team_away.team_img"
                  class="playerImg"
                  fit="contain"
                  style="width:100px;"
                >
                  <div slot="error" class="image-slot">
                    <img src="/images/team_default.png" alt width="100" />
                  </div>
                </el-image>
                <pie width="140" height="140" :rate="nearlyData.team_away.win_rate.value"></pie>
              </div>
              <div class="data-box" style="text-align:center;">
                <h4 class="textStyle">胜率</h4>
                <div
                  class="dataText"
                  style="color: #F05365;;"
                >{{nearlyData.team_away.win_rate.value}}%</div>
              </div>
            </div>
          </div>
        </div>
        <defaultBox
          v-else
          style="margin-top:50px;"
          width="200px"
          height="200px"
          src="/images/team_top_default.png"
        >暂无数据排行</defaultBox>
      </div>
      <app-title style="margin:66px 0 24px 0" title="近期对战数据" type="1" color="#333" />
      <div class="fight-box1">
        <div v-if="nearlyBatHomeData" class="centent">
          <div class="title-text">
            <h3>
              <el-image
                class="playerImg"
                :src="mnl.team_home.team_img"
                fit="contain"
                style="width:22px;"
              >
                <div slot="error" class="image-slot">
                  <img src="/images/team_default.png" alt width="22" />
                </div>
              </el-image>
              {{mnl.team_home.team_short_name}}
            </h3>
            <div class="select-wrapper">
              <span>近&nbsp;&nbsp;</span>
              <table-select
                style="width:80px;margin-left:8px"
                v-model="nearlyHomeSelect"
                :options="selectVal"
                @change="nearlyBatHomeChange"
              ></table-select>
              <span>&nbsp;&nbsp;场</span>
            </div>
          </div>
          <div class="centent-table">
            <el-table
              :data="nearlyBatHomeData"
              style="width: 100%;background: transparent;"
              height="450"
            >
              <template slot="empty">
                <defaultBox
                  style="padding:10px"
                  width="260px"
                  height="260px"
                  src="/images/battle_details.png"
                >暂无数据</defaultBox>
              </template>
              <el-table-column align="left" label="赛事" width="180">
                <template slot="header" slot-scope="scope">
                  <div class="custom-header l">
                    <img width="18px" height="18px" style src="/images/game-icon.png" alt="schedule" /> 赛事
                  </div>
                </template>
                <template slot-scope="scope">
                  <span class="l">{{scope.row.TtName}}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" label="对战战队">
                <template slot="header" slot-scope="scope">
                  <div class="custom-header left">
                    <img width="18px" height="18px" src="/images/time-icon.png" alt="time-icon" /> 对战战队
                  </div>
                </template>
                <template slot-scope="scope">
                  <div class="pic-wrapper">
                    <el-image
                      :src="scope.row.TeamImg"
                      class="team-pic"
                      fit="contain"
                      style="width:22px;height:22px"
                    >
                      <div slot="error" class="image-slot">
                        <img src="/images/team_default.png" alt width="22" />
                      </div>
                    </el-image>
                    <span>{{scope.row.TeamName}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="比分" align="center">
                <template slot="header" slot-scope="scope">
                  <div class="custom-header">
                    <img width="18px" height="18px" src="/images/strike.png" alt="strike" /> 比分
                  </div>
                </template>
                <template slot-scope="scope">
                  <div class="table-score vsoth">
                    <span class="home">{{scope.row.Win}}</span>
                    <span>-</span>
                    <span class="away">{{scope.row.Win}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="时长" align="center">
                <template slot="header" slot-scope="scope">
                  <div class="custom-header">
                    <img width="18px" height="18px" src="/images/duration.png" alt="duration" /> 时长
                  </div>
                </template>
                <template slot-scope="scope">
                  <span>{{scope.row.GameTime}}</span>
                </template>
              </el-table-column>
              <el-table-column label="一血/先五杀" align="center">
                <template slot="header" slot-scope="scope">
                  <div class="custom-header">
                    <img width="18px" height="18px" src="/images/snake.png" alt="duration" /> 一血/先五杀
                  </div>
                </template>
                <template slot-scope="scope">
                  <div class="pic">
                    <img :src="scope.row.FirstBlood" alt width="20" />
                    <img :src="scope.row.FiveKills" alt width="20" />
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="一塔/首小龙" align="center">
                <template slot="header" slot-scope="scope">
                  <div class="custom-header">
                    <img width="18px" height="18px" src="/images/snake.png" alt="duration" /> 一塔/首小龙
                  </div>
                </template>
                <template slot-scope="scope">
                  <div class="pic">
                    <img :src="scope.row.FirstTowers" alt width="20" />
                    <img :src="scope.row.FirstSmallD" alt width="20" />
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="首大龙" align="center">
                <template slot="header" slot-scope="scope">
                  <div class="custom-header">
                    <img width="18px" height="18px" src="/images/dalong.png" /> 首大龙
                  </div>
                </template>
                <template slot-scope="scope">
                  <div class="pic">
                    <img :src="scope.row.FirstBigD" alt width="20" />
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="十杀" align="center">
                <template slot="header" slot-scope="scope">
                  <div class="custom-header">
                    <img width="18px" height="18px" src="/images/dalong.png" /> 十杀
                  </div>
                </template>
                <template slot-scope="scope">
                  <div class="pic">
                    <img :src="scope.row.TenKills" alt width="20" />
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="胜负" align="center">
                <template slot="header" slot-scope="scope">
                  <div class="custom-header">
                    <img width="18px" height="18px" src="/images/win-icon.png" alt="win-icon" /> 胜负
                  </div>
                </template>
                <template slot-scope="scope">
                  <div class="pic">
                    <img :src="scope.row.WLImg" alt width="20" />
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="fight-box2">
        <div v-if="true" class="centent">
          <div class="title-text">
            <h3>
              <el-image
                class="playerImg"
                :src="mnl.team_away.team_img"
                fit="contain"
                style="width:22px;"
              >
                <div slot="error" class="image-slot">
                  <img src="/images/team_default.png" alt width="22" />
                </div>
              </el-image>
              {{mnl.team_away.team_short_name}}
            </h3>
            <div class="select-wrapper">
              <span>近&nbsp;&nbsp;</span>
              <table-select
                style="width:80px;margin-left:8px"
                v-model="nearlyAwaySelect"
                :options="selectVal"
                @change="nearlyBatAwayChange"
              ></table-select>
              <span>&nbsp;&nbsp;场</span>
            </div>
          </div>
          <div class="centent-table">
            <el-table
              :data="nearlyBatAwayData"
              style="width: 100%;background: transparent;"
              height="450"
            >
              <template slot="empty">
                <defaultBox
                  style="padding:10px"
                  width="260px"
                  height="260px"
                  src="/images/battle_details.png"
                >暂无数据</defaultBox>
              </template>
              <el-table-column align="left" label="赛事" width="180">
                <template slot="header" slot-scope="scope">
                  <div class="custom-header l">
                    <img width="18px" height="18px" style src="/images/game-icon.png" alt="schedule" /> 赛事
                  </div>
                </template>
                <template slot-scope="scope">
                  <span class="l">{{scope.row.TtName}}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" label="对战战队" width="100">
                <template slot="header" slot-scope="scope">
                  <div class="custom-header left">
                    <img width="18px" height="18px" src="/images/time-icon.png" alt="time-icon" /> 对战战队
                  </div>
                </template>
                <template slot-scope="scope">
                  <div class="pic-wrapper">
                    <el-image
                      :src="scope.row.TeamImg"
                      class="team-pic"
                      fit="contain"
                      style="width:22px;height:22px"
                    >
                      <div slot="error" class="image-slot">
                        <img src="/images/team_default.png" alt width="22" />
                      </div>
                    </el-image>
                    <span>{{scope.row.TeamName}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="比分" align="center">
                <template slot="header" slot-scope="scope">
                  <div class="custom-header">
                    <img width="18px" height="18px" src="/images/strike.png" alt="strike" /> 比分
                  </div>
                </template>
                <template slot-scope="scope">
                  <div class="table-score vsoth redawa">
                    <span class="home">{{scope.row.Win}}</span>
                    <span>-</span>
                    <span class="away">{{scope.row.Win}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="时长" align="center">
                <template slot="header" slot-scope="scope">
                  <div class="custom-header">
                    <img width="18px" height="18px" src="/images/duration.png" alt="duration" /> 时长
                  </div>
                </template>
                <template slot-scope="scope">
                  <span>{{scope.row.GameTime}}</span>
                </template>
              </el-table-column>
              <el-table-column label="一血/先五杀" align="center">
                <template slot="header" slot-scope="scope">
                  <div class="custom-header">
                    <img width="18px" height="18px" src="/images/snake.png" alt="duration" /> 一血/先五杀
                  </div>
                </template>
                <template slot-scope="scope">
                  <div class="pic">
                    <img :src="scope.row.FirstBlood" alt width="20" />
                    <img :src="scope.row.FiveKills" alt width="20" />
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="一塔/首小龙" align="center">
                <template slot="header" slot-scope="scope">
                  <div class="custom-header">
                    <img width="18px" height="18px" src="/images/snake.png" alt="duration" /> 一塔/首小龙
                  </div>
                </template>
                <template slot-scope="scope">
                  <div class="pic">
                    <img :src="scope.row.FirstTowers" alt width="20" />
                    <img :src="scope.row.FirstSmallD" alt width="20" />
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="首大龙" align="center">
                <template slot="header" slot-scope="scope">
                  <div class="custom-header">
                    <img width="18px" height="18px" src="/images/dalong.png" /> 首大龙
                  </div>
                </template>
                <template slot-scope="scope">
                  <div class="pic">
                    <img :src="scope.row.FirstBigD" alt width="20" />
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="十杀" align="center" width="80">
                <template slot="header" slot-scope="scope">
                  <div class="custom-header">
                    <img width="18px" height="18px" src="/images/dalong.png" /> 十杀
                  </div>
                </template>
                <template slot-scope="scope">
                  <div class="pic">
                    <img :src="scope.row.TenKills" alt width="20" />
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="胜负" align="center">
                <template slot="header" slot-scope="scope">
                  <div class="custom-header">
                    <img width="18px" height="18px" src="/images/win-icon.png" alt="win-icon" /> 胜负
                  </div>
                </template>
                <template slot-scope="scope">
                  <div class="pic">
                    <img :src="scope.row.WLImg" alt width="20" />
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import experienceChart from "~/components/pages/home/experienceChart";
import probabilityChart from "~/components/pages/home/probabilityChart";
import NotStarted from "~/components/pages/home/noStarted";
import dataRatio from "~/components/pages/home/dataRatio";
import defaultBox from "~/components/common/default";
export default {
  layout: "home",
  name: "processing",
  components: {
    probabilityChart,
    experienceChart,
    NotStarted,
    dataRatio,
    defaultBox
  },
  async asyncData({ app, params, query, store }) {
    //设置参数
    store.dispatch("matchDetail/_setParmars", {
      game_id: "LOL",
      match_id: query.match_id
    });

    let topDetail = await store.dispatch("matchDetail/_getMatchTopData");
    await store.dispatch("matchDetail/_getMatchDetailPlayer", { subtype: 1 });
    await store.dispatch("matchDetail/_getHistoryData", { subtype: 1 });
    await store.dispatch("matchDetail/_getNearlyData", {
      subtype: 1,
      pagetype: 0
    });
    await store.dispatch("matchDetail/_getNearlyData", {
      subtype: 1,
      pagetype: 1
    });
    await store.dispatch("matchDetail/_getNearlyData", {
      subtype: 1,
      pagetype: 2
    });
    let { mnl, lvs } = topDetail;
    //选手阵容
    let {
      position_list,
      player_info,
      history_match_info,
      history_battle_gkd,
      nearlyData,
      nearlyBatHomeData,
      nearlyBatAwayData
    } = store.state.matchDetail;
    return {
      mnl,
      position_list,
      player_info,
      player_detail: player_info[0],
      history_battle_gkd,
      history_match_info,
      nearlyData,
      nearlyBatHomeData,
      nearlyBatAwayData
    };
  },
  watch: {
    // player_detail:{
    //   handler({stat_radar}){
    //     console.log('stat_radar',stat_radar)
    //     //this.initChart("radarChart", stat_radar);
    //   },
    //   deep:true
    // }
  },
  data() {
    var _this = this;
    return {
      radarChart: {
        tooltip: {
          show: false
          // trigger: 'axis'
        },
        legend: {
          left: "center",
          top: 20,
          itemGap: 40,
          itemWidth: 26,
          itemHeight: 6,
          textStyle: {
            color: "#333",
            fontSize: 14
          }
        },
        radar: {
          startAngle: 150,
          angleAxis: { clockwise: true },
          center: ["50%", "55%"],
          radius: 60,
          name: {
            textStyle: {
              color: "#333",
              fontSize: 14,
              padding: [3, 8]
            },
            rich: {
              p: {
                color: "#999",
                align: "center",
                lineHeight: 20
              },
              a: {
                color: "#33C6D6"
              },
              b: {
                color: "#F05365"
              },
              span: {
                color: "#fff",
                align: "center"
              }
            },
            formatter: function(value, indicator) {
              return `${value.title}`;
            }
          },
          indicator: [],
          splitLine: {
            lineStyle: {
              color: [
                "rgba(112, 112, 112,0.4)",
                "rgba(112, 112, 112,0.4)",
                "rgba(112, 112, 112,0.4)",
                "rgba(112, 112, 112,0.4)",
                "rgba(112, 112, 112,0.4)",
                "rgba(112, 112, 112,0.4)",
                "rgba(112, 112, 112,0.4)",
                "rgba(112, 112, 112,0.4)"
              ]
            }
          },
          axisLine: {
            lineStyle: {
              color: "rgba(112, 112, 112,0.4)"
            }
          },
          splitArea: {
            show: false
          }
        },
        series: [
          {
            // name: '预算 vs 开销（Budget vs spending）',
            type: "radar",
            tooltip: {
              trigger: "item"
            },
            areaStyle: {
              opacity: 0.2
            },
            lineStyle: {
              width: 2,
              opacity: 1
            },
            symbol: "none",
            data: []
          }
        ]
      },
      dataObject: {
        title: "一号位",
        percentage: 100, //总的百分比
        percentageLeft: 40, //左边百分比
        percentageRight: 60 //右边百分比
      },
      regionFilter: {
        value: 0,
        options: [
          {
            value: 0,
            label: "10"
          },
          {
            value: 8,
            label: "9"
          },
          {
            value: 1,
            label: "8"
          }
        ]
      },
      chartTabs: [
        { text: "胜率", active: true },
        { text: "一血率", active: false },
        { text: "一塔率", active: false },
        { text: "五杀率", active: false },
        { text: "十杀率", active: false }
      ],
      data: {
        role_list: [
          {
            rate: "15",
            role_img_url:
              "http://ti-img.inkr.xyz/storage/lol_local/hero/lh_60.png",
            tip: "红队"
          },
          {
            rate: "-60",
            role_img_url:
              "http://ti-img.inkr.xyz/storage/lol_local/hero/lh_60.png",
            tip: "蓝队"
          },
          {
            rate: "10",
            role_img_url:
              "http://ti-img.inkr.xyz/storage/lol_local/hero/lh_60.png",
            tip: "红队"
          },
          {
            rate: "-20",
            role_img_url:
              "http://ti-img.inkr.xyz/storage/lol_local/hero/lh_60.png",
            tip: "蓝队"
          },
          {
            rate: "40",
            role_img_url:
              "http://ti-img.inkr.xyz/storage/lol_local/hero/lh_60.png",
            tip: "红队"
          },
          {
            rate: "50",
            role_img_url:
              "http://ti-img.inkr.xyz/storage/lol_local/hero/lh_60.png",
            tip: "蓝队"
          },
          {
            rate: "-50",
            role_img_url:
              "http://ti-img.inkr.xyz/storage/lol_local/hero/lh_60.png",
            tip: "红队"
          },
          {
            rate: "5",
            role_img_url:
              "http://ti-img.inkr.xyz/storage/lol_local/hero/lh_60.png",
            tip: "蓝队"
          },
          {
            rate: "-40",
            role_img_url:
              "http://ti-img.inkr.xyz/storage/lol_local/hero/lh_60.png",
            tip: "红队"
          }
        ],
        team_name_away: "AHQ",
        team_name_home: "ITZ",
        team_rate_away: "21%",
        team_rate_home: "19%"
      },
      data1: {},
      tabIndex: 1,
      sessionArr: [
        { session: "1号位", active: true },
        { session: "2号位", active: false },
        { session: "3号位", active: false },
        { session: "4号位", active: false },
        { session: "5号位", active: false }
      ],
      imgUrl: [
        { url: "/images/ban7.png", fits: "fill" },
        { url: "/images/ban7.png", fits: "fill" },
        { url: "/images/ban7.png", fits: "fill" },
        { url: "/images/ban7.png", fits: "fill" },
        { url: "/images/ban7.png", fits: "fill" },
        { url: "/images/ban7.png", fits: "fill" },
        { url: "/images/ban7.png", fits: "fill" }
      ],
      imgUrl1: [
        { url: "/images/pick5.png", fits: "fill" },
        { url: "/images/pick5.png", fits: "fill" },
        { url: "/images/pick5.png", fits: "fill" },
        { url: "/images/pick5.png", fits: "fill" },
        { url: "/images/pick5.png", fits: "fill" }
      ],
      actived: 1,
      historySelect: 1,
      nearlyHomeSelect: 1,
      nearlyAwaySelect: 1,
      selectVal: [
        {
          label: "10",
          value: 1
        },
        {
          label: "20",
          value: 2
        },
        {
          label: "30",
          value: 3
        },
        {
          label: "40",
          value: 4
        },
        {
          label: "50",
          value: 5
        }
      ],
      nearlySelect: 1,
      positionSelect: 1
    };
  },
  computed: {},
  methods: {
    activeTabs(obj, sessionArr) {
      sessionArr.forEach((item, index) => {
        item.active = false;
      });
      obj.active = true;
    },
    activeChartTabs(item, chartTabs) {
      chartTabs.forEach((i, index) => {
        i.active = false;
      });
      item.active = true;
    },
    changePlayer(index, position) {
      this.player_detail = this.player_info[index];
      this.actived = position;
      this.initChart("ability", this.player_detail.stat_radar);
    },
    async historyChange(subtype) {
      this.history_battle_gkd = [];
      this.history_match_info = [];
      await this.$store.dispatch("matchDetail/_getHistoryData", { subtype });
      let {
        history_match_info,
        history_battle_gkd
      } = this.$store.state.matchDetail;
      this.history_battle_gkd = history_battle_gkd;
      this.history_match_info = history_match_info;
    },
    async nearlyBatHomeChange(subtype) {
      await this.$store.dispatch("matchDetail/_getNearlyData", {
        subtype,
        pagetype: 1
      });
      this.nearlyBatHomeData = this.$store.state.matchDetail.nearlyBatHomeData;
    },
    async nearlyBatAwayChange(subtype) {
      await this.$store.dispatch("matchDetail/_getNearlyData", {
        subtype,
        pagetype: 2
      });
      this.nearlyBatAwayData = this.$store.state.matchDetail.nearlyBatAwayData;
    },
    async nearlySelectChange(subtype) {
      await this.$store.dispatch("matchDetail/_getNearlyData", {
        subtype,
        pagetype: 0
      });
      this.nearlyData = this.$store.state.matchDetail.nearlyData;
    },
    async positionChange(subtype) {
      await this.$store.dispatch("matchDetail/_getMatchDetailPlayer", {
        subtype
      });
      this.position_list = this.$store.state.matchDetail.position_list;
      this.player_info = this.$store.state.matchDetail.player_info;
    },
    zoneChange() {},
    // initChart(ability, option2) {
    //   this.$nextTick(() => {
    //     var abilityObject = this.$echarts.init(this.$refs[ability]);
    //     // 使用刚指定的配置项和数据显示图表。
    //     abilityObject.setOption(option2);
    //   });
    // },
    renderPramas(item) {
      let { a_value, b_value } = item;
      return {
        home: a_value,
        away: b_value,
        total: Number(b_value) + Number(a_value)
      };
    },
    initChart(domName, stat_radar) {
      if (stat_radar) {
        let indicator = [];
        let data = [
          {
            value: [],
            itemStyle: {
              normal: {
                color: "#33C6D6",
                lineStyle: {
                  color: "#33C6D6",
                  width: 2
                }
              }
            }
          },
          {
            value: [],
            itemStyle: {
              normal: {
                color: "#E94BBA",
                lineStyle: {
                  color: "#E94BBA;",
                  width: 2
                }
              }
            }
          }
        ];
        //let format_data = team_stat2.reverse();

        stat_radar.forEach(item => {
          let _data = [];
          let total = Number(item.a_value) + Number(item.b_value);
          let home = (Number(item.a_value) / total) * 100;
          let away = (Number(item.b_value) / total) * 100;
          indicator.push({
            name: {
              title: item.name
            },
            max: 100
          });
          data[0].value.push(home);
          data[1].value.push(away);
        });
        this.radarChart.radar.indicator = indicator;
        this.radarChart.series[0].data = data;
        this.$nextTick(() => {
          var myChart = this.$echarts.init(this.$refs[domName]);
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(this.radarChart);
        });
      }
    }
  },
  created() {},
  mounted() {
    this.initChart("ability", this.player_detail.stat_radar);
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
.liveBroadcast {
  overflow: hidden;
  .nowrap{
      white-space: nowrap;  
      text-overflow:ellipsis; 
      overflow:hidden;
  }
  .liveBroadcast-box {
    width: 796px;
    height: 488px;
    background: #0f1e45;
    background: url("/images/live123.png") 0 0 no-repeat;
    background-size: cover;
  }
  .live-box {
    display: flex;
    justify-content: space-between;
  }
  .log-box {
    width: 392px;
    height: 488px;
    // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
    background: rgba(255, 255, 255, 0.6);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    .centent_box {
      .centent_box_title {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        font-size: 18px;
        font-weight: bold;
        margin: 32px 0 12px 0;
        .gameName {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          display: inline-block;
          width: 80px;
        }
        .vs {
          color: #bbbbbb;
          font-size: 26px;
          font-weight: bold;
        }
      }
      .notstart {
        font-size: 24px;
        font-weight: bold;
        line-height: 31px;
        color: #999;
        text-align: center;
      }
      .centent_box_proportion {
        position: absolute;
        top: 146px;
        left: 0px;
        width: 100%;
        .prompt {
          font-size: 12px;
          font-weight: 400;
          line-height: 16px;
          color: #888888;
        }
        .percentage-hero-box {
          width: 344px;
          margin: 0 auto;
          margin-bottom: 8px;
        }
      }
    }
  }

  > .lineUp-box {
    width: 1200px;
    // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
    position: relative;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.6);
    overflow: hidden;
    .lineUp {
      width: 100%;
      height: 100%;

      z-index: 2;
      & > ul {
        height: 40px;
        display: flex;
        li {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          vertical-align: middle;
          line-height: 40px;
          height: 40px;
          flex: 1;
          background: #fff;
          font-weight: 400;
          color: #333;
          cursor: pointer;
        }
        li:first-child {
          border-radius: 6px 0px 0px 0px;
        }
        li:last-child {
          border-radius: 0px 6px 0px 0px;
        }
        .sessionActive {
          background: #6521D7;
          font-weight: bold;
          color: #fff;
          -webkit-text-stroke: 1 rgba(0, 0, 0, 0);
          text-stroke: 1 rgba(0, 0, 0, 0);
        }
      }
      & > .substitute {
        display: flex;
        justify-content: space-between;
        margin: 20px 0 37px 0;
        .substitute-session {
          width: 350px;
          font-size: 14px;
          font-weight: 400;
          line-height: 19px;
          color: #e4e4e4;
          display: inline-flex;
          justify-content: flex-start;
          align-items: center;
          vertical-align: middle;
          img {
            border: 2px solid rgba(255, 255, 255, 0);
          }
          img:hover {
            border: 2px solid #2159e5;
            box-shadow: 0px 2px 8px rgba(41, 51, 246, 0.3);
            border-radius: 50%;
          }
          .select-box {
            margin: 0 12px;
          }
        }
      }
      .player-box {
        display: flex;
        justify-content: space-between;
        padding-top: 40px;
        .player-info {
          width: 450px;
          height: 290px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          vertical-align: middle;
          .charts-box {
            height: 100%;
            position: relative;

            .charts-title {
              text-align: center;
              margin-bottom: 20px;
              .name {
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                display: block;
                width: 150px;
              }
              .line {
                width: 44px;
                margin: 8px auto 0 auto;
                border-radius: 12px;
              }
              .textStyle {
              }
            }

            .data-box {
              position: absolute;
              width: 140px;
              .textStyle {
                text-align: center;
                font-size: 14px;
                color:#666;
                margin: 8px 0;
              }
              .dataCentent {
                width: 100%;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                vertical-align: middle;
                .dataText {
                  // margin-left:20px;
                  font-size: 14px;
                  font-weight: bold;
                }
              }
            }
          }
          .titleHero {
            text-align: right;
            font-size: 14px;
            font-weight: 400;
            color: #333;
            margin-bottom: 16px;
          }
        }
        .player-chart {
          width: 350px;
          height: 283px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          vertical-align: middle;
          .radar-chart {
            width: 100%;
            height: 100%;
          }
        }
      }
      .percentage-box {
        width: 416px;
        margin: 0 auto;
        text-align: center;
        padding-bottom: 40px;
        .percentage {
          margin-bottom: 4px;
        }
      }
    }
  }
  > .history-box {
    width: 100%;
    .history-left {
      width: 796px;
      height: 534px;
      // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
      display: inline-block;
      position: relative;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 6px;
      margin-right: 5px;
      overflow: hidden;
      .centent {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 2;
        .title-text {
          font-size: 18px;
          font-weight: bold;
          color: #6521D7;
          width: 100%;
          padding: 16px 12px;
          margin-bottom: 11px;
          & > div {
            display: inline-block;
            font-size: 14px;
            font-weight: 400;
            color: #bbbbbb;
            margin-left: 24px;
            float: right;
            .select-box {
              width: 90px;
              margin: 0 12px;
            }
          }
        }
        .centent-table {
          width: 100%;
          height: 100%;
          .details-title {
            width: 100%;
            display: flex;
            font-size: 14px;
            font-weight: 400;
            color: #878b9a;
            span {
              display: inline-flex;
              align-items: center;
              vertical-align: middle;
              img {
                margin-right: 4px;
              }
            }
          }
          .details-row {
            width: 100%;
            display: flex;
            margin: 0 auto;
            margin: 21px 0;
            font-size: 14px;
            .name {
              width: 160px;
              margin: 0 28px 0 12px;
              text-align: left;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            span {
              text-align: center;
            }
          }
        }
      }
    }
    .history-right {
      position: relative;
      display: inline-block;
      width: 392px;
      height: 534px;
      background: rgba(255, 255, 255, 0.6);
      // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
      border-radius: 6px;
      overflow: hidden;
      .centent {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 2;
        .title-text {
          font-size: 18px;
          font-weight: bold;
          color: #6521D7;
          width: 100%;
          padding: 16px 12px;
        }
        .centent_title {
          width: 100%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          vertical-align: middle;
          font-size: 18px;
          font-weight: bold;
          color: #F05365;
          margin-bottom: 15px;
          .gameName {
            width: 80px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            display: inline-block;
            text-align: right;
          }
          .vs {
            font-size: 26px;
            font-weight: bold;
            color: #bbbbbb;
          }
        }
        .proportion-box {
          width: 65%;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          .proportion {
            width: 80px;
            height: 80px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            vertical-align: middle;
            font-size: 12px;
            font-weight: 400;
            color: #666;
            position: relative;
            & > span {
              color: #33C6D6;
              font-weight: bold;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 14px;
              &.away {
                color: #F05365;
              }
            }
            .proportionData {
              font-size: 14px;
              font-weight: bold;
              position: absolute;
              top: 31px;
              left: 18px;
            }
          }
        }
        .score {
          width: 344px;
          text-align: center;
          margin: 0 auto;
          margin-top: 60px;
          .row-bar-colum {
            margin-bottom: 10px;
          }
        }
      }
    }
  }
  > .Statistics-box {
    width: 1200px;
    height: 368px;
    position: relative;
    // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
    background: rgba(255, 255, 255, 0.6);
    border-radius: 6px;
    overflow: hidden;
    .Statistics {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 2;
      padding-top: 20px;
      .selectedBox {
        text-align: center;
        margin: 24px 0 35px 0;
        font-size: 14px;
        font-weight: 400;
        color: #bbbbbb;
        div {
          display: inline-block;
        }
      }
      .centent {
        width: 70%;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        .centent-child {
          width: 140px;
          height: 240px;
          position: relative;
          .charts-title {
            text-align: center;
            .name {
              width: 140px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              display: inline-block;
              text-align: center;
            }
            .line {
              width: 44px;
              height: 4px;
              background: #33C6D6;
              border-radius: 12px;
              margin: 8px auto 20px auto;
              &.red{
                background: #F05365;
              }
            }
          }
          .data-box {
            .textStyle {
              font-size: 14px;
              font-weight: 400;
              color: #666;
              margin: 8px 0;
            }
            .dataText {
              font-weight: bold;
            }
          }
          .img {
            position: absolute;
            top: 84px;
            left: 20px;
          }
          .img1 {
            position: absolute;
            top: 92px;
            left: 30px;
          }
        }
        .center {
          width: 430px;
          height: 240px;
          text-align: center;
          .percentage {
            margin-bottom: 3px;
          }
        }
      }
    }
  }
  > .fight-box1 {
    width: 1200px;
    height: 534px;
    // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
    position: relative;
    margin-bottom: 12px;
    border-radius: 6px;
    background:rgba(51, 198, 214, 0.2);
    overflow: hidden;
    .centent {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
      .title-text {
        margin: 13px 24px;
        h3 {
          display: inline-flex;
          align-items: center;
          vertical-align: middle;
          width: 30%;
        }
        div {
          float: right;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          vertical-align: middle;
          margin-left: 30px;
          font-size: 14px;
          font-weight: 400;
          color: #666;
          .select-box {
            margin: 0 12px;
          }
        }
      }
      .centent-table {
        width: 100%;
        height: 100%;
        .details-row {
          width: 100%;
          display: flex;
          font-size: 14px;
          font-weight: 400;
          margin: 21px 0;
          .name {
            width: 164px;
            margin: 0 78px 0 12px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            display: inline-block;
            text-align: center;
          }
          span {
            text-align: center;
          }
        }
        & > .details-title {
          span {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            vertical-align: middle;
            font-size: 14px;
            font-weight: 400;
            line-height: 19px;
            color: #878b9a;
            margin-right: 80px;
            img {
              margin-right: 4px;
            }
          }
        }
      }
    }
  }
  > .fight-box2 {
    overflow: hidden;
    margin-bottom: 60px;
    width: 1200px;
    height: 534px;
    // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
    position: relative;
    border-radius: 6px;
    background:rgba(240, 83, 101, 0.2);
    .centent {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
      .title-text {
        margin: 13px 24px;
        h3 {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          vertical-align: middle;
        }
        div {
          float: right;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          vertical-align: middle;
          margin-left: 30px;
          font-size: 14px;
          font-weight: 400;
          color: #666;
          .select-box {
            margin: 0 12px;
          }
        }
      }
      .centent-table {
        width: 100%;
        height: 100%;
        .details-row {
          width: 100%;
          display: flex;
          font-size: 14px;
          font-weight: 400;
          margin: 21px 0;
          .name {
            width: 164px;
            margin: 0 78px 0 12px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            display: inline-block;
            text-align: center;
          }
          span {
            text-align: center;
          }
        }
        & > .details-title {
          span {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            vertical-align: middle;
            font-size: 14px;
            font-weight: 400;
            line-height: 19px;
            color: #878b9a;
            margin-right: 80px;
            img {
              margin-right: 4px;
            }
          }
        }
      }
    }
  }
  .custom-header {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      margin-right: 3px;
    }
    &.left {
      justify-content: start;
    }
  }
  .l {
    justify-content: start;
    padding-left: 38px;
  }
  .table-score {
    color: #666;
    .home {
      color: #33C6D6;
      font-weight: bold;
    }
    .away {
      color: #F05365;
      font-weight: bold;
    }
  }
  .vsoth{
    &.redawa{
      .home {
        color: #F05365;
      }
    }
    .away{
      color: #666;
    }
  }
  .row-bar-colum {
    margin-bottom: 8px;
  }
  .pie-wrapper {
    overflow: hidden;
    width: 140px;
    height: 140px;
    position: relative;
    border-radius: 50%;
    .playerImg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .pic-wrapper {
    display: flex;
    align-items: center;
  }
  .handler {
    text-align: center;
    margin-top: 20px;
  }
}
</style>