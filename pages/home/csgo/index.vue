<!--
  功能：csgo比赛详情
  作者：acmentf
  邮箱：985881328@qq.com
  时间：2020年12月23日 09:50:54
-->
<template>
  <div class="csgo-detail">
    <!-- 面包屑 -->
    <div style="position: relative; margin-bottom: 13px; width: 100%">
      <Breadcrumb>
        <breadcrumb-item
          >{{ detailsTop.mnl.team_home.team_short_name }} VS
          {{ detailsTop.mnl.team_away.team_short_name }}</breadcrumb-item
        >
      </Breadcrumb>
      <app-follow
        :ids="matchId"
        type="match"
        game_id="CSGO"
        style="position: absolute; top: 0px; right: 0"
      />
    </div>
    <!-- 未开始 -->
    <div class="not-start" v-if="status === 1">
      <!-- 直播区域 start-->
      <div class="live-session">
        <!-- 比赛未开始（倒计时组件） -->
        <not-started
          :startTime="detailsTop.mnl.match_time * 1000"
        ></not-started>
        <!-- 双方对战信息 -->
        <div class="match-info vertical">
          <div class="teams">
            <div class="home-team" :team_id="detailsTop.mnl.team_home.team_id">
              <span class="name nowrap">{{
                detailsTop.mnl.team_home.team_short_name
              }}</span>
              <el-image
                style="width: 30px"
                fit="contain"
                :src="detailsTop.mnl.team_home.team_img"
              >
                <div slot="error" class="image-slot">
                  <default-img :size="30"></default-img>
                </div>
              </el-image>
            </div>
            <span class="vs">VS</span>
            <div class="away-team" :team_id="detailsTop.mnl.team_away.team_id">
              <el-image
                style="width: 30px"
                fit="contain"
                :src="detailsTop.mnl.team_away.team_img"
              >
                <div slot="error" class="image-slot">
                  <default-img :size="30"></default-img>
                </div>
              </el-image>
              <span class="name nowrap">{{
                detailsTop.mnl.team_away.team_short_name
              }}</span>
            </div>
          </div>
          <p class="team-status-str">未开始</p>
          <!-- 胜率预判 -->
          <!-- <div class="win-rate">
            <div class="title">
              胜率预判
              <span>（统计战队近五十场比赛数据）</span>
            </div>
            <div class="row-box">
              <row-bar :pramas="{home:80,away:60,total:140}">获得一血后胜率</row-bar>
              <row-bar>摧毁一塔后胜率</row-bar>
              <row-bar>先五杀后胜率</row-bar>
              <row-bar>先十杀后胜率</row-bar>
            </div>
          </div>-->
        </div>
      </div>
      <!-- 直播区域 end-->
      <!-- 历史交锋 -->
      <div class="history-session session">
        <app-title title="历史交锋" type="1" color="#333" />
        <div class="content">
          <div class="content-left">
            <div class="table-header">
              <div class="table-header-left">
                <i class="cup-icon"></i>
                <p>取得成绩</p>
              </div>
              <div class="table-header-right">
                <div>
                  <span>近&nbsp;</span>
                  <app-select
                    style="width: 90px"
                    name="optzone"
                    v-model="historyData.selectVal"
                    :options="historyData.selectOpt"
                    @change="historyChange"
                  />
                  <span>&nbsp;场</span>
                </div>
                <div v-if="false">
                  <span>地图&nbsp;</span>
                  <app-select style="width: 90px" name="optmap" />
                </div>
              </div>
            </div>

            <table
              class="custom-table"
              v-if="historyData.history_match_info.length"
            >
              <thead>
                <tr>
                  <td
                    v-for="(item, index) in historyTableHeader"
                    :key="index"
                    :style="{
                      width: item.width,
                      textAlign: item.align ? item.align : 'left',
                    }"
                  >
                    <img :src="item.icon" width="18" />
                    <span>{{ item.name }}</span>
                  </td>
                </tr>
              </thead>
              <tbody style="height: 400px" class="tablebody">
                <tr
                  v-for="(item, index) in historyData.history_match_info"
                  :key="index"
                >
                  <td style="width: 170px">{{ item.TtName }}</td>
                  <td style="width: 120px">{{ item.Time }}</td>
                  <td style="text-align: center">
                    <b style="color: #8b65ff">{{ item.Win }}</b
                    >-<b style="color: #eb47b1">{{ item.Lost }}</b>
                  </td>
                  <td style="text-align: center">{{ item.Map }}</td>
                  <td style="text-align: center">
                    <img :src="item.R1" /><img :src="item.R16" />
                  </td>
                  <td style="text-align: center">
                    <img :src="item.FF" /><img :src="item.FT" />
                  </td>
                  <td style="text-align: center"><img :src="item.WLImg" /></td>
                </tr>
              </tbody>
            </table>
            <defaultBox
              v-if="!historyData.history_match_info.length"
              style="margin-top: 120px"
              width="260px"
              height="260px"
              src="/images/achieve_resuits.png"
              >暂无取得成绩</defaultBox
            >
          </div>
          <div class="content-right">
            <div class="content-right-title">
              <img src="/images/ranking.png" alt width="22" />
              <span>数据对比</span>
            </div>
            <div class="content-right-main" style="padding: 0 24px">
              <div class="teams">
                <div
                  class="home-team"
                  :team_id="detailsTop.mnl.team_home.team_id"
                >
                  <span class="name nowrap">{{
                    detailsTop.mnl.team_home.team_short_name
                  }}</span>
                  <el-image
                    style="width: 50px"
                    fit="contain"
                    :src="detailsTop.mnl.team_home.team_img"
                  >
                    <div slot="error" class="image-slot">
                      <default-img :size="50"></default-img>
                    </div>
                  </el-image>
                </div>
                <span class="vs">VS</span>
                <div class="away-team">
                  <el-image
                    style="width: 50px"
                    fit="contain"
                    :src="detailsTop.mnl.team_away.team_img"
                  >
                    <div slot="error" class="image-slot">
                      <default-img :size="50"></default-img>
                    </div>
                  </el-image>
                  <span class="name nowrap">{{
                    detailsTop.mnl.team_away.team_short_name
                  }}</span>
                </div>
              </div>
              <!-- 胜率饼图 -->
              <div class="win-rate-pie">
                <div class="home" style="width: 80px; height: 80px">
                  <Pie
                    width="80"
                    height="80"
                    :rate="historyData.history_battle_gkd.team_home.win_rate.value"
                    :type="1"
                  ></Pie>
                  <span class="data"
                    >{{ historyData.history_battle_gkd.team_home.win_rate.value }}%</span
                  >
                </div>
                <div class="sl">胜率</div>
                <div class="away">
                  <Pie
                    width="80"
                    height="80"
                    :rate="historyData.history_battle_gkd.team_away.win_rate.value"
                  ></Pie>
                  <span class="data"
                    >{{ historyData.history_battle_gkd.team_away.win_rate.value }}%</span
                  >
                </div>
              </div>
              <div class="row-box">
                <row-bar
                  v-for="(item, index) in historyData.history_battle_gkd.history_gkd"
                  :key="index"
                  :pramas="{
                    home: item.a_value,
                    away: item.b_value,
                  }"
                  >{{ item.name }}</row-bar
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 近期数据统计 -->
      <div class="near-data-session session">
        <app-title title="近期数据统计" type="1" color="#333" />
        <div class="content">
          <div class="table-header-right">
            <div>
              <span>近&nbsp;</span>
              <app-select
                style="width: 90px"
                name="optdatazone"
                v-model="nearlyData.selectVal"
                :options="nearlyData.selectOpt"
                @change="nearlyChange"
              />
              <span>&nbsp;场</span>
            </div>
            <div v-if="false">
              <span>地图&nbsp;</span>
              <app-select style="width: 90px" name="optdatamap" />
            </div>
          </div>
          <div class="body">
            <div class="home">
              <div class="title">
                <p>{{ nearlyData.barList.team_home.team_short_name }}</p>
                <div class="line"></div>
              </div>
              <div class="pie-box">
                <el-image
                  class="team-pic"
                  fit="contain"
                  :src="nearlyData.barList.team_home.team_img"
                >
                  <div slot="error" class="image-slot">
                    <default-img :size="100"></default-img>
                  </div>
                </el-image>
                <Pie
                  width="140"
                  height="140"
                  type="1"
                  :rate="nearlyData.barList.team_home.win_rate.value"
                ></Pie>
              </div>

              <p class="sl">{{ nearlyData.barList.team_home.win_rate.name }}</p>
              <p class="rote">
                {{ nearlyData.barList.team_home.win_rate.value }}%
              </p>
            </div>
            <!-- 柱状图区域 -->
            <div class="bar-box">
              <row-bar
                v-for="(item, index) in nearlyData.barList.history_gkd"
                :key="index"
                :pramas="{
                  home: item.a_value * 1,
                  away: item.b_value * 1,
                  total: item.a_value * 1 + item.b_value * 1,
                }"
                >{{ item.name }}</row-bar
              >
            </div>
            <div class="away">
              <div class="title">
                <p>{{ nearlyData.barList.team_away.team_short_name }}</p>
                <div class="line"></div>
              </div>
              <div class="pie-box">
                <el-image
                  class="team-pic"
                  fit="contain"
                  :src="nearlyData.barList.team_away.team_img"
                >
                  <div slot="error" class="image-slot">
                    <default-img :size="100"></default-img>
                  </div>
                </el-image>
                <Pie
                  width="140"
                  height="140"
                  :rate="nearlyData.barList.team_away.win_rate.value"
                ></Pie>
              </div>

              <p class="sl">{{ nearlyData.barList.team_away.win_rate.name }}</p>
              <p class="rote">
                {{ nearlyData.barList.team_away.win_rate.value }}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 近期对战数据 -->
      <div class="near-prok-session session">
        <app-title title="近期对战数据" type="1" color="#333" />

        <div class="content">
          <div class="title">
            <div class="title-left">
              <el-image
                style="width: 22px"
                fit="contain"
                :src="nearlyData.barList.team_home.team_img"
              >
                <div slot="error" class="image-slot">
                  <default-img :size="22"></default-img>
                </div>
              </el-image>
              <span class="team-name">{{
                nearlyData.barList.team_home.team_short_name
              }}</span>
            </div>
            <div class="title-right">
              <div class="table-header-right">
                <div>
                  <span>近&nbsp;</span>
                  <app-select
                    style="width: 136px"
                    v-model="nearlyData.selectVal"
                    :options="nearlyData.selectOpt"
                    @change="nearlyChange"
                  />
                  <span>&nbsp;场</span>
                </div>
                <div v-if="false">
                  <span>地图&nbsp;</span>
                  <app-select style="width: 136px" name="zone" />
                </div>
              </div>
            </div>
          </div>
          <table class="custom-table" v-if="nearlyData.tableOne.length">
            <thead>
              <tr>
                <td
                  v-for="(item, index) in nearTableHeader"
                  :key="index"
                  :style="{
                    width: item.width,
                    textAlign: item.align ? item.align : 'left',
                  }"
                >
                  <img :src="item.icon" width="18" />
                  <span>{{ item.name }}</span>
                </td>
              </tr>
            </thead>
            <tbody style="height:390px;overflow:hidden;">
              <tr v-for="(item, index) in nearlyData.tableOne" :key="index">
                <td style="width: 200px">{{ item.TtName }}</td>
                <td style="width: 170px">
                  <img
                    :src="item.icon"
                    style="width: 22px; height: 22px; object-fit: contain"
                  />
                  {{ item.name }}
                </td>
                <td style="text-align: center">
                  <b style="color: #8b65ff">{{ item.Win }}</b
                  >-<b>{{ item.Lost }}</b>
                </td>
                <td style="text-align: center">{{ item.Map }}</td>
                <td style="text-align: center">
                  <img :src="item.R1" /><img :src="item.R16" />
                </td>
                <td style="text-align: center">
                  <img :src="item.FF" /><img :src="item.FT" />
                </td>
                <td style="text-align: center"><img :src="item.WLImg" /></td>
              </tr>
            </tbody>
          </table>
          <defaultBox
            v-if="!nearlyData.tableOne.length"
            style="margin-top: 80px"
            width="260px"
            height="260px"
            src="/images/match_list.png"
            >暂无近期对战数据</defaultBox
          >
        </div>

        <div class="content content-2">
          <div class="title">
            <div class="title-left">
              <el-image
                style="width: 22px"
                fit="contain"
                :src="nearlyData.barList.team_away.team_img"
              >
                <div slot="error" class="image-slot">
                  <default-img :size="22"></default-img>
                </div>
              </el-image>
              <span class="team-name">{{
                nearlyData.barList.team_away.team_short_name
              }}</span>
            </div>
            <div class="title-right">
              <div class="table-header-right">
                <div>
                  <span>近&nbsp;</span>
                  <app-select
                    style="width: 136px"
                    v-model="nearlyData.selectVal"
                    :options="nearlyData.selectOpt"
                    @change="nearlyChange"
                  />
                  <span>&nbsp;场</span>
                </div>
                <div v-if="false">
                  <span>地图&nbsp;</span>
                  <app-select style="width: 136px" name="zone" />
                </div>
              </div>
            </div>
          </div>
          <table class="custom-table" v-if="nearlyData.tableTwo.length">
            <thead>
              <tr>
                <td
                  v-for="(item, index) in nearTableHeader"
                  :key="index"
                  :style="{
                    width: item.width,
                    textAlign: item.align ? item.align : 'left',
                  }"
                >
                  <img :src="item.icon" width="18" />
                  <span>{{ item.name }}</span>
                </td>
              </tr>
            </thead>
            <tbody style="height:390px;overflow:hidden;">
              <tr v-for="(item, index) in nearlyData.tableTwo" :key="index">
                <td style="width: 200px">{{ item.TtName }}</td>
                <td style="width: 170px">
                  <img
                    :src="item.icon"
                    style="width: 22px; height: 22px; object-fit: contain"
                  />
                  {{ item.name }}
                </td>
                <td style="text-align: center">
                  <b style="color: #eb47b1">{{ item.Win }}</b
                  >-<b>{{ item.Lost }}</b>
                </td>
                <td style="text-align: center">{{ item.Map }}</td>
                <td style="text-align: center">
                  <img :src="item.R1" /><img :src="item.R16" />
                </td>
                <td style="text-align: center">
                  <img :src="item.FF" /><img :src="item.FT" />
                </td>
                <td style="text-align: center"><img :src="item.WLImg" /></td>
              </tr>
            </tbody>
          </table>
          <defaultBox
            v-if="!nearlyData.tableTwo.length"
            style="margin-top: 80px"
            width="260px"
            height="260px"
            src="/images/match_list.png"
            >暂无近期对战数据</defaultBox
          >
        </div>
      </div>

      <!-- 地图数据 -->
      <div class="map-session session">
        <app-title title="地图数据" type="1" color="#333" />
        <div class="content">
          <table
            class="custom-table"
            v-if="mapVsData && mapVsData.map && mapVsData.map.length"
          >
            <thead>
              <tr>
                <td
                  v-for="(item, index) in mapTableHeader"
                  :key="index"
                  :style="{
                    width: item.width,
                    textAlign: item.align ? item.align : 'left',
                  }"
                >
                  <img :src="item.icon" width="18" />
                  <span>{{ item.name }}</span>
                </td>
              </tr>
            </thead>
            <tbody style="height: 457px" v-if="mapVsData && mapVsData.map">
              <tr v-for="(item, index) in mapVsData.map" :key="index">
                <td style="width: 240px">
                  <img
                    :src="item.cover"
                    :alt="item.map_name"
                    class="map-container"
                  />
                </td>
                <td style="width: 120px; text-align: left">
                  <div class="nowrap">
                    <img
                      :alt="mapVsData.team_home.team_id"
                      :src="mapVsData.team_home.team_img"
                      style=""
                    />
                    {{ mapVsData.team_home.team_short_name }}
                  </div>
                  <div class="nowrap">
                    <img
                      :alt="mapVsData.team_away.team_id"
                      :src="mapVsData.team_away.team_img"
                      style=""
                    />
                    {{ mapVsData.team_away.team_short_name }}
                  </div>
                </td>
                <td>
                  <div>{{ item.home.round_num }}</div>
                  <div>{{ item.away.round_num }}</div>
                </td>
                <td>
                  <div>{{ item.home.ban }}</div>
                  <div>{{ item.away.ban }}</div>
                </td>
                <td>
                  <div>{{ item.home.ban_rate }}%</div>
                  <div>{{ item.away.ban_rate }}%</div>
                </td>
                <td>
                  <div>{{ item.home.pick }}</div>
                  <div>{{ item.away.pick }}</div>
                </td>
                <td>
                  <div>{{ item.home.pick_rate }}%</div>
                  <div>{{ item.away.pick_rate }}%</div>
                </td>
                <td>
                  <div>{{ item.home.win_rate }}%</div>
                  <div>{{ item.away.win_rate }}%</div>
                </td>
              </tr>
            </tbody>
          </table>

          <defaultBox
            v-else
            style="padding-top: 60px"
            width="260px"
            height="260px"
            src="/images/battle_details.png"
            >暂无地图数据</defaultBox
          >
        </div>
      </div>
    </div>

    <!-- 进行中 / 已结束-->
    <div class="started" v-if="status !== 1">
      <!-- 直播区域 start-->
      <div class="live-session">
        <!-- 比赛直播画面(播放器组件) -->
        <div class="live-player" :aimation_addr="detailsTop.lvs.aimation_addr" :video_addr="detailsTop.lvs.video_addr">
          <live-box
            v-if="status === 2"
            :flow="{
              aimation_addr:detailsTop.lvs.aimation_addr,
              video_addr:detailsTop.lvs.video_addr
            }"
          ></live-box>
          <div class="theafterdata" v-else>
            <template v-if="liveData && liveData.uami">
              <h5>赛后数据</h5>
              <table border="0" cellspacing="0" v-if="liveData.uami.home">
                <tbody>
                  <tr v-if="liveData.uami.home.title">
                    <th
                      v-for="(item, index) in liveData.uami.home.title"
                      :key="index"
                      class="nowrap"
                      :style="{ width: index ? '108px' : '140px' }"
                    >
                      <img v-if="!index" :src="liveData.uami.home.img_url" />{{
                        item
                      }}
                    </th>
                  </tr>
                  <tr
                    v-for="(item, index) in liveData.uami.home.value"
                    :key="index"
                  >
                    <td v-for="(item_sub, index_sub) in item" :key="index_sub">
                      {{ item_sub }}{{ index_sub === 4 ? "%" : "" }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table border="0" cellspacing="0" v-if="liveData.uami.away">
                <tbody>
                  <tr v-if="liveData.uami.away.title">
                    <th
                      v-for="(item, index) in liveData.uami.away.title"
                      :key="index"
                      class="nowrap"
                      :style="{ width: index ? '108px' : '140px' }"
                    >
                      <img v-if="!index" :src="liveData.uami.away.img_url" />{{
                        item
                      }}
                    </th>
                  </tr>
                  <tr
                    v-for="(item, index) in liveData.uami.away.value"
                    :key="index"
                  >
                    <td v-for="(item_sub, index_sub) in item" :key="index_sub">
                      {{ item_sub }}{{ index_sub === 4 ? "%" : "" }}
                    </td>
                  </tr>
                  <defaultBox
                    v-if="!liveData.uami.away.title.length"
                    style="margin-top: 0"
                    width="260px"
                    height="260px"
                    src="/images/battle_details.png"
                    >暂无赛后数据</defaultBox
                  >
                </tbody>
              </table>
            </template>
          </div>
        </div>
        <!-- 双方对战信息 -->
        <div class="match-info vertical">
          <div class="teams">
            <div class="home-team" :team_id="detailsTop.mnl.team_home.team_id">
              <div class="group">
                <div class="icon">
                  <img
                    v-if="
                      status === 3 &&
                      detailsTop.mnl.home_score > detailsTop.mnl.away_score
                    "
                    style="width: 24px; height: 24px"
                    src="/images/victory_b.png"
                  />
                </div>
                <div class="miname nowrap">
                  {{ detailsTop.mnl.team_home.team_short_name }}
                </div>
              </div>

              <el-image
                style="width: 30px"
                fit="contain"
                :src="detailsTop.mnl.team_home.team_img"
              >
                <div slot="error" class="image-slot">
                  <default-img :size="30"></default-img>
                </div>
              </el-image>
            </div>
            <span class="vs nopd">
              <b>{{ detailsTop.mnl.home_score }}</b>
              <i>:</i>
              <b class="red">{{ detailsTop.mnl.away_score }}</b>
            </span>
            <div class="away-team" :team_id="detailsTop.mnl.team_away.team_id">
              <el-image
                style="width: 30px"
                fit="contain"
                :src="detailsTop.mnl.team_away.team_img"
              >
                <div slot="error" class="image-slot">
                  <default-img :size="30"></default-img>
                </div>
              </el-image>

              <div class="group">
                <div class="miname nowrap">
                  {{ detailsTop.mnl.team_away.team_short_name }}
                </div>
                <div class="icon">
                  <img
                    v-if="
                      status === 3 &&
                      detailsTop.mnl.away_score > detailsTop.mnl.home_score
                    "
                    style="width: 24px; height: 24px"
                    src="/images/victory_r.png"
                  />
                </div>
              </div>
            </div>
          </div>
          <p class="team-status-str">
            {{ ["比赛异常", "未开始", "进行中", "已完赛"][status] }}
          </p>
        </div>
      </div>
      <!-- 直播区域 end-->

      <!----------------------------------------------------------------------->
      <!-- 选手阵容 -->
      <div class="player-lineup-session session">
        <app-title title="选手阵容" type="1" color="#333" />
        <div class="content">
          <div class="players-list">
            <div class="home">
              <div class="team-info" :team_id="liveData.team_a_team.team_id">
                <el-image
                  style="width: 50px"
                  fit="contain"
                  :src="liveData.team_a_team.team_img"
                >
                  <div slot="error" class="image-slot">
                    <default-img :size="50"></default-img>
                  </div>
                </el-image>
                <div class="team-detail">
                  <p class="name nowrap" style="width: 100px">
                    {{ liveData.team_a_team.team_short_name }}
                  </p>
                  <!-- 世界排名 -->
                  <span class="level">{{ liveData.team_a_team.rank }}</span>
                </div>
              </div>
              <!-- 选手列表 -->
              <ul class="player-item" v-if="liveData.play_a_team">
                <li
                  v-for="(item, index) in liveData.play_a_team"
                  :key="index"
                  :class="player.a === index ? 'active' : ''"
                  @click="player.a = index"
                >
                  <el-image
                    style="width: 40px; border-radius: 50%"
                    :src="item.play_imgurl"
                  >
                    <div slot="error" class="image-slot">
                      <default-img :size="40"></default-img>
                    </div>
                  </el-image>
                  <p style="width: 40px" class="nowrap" :playerID="item.id">
                    {{ item.name }}
                  </p>
                </li>
              </ul>
            </div>
            <div class="away">
              <!-- 选手列表 -->
              <ul class="player-item" v-if="liveData.play_b_team">
                <li
                  v-for="(item, index) in liveData.play_b_team"
                  :key="index"
                  :class="player.b === index ? 'active' : ''"
                  @click="player.b = index"
                >
                  <el-image
                    style="width: 40px; border-radius: 50%"
                    :src="item.play_imgurl"
                  >
                    <div slot="error" class="image-slot">
                      <default-img :size="40"></default-img>
                    </div>
                  </el-image>
                  <p style="width: 40px" class="nowrap" :playerID="item.id">
                    {{ item.name }}
                  </p>
                </li>
              </ul>
              <div class="team-info" :team_id="liveData.team_b_team.team_id">
                <div class="team-detail">
                  <p class="name nowrap" style="width: 100px">
                    {{ liveData.team_b_team.team_short_name }}
                  </p>
                  <!-- 世界排名 -->
                  <span class="level">{{ liveData.team_b_team.rank }}</span>
                </div>
                <el-image
                  style="width: 50px"
                  fit="contain"
                  :src="liveData.team_b_team.team_img"
                >
                  <div slot="error" class="image-slot">
                    <default-img :size="50"></default-img>
                  </div>
                </el-image>
              </div>
            </div>
          </div>
          <div class="player-detail">
            <div class="home-player">
              <p class="name nowrap" style="width: 150px">
                {{
                  liveData.play_a_team[player.a]
                    ? liveData.play_a_team[player.a].name
                    : ""
                }}
              </p>
              <div class="line"></div>
              <el-image
                style="width: 150px; border-radius: 50%"
                :src="
                  liveData.play_a_team[player.a]
                    ? liveData.play_a_team[player.a].play_imgurl
                    : ''
                "
              >
                <div slot="error" class="image-slot">
                  <default-img :size="150"></default-img>
                </div>
              </el-image>
              <p class="score">
                {{
                  liveData.play_a_team[player.a]
                    ? liveData.play_a_team[player.a].list[0].value
                    : ""
                }}
              </p>
              <p class="position">
                {{
                  liveData.play_a_team[player.a]
                    ? liveData.play_a_team[player.a].list[0].name
                    : ""
                }}
              </p>
            </div>
            <div class="echarts-content">
              <div
                class="radar"
                ref="radar"
                style="width: 300px; height: 200px"
              ></div>
            </div>
            <div class="away-player">
              <p class="name nowrap" style="width: 150px">
                {{
                  liveData.play_b_team[player.b]
                    ? liveData.play_b_team[player.b].name
                    : ""
                }}
              </p>
              <div class="line"></div>
              <el-image
                style="width: 150px; border-radius: 50%"
                :src="
                  liveData.play_b_team[player.b]
                    ? liveData.play_b_team[player.b].play_imgurl
                    : ''
                "
              >
                <div slot="error" class="image-slot">
                  <default-img :size="150"></default-img>
                </div>
              </el-image>
              <p class="score">
                {{
                  liveData.play_b_team[player.b]
                    ? liveData.play_b_team[player.b].list[0].value
                    : ""
                }}
              </p>
              <p class="position">
                {{
                  liveData.play_b_team[player.b]
                    ? liveData.play_b_team[player.b].list[0].name
                    : ""
                }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 对局数据统计 -->
      <div class="pock-session session">
        <app-title title="对局数据统计" type="1" color="#333" />
        <div class="content">
          <div class="body">
            <div class="home">
              <div class="title">
                <p
                  class="nowrap"
                  style="width: 250px"
                  :team_id="detailsTop.mnl.team_home.team_id"
                >
                  {{ detailsTop.mnl.team_home.team_short_name }}
                </p>
                <div class="line"></div>
              </div>
              <div class="pie-box">
                <el-image
                  class="team-pic"
                  fit="contain"
                  :src="detailsTop.mnl.team_home.team_img"
                >
                  <div slot="error" class="image-slot">
                    <default-img :size="100"></default-img>
                  </div>
                </el-image>
                <Pie
                  v-if="liveData && liveData.win_rate"
                  width="140"
                  height="140"
                  type="1"
                  :rate="liveData.win_rate.a_value || 0"
                ></Pie>
              </div>
              <p class="sl">胜率</p>
              <p class="rote">{{ liveData.win_rate.a_value || 0 }}%</p>
              <p
                class="ico_data"
                v-if="liveData.mmi && liveData.mmi[mapINDEX_]"
              >
                <template v-if="liveData.mmi[mapINDEX_].score_home">
                  <span
                    v-for="(item, index) in liveData.mmi[mapINDEX_].score_home"
                    :key="index"
                    v-show="index"
                    ><img
                      :src="item.img_url"
                      back="/images/equip_default.png"
                    />{{ item.score }}</span
                  >
                </template>
              </p>
            </div>
            <!-- 柱状图区域 -->
            <div class="bar-box-row">
              <ul class="box" style="opacity: 0">
                <li>
                  <p>BO1</p>
                  <span class="home">16</span>
                  <span>:</span>
                  <span class="away">05</span>
                </li>
                <li>
                  <p>BO2</p>
                  <span class="home">16</span>
                  <span>:</span>
                  <span class="away">05</span>
                </li>
                <li>
                  <p>BO3</p>
                  <span class="home">16</span>
                  <span>:</span>
                  <span class="away">05</span>
                </li>
              </ul>
              <!-- <row-bar  direction="row" :pramas="{home:1,away:2,total:3}" dw
                >333333333</row-bar> -->
              <row-bar
                v-for="(item, index) in matchBarData"
                :key="index"
                direction="row"
                :pramas="item"
                dw
                >{{ item.title }}</row-bar
              >
            </div>
            <div class="away">
              <div class="title">
                <p
                  class="nowrap"
                  style="width: 250px"
                  :team_id="detailsTop.mnl.team_away.team_id"
                >
                  {{ detailsTop.mnl.team_away.team_short_name }}
                </p>
                <div class="line"></div>
              </div>
              <div class="pie-box">
                <el-image
                  class="team-pic"
                  fit="contain"
                  :src="detailsTop.mnl.team_away.team_img"
                >
                  <div slot="error" class="image-slot">
                    <default-img :size="100"></default-img>
                  </div>
                </el-image>
                <Pie
                  v-if="liveData && liveData.win_rate"
                  width="140"
                  height="140"
                  :rate="liveData.win_rate.b_value || 0"
                ></Pie>
              </div>

              <p class="sl">胜率</p>
              <p class="rote">{{ liveData.win_rate.a_value || 0 }}%</p>
              <p
                class="ico_data"
                v-if="liveData.mmi && liveData.mmi[mapINDEX_]"
              >
                <template v-if="liveData.mmi[mapINDEX_].score_away">
                  <span
                    v-for="(item, index) in liveData.mmi[mapINDEX_].score_away"
                    :key="index"
                    v-show="index"
                    ><img
                      :src="item.img_url"
                      back="/images/equip_default.png"
                    />{{ item.score }}</span
                  >
                </template>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 选手数据 -->
      <div class="player-session session">
        <app-title title="选手数据" type="1" color="#333" />
        <div style="text-align: right" v-if="status === 3">
          <span>地图&nbsp;</span>
          <app-select
            v-model="pLayerSelect.val"
            :options="pLayerSelect.opt"
            style="width: 90px"
            name="optmap"
            @change="getPlayerInfoData"
          />
        </div>
        <div class="content" v-if="playerInfo && playerInfo.a_team">
          <table class="custom-table" v-if="playerInfo.a_team.length">
            <thead>
              <tr>
                <td style="width: 150px; text-align: left" class="nowrap">
                  <img
                    :alt="playerInfo.team_home.team_id"
                    :src="playerInfo.team_home.team_img"
                    style="margin-right: 4px"
                  /><span
                    style="font-size:18px;font-weight:bold;"
                    >{{ playerInfo.team_home.team_short_name }}</span
                  >
                </td>
                <td
                  v-for="(item, index) in playerTableHeader"
                  :key="index"
                  :style="{
                    width: item.width,
                    textAlign: item.align ? item.align : 'left',
                  }"
                >
                  <img :src="item.icon" width="18" v-if="item.icon" />
                  <span>{{ item.name }}</span>
                </td>
              </tr>
            </thead>
            <tbody style="overflow:hidden;">
              <tr v-for="(item, index) in playerInfo.a_team" :key="index">
                <td style="width: 150px" :alt="item.id">{{ item.name }}</td>
                <td style="text-align: center">{{ item.list[0].value }}</td>
                <td style="text-align: center">{{ item.list[1].value }}</td>
                <td style="text-align: center">{{ item.list[2].value }}</td>
                <td style="text-align: center">{{ item.list[3].value }}%</td>
                <td style="text-align: center">{{ item.list[4].value }}</td>
                <td style="text-align: center">{{ item.list[5].value }}%</td>
                <td style="text-align: center">{{ item.list[6].value }}</td>
                <td style="text-align: center">{{ item.list[7].value }}</td>
                <td style="text-align: center" class="nowrap">
                  {{ item.list[8].value }}
                </td>
              </tr>
            </tbody>
          </table>
          <defaultBox
            v-if="!playerInfo.a_team.length"
            style="margin-top: 20px"
            width="200px"
            height="200px"
            src="/images/battle_details.png"
            >暂无选手数据</defaultBox
          >
        </div>
        <div class="content content-2" v-if="playerInfo && playerInfo.b_team">
          <table class="custom-table" v-if="playerInfo.b_team.length">
            <thead>
              <tr>
                <td style="width: 150px; text-align: left" class="nowrap">
                  <img
                    :alt="playerInfo.team_away.team_id"
                    :src="playerInfo.team_away.team_img"
                    style="margin-right: 4px"
                  /><span
                    style="font-size:18px;font-weight:bold;"
                    >{{ playerInfo.team_away.team_short_name }}</span
                  >
                </td>
                <td
                  v-for="(item, index) in playerTableHeader"
                  :key="index"
                  :style="{
                    width: item.width,
                    textAlign: item.align ? item.align : 'left',
                  }"
                >
                  <img :src="item.icon" width="18" v-if="item.icon" />
                  <span>{{ item.name }}</span>
                </td>
              </tr>
            </thead>
            <tbody style="height:390px;overflow:hidden;">
              <tr v-for="(item, index) in playerInfo.b_team" :key="index">
                <td style="width: 150px" :alt="item.id">{{ item.name }}</td>
                <td style="text-align: center">{{ item.list[0].value }}</td>
                <td style="text-align: center">{{ item.list[1].value }}</td>
                <td style="text-align: center">{{ item.list[2].value }}</td>
                <td style="text-align: center">{{ item.list[3].value }}%</td>
                <td style="text-align: center">{{ item.list[4].value }}</td>
                <td style="text-align: center">{{ item.list[5].value }}%</td>
                <td style="text-align: center">{{ item.list[6].value }}</td>
                <td style="text-align: center">{{ item.list[7].value }}</td>
                <td style="text-align: center" class="nowrap">
                  {{ item.list[8].value }}
                </td>
              </tr>
            </tbody>
          </table>
          <defaultBox
            v-if="!playerInfo.b_team.length"
            style="margin-top: 20px"
            width="200px"
            height="200px"
            src="/images/battle_details.png"
            >暂无选手数据</defaultBox
          >
        </div>
      </div>

      <!-- 地图数据 -->
      <div class="map-session session">
        <app-title title="地图数据" type="1" color="#333" />
        <div class="content">
          <div class="swiper" v-if="liveData.mmi && liveData.mmi.length">
            <div class="arrow-left">
              <div
                class="arrow"
                @click="slidePrev"
                v-show="swpINDEX_ !== 0"
              ></div>
            </div>
            <div class="swiper-images">
              <div
                class="swiper-container"
                v-swiper:mySwiper="swiperOption"
                ref="swiper"
              >
                <div class="swiper-wrapper">
                  <div
                    v-for="(item, index) in liveData.mmi"
                    :key="index"
                    class="swiper-slide"
                  >
                    <div
                      style="height: 84px"
                      @click="handleClick(index)"
                      :class="mapINDEX_ === index ? 'actived' : ''"
                      class="swiper-item"
                    >
                      <img class="mappic" :src="item.map_info.cover" />
                      <div class="mapname" :map_id="item.map_info.map_id">
                        {{ item.map_info.map_name }}
                      </div>
                    </div>
                    <p class="score">
                      <span class="home">{{ item.map_info.score_a }}</span>
                      <span>:</span>
                      <span class="away">{{ item.map_info.score_b }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="arrow-right">
              <div
                class="arrow"
                v-show="liveData.mmi.length - 6 > swpINDEX_"
                @click="slideNext"
              ></div>
            </div>
          </div>
          <!-- 地图对战双方具体数据 -->
          <div
            class="map-detail-data"
            v-if="liveData.mmi && liveData.mmi.length"
          >
            <div class="team-info">
              <p class="title">战队</p>
              <span class="sencond-title">轮次</span>
              <div
                class="team home"
                :team_id="detailsTop.mnl.team_home.team_id"
              >
                <el-image
                  style="width: 22px"
                  fit="contain"
                  :src="detailsTop.mnl.team_home.team_img"
                >
                  <div slot="error" class="image-slot">
                    <default-img :size="22"></default-img>
                  </div>
                </el-image>
                <p class="team-name">
                  {{ detailsTop.mnl.team_home.team_short_name }}
                </p>
              </div>
              <div
                class="team away"
                :team_id="detailsTop.mnl.team_away.team_id"
              >
                <el-image
                  style="width: 22px"
                  fit="contain"
                  :src="detailsTop.mnl.team_away.team_img"
                >
                  <div slot="error" class="image-slot">
                    <default-img :size="22"></default-img>
                  </div>
                </el-image>
                <p class="team-name">
                  {{ detailsTop.mnl.team_away.team_short_name }}
                </p>
              </div>
            </div>

            <div
              class="first-half"
              v-if="
                liveData.mmi[mapINDEX_] && liveData.mmi[mapINDEX_].first_half
              "
            >
              <p class="title">上半场</p>
              <ul class="data-list">
                <li
                  v-for="(item, index) in liveData.mmi[mapINDEX_].first_half"
                  v-show="index"
                  :key="index"
                >
                  <span class="sencond-title">{{ item.title }}</span>
                  <div class="home">
                    <el-image
                      style="width: 20px"
                      :src="item.img_home"
                      v-show="item.img_home"
                    >
                      <div slot="error" class="image-slot">
                        <div
                          style="width: 20px; height: 20px; background: #ddd"
                        ></div>
                      </div>
                    </el-image>
                  </div>
                  <div>
                    <el-image
                      style="width: 20px"
                      :src="item.img_away"
                      v-show="item.img_away"
                    >
                      <div slot="error" class="image-slot">
                        <div
                          style="width: 20px; height: 20px; background: #ddd"
                        ></div>
                      </div>
                    </el-image>
                  </div>
                </li>
              </ul>
            </div>

            <div
              class="second-half"
              v-if="
                liveData.mmi[mapINDEX_] && liveData.mmi[mapINDEX_].secend_half
              "
            >
              <p class="title">下半场</p>
              <ul class="data-list">
                <li
                  v-for="(item, index) in liveData.mmi[mapINDEX_].secend_half"
                  v-show="index"
                  :key="index"
                >
                  <span class="sencond-title">{{ item.title }}</span>
                  <div class="home">
                    <el-image
                      style="width: 20px"
                      :src="item.img_home"
                      v-show="item.img_home"
                    >
                      <div slot="error" class="image-slot">
                        <div
                          style="width: 20px; height: 20px; background: #ddd"
                        ></div>
                      </div>
                    </el-image>
                  </div>
                  <div>
                    <el-image
                      style="width: 20px"
                      :src="item.img_away"
                      v-show="item.img_away"
                    >
                      <div slot="error" class="image-slot">
                        <div
                          style="width: 20px; height: 20px; background: #ddd"
                        ></div>
                      </div>
                    </el-image>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <defaultBox
            v-if="!liveData.mmi.length"
            style="margin-top: 40px"
            width="260px"
            height="260px"
            src="/images/match_list.png"
            >暂无地图数据</defaultBox
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NotStarted from "~/components/pages/home/noStarted"; // 倒计时组件
import { mapState } from "vuex";
import * as api from "@/api/matchDetail";
import defaultBox from "~/components/common/default";

export default {
  layout: "home",
  name: "",
  components: { NotStarted, defaultBox },
  async asyncData({ query, store }) {
    var _data = {
      theGameID: "csgo",
      matchId: query.match_id * 1,
      num: query.num * 1,
      status: 1, //比赛状态 1未开始 2进行中 3已结束
      detailsTop: {}, //头部数据
      //历史交锋
      historyData: {
        selectVal: 1,
        selectOpt: [
          {
            label: "10",
            value: 1,
          },
          {
            label: "20",
            value: 2,
          },
          {
            label: "30",
            value: 3,
          },
          {
            label: "40",
            value: 4,
          },
          {
            label: "50",
            value: 5,
          },
        ],
      },
      //近期数据统计
      nearlyData: {
        selectVal: 1,
        selectOpt: [
          {
            label: "10",
            value: 1,
          },
          {
            label: "20",
            value: 2,
          },
          {
            label: "30",
            value: 3,
          },
          {
            label: "40",
            value: 4,
          },
          {
            label: "50",
            value: 5,
          },
        ],
        barList: {},
        tableOne: [],
        tableTwo: [],
      },

      //地图数据
      mapVsData: {},

      // 选手阵容
      player: {
        a: 0,
        b: 0,
      },
      liveData: {},

      // 对局数据中间的bar
      matchBarData: [],

      // 选手数据
      playerInfo: {},
      pLayerSelect: {
        val: 0,
        opt: [
          { label: "default", value: 0 },
          { label: "de_dust", value: 1 },
        ],
      },

      // 地图数据
      swpINDEX_: 0, // 轮播页
      mapINDEX_: 0, // 选中页
    };

    //设置参数
    store.dispatch("matchDetail/_setParmars", {
      game_id: _data.theGameID,
      match_id: _data.matchId,
    });

    let topData = await store.dispatch("matchDetail/_getMatchTopData");
    if (topData) {
      if (topData.mnl) {
        _data.status = topData.mnl.status_id;
      }
      _data.detailsTop = topData;
    }

    // 未开始
    if (_data.status === 1) {
      // 历史交锋
      await store.dispatch("matchDetail/_getHistoryData", { subtype: 1 });
      _data.historyData.history_match_info =
        store.state.matchDetail.history_match_info;
      _data.historyData.history_battle_gkd =
        store.state.matchDetail.history_battle_gkd;
      // console.log("----------历史交锋--------", _data.historyData);

      //近期数据统计
      await store.dispatch("matchDetail/_getNearlyData", {
        subtype: 1,
        pagetype: 0,
      });
      _data.nearlyData.barList = store.state.matchDetail.nearlyData;

      // 近期对战数据 A
      await store.dispatch("matchDetail/_getNearlyData", {
        subtype: 1,
        pagetype: 1,
      });
      _data.nearlyData.tableOne = store.state.matchDetail.nearlyBatHomeData;

      // 近期对战数据 B
      await store.dispatch("matchDetail/_getNearlyData", {
        subtype: 1,
        pagetype: 2,
      });
      _data.nearlyData.tableTwo = store.state.matchDetail.nearlyBatAwayData;

      // 地图数据
      let mapVsData = await api.getMapData({
        game_id: _data.theGameID,
        match_id: _data.matchId,
      });
      _data.mapVsData = mapVsData;
      // console.log("地图数据", mapVsData);
    } else {
      // 进行中 和 已结束
      let game_num = store.state.matchDetail.game_num;
      let currentTab = _data.num ? Number(_data.num) : game_num.length;
      _data.pLayerSelect.val = currentTab; // 选手数据中地图下拉框筛选 默认值
      _data.mapINDEX_ = currentTab - 1; // 轮播图默认选中
      let LiveData = await api.getLiveData({
        game_id: _data.theGameID,
        match_id: _data.matchId,
        box_num: currentTab,
      });
      _data.liveData = LiveData;

      //对局数据中柱条图数据
      if (LiveData.ab_stat) {
        var _MatchBarData = [];
        // 容错处理
        if (LiveData.ab_stat.length) {
          for (let index = 0; index < LiveData.ab_stat.length; index++) {
            const element = LiveData.ab_stat[index];
            _MatchBarData.push({
              home: element.a_value * 1,
              away: element.b_value * 1,
              title: element.name,
              total: element.a_value * 1 + element.b_value * 1,
              type: element.type,
            });
          }
        }
        _data.matchBarData = _MatchBarData;
      }

      //选手数据中地图下拉框筛选
      if (LiveData.mmi) {
        var _maps_opt = [];
        _data.pLayerSelect.opt = [];
        for (let index = 0; index < LiveData.mmi.length; index++) {
          const element = LiveData.mmi[index];
          _maps_opt.push({
            label: element.map_info.map_name,
            value: element.map_info.round_num,
          });
        }
        _data.pLayerSelect.opt = _maps_opt;
      }

      // 选手数据
      let _playerInfoData = await api.getPlayerInfoData({
        game_id: _data.theGameID,
        match_id: _data.matchId,
      });
      _data.playerInfo = _playerInfoData;
    }

    return _data;
  },
  data() {
    var _this = this;
    return {
      swiperOption: {
        slidesPerView: 6, //一行显示3个
        spaceBetween: 9, //间隔30
        freeMode: false,
        observer: false,
        autoUpdate: false,
        observeParents: false,
        speed: 500, //滑动速度
        on: {
          slideChange: function (swiper) {
            _this.swpINDEX_ = swiper.realIndex;
          },
        },
      },
    };
  },
  computed: {
    ...mapState({
      historyTableHeader: (state) => state.teamDetail.historyTableHeader,
      nearTableHeader: (state) => state.teamDetail.nearTableHeader, // 表头(TF说比赛的所有表头都放这个里面了)
      mapTableHeader: (state) => state.teamDetail.mapTableHeader,
      playerTableHeader: (state) => state.teamDetail.playerTableHeader, // 选手数据表头
    }),
  },

  methods: {
    async getPlayerInfoData(box_num) {
      let _playerInfoData = await api.getPlayerInfoData({
        game_id: this.theGameID,
        match_id: this.matchId,
        box_num,
      });
      this.playerInfo = _playerInfoData;
      console.log("_playerInfoData", _playerInfoData);
    },
    async nearlyChange(subtype) {
      await this.$store.dispatch("matchDetail/_getNearlyData", {
        subtype,
        pagetype: 0,
      });
      this.nearlyData.barList = this.$store.state.matchDetail.nearlyData;

      // 近期对战数据 A
      await this.$store.dispatch("matchDetail/_getNearlyData", {
        subtype,
        pagetype: 1,
      });
      this.nearlyData.tableOne = this.$store.state.matchDetail.nearlyBatHomeData;

      // 近期对战数据 B
      await this.$store.dispatch("matchDetail/_getNearlyData", {
        subtype,
        pagetype: 2,
      });

      this.nearlyData.tableTwo = this.$store.state.matchDetail.nearlyBatAwayData;
    },

    async historyChange(subtype) {
      this.historyData.history_match_info = [];
      this.historyData.history_battle_gkd = [];
      await this.$store.dispatch("matchDetail/_getHistoryData", { subtype });
      this.historyData.history_match_info = this.$store.state.matchDetail.history_match_info;
      this.historyData.history_battle_gkd = this.$store.state.matchDetail.history_battle_gkd;
    },
    slidePrev() {
      this.mySwiper.slidePrev();
    },
    slideNext() {
      this.mySwiper.slideNext();
    },
    handleClick(index) {
      this.mapINDEX_ = index;
    },
    /**初始化雷达图 */
    initChart() {
      var player_a = this.liveData.play_a_team[this.player.a]
        ? this.liveData.play_a_team[this.player.a].list
        : [];
      var player_b = this.liveData.play_b_team[this.player.b]
        ? this.liveData.play_b_team[this.player.b].list
        : [];

      var R_a = [],
        R_b = [];

      for (let index = 1; index < 5; index++) {
        const elementA = player_a.length ? player_a[index].value * 1 : null;
        const elementB = player_b.length ? player_b[index].value * 1 : null;
        // console.log(elementA,elementB);
        if (elementA !== null && elementB !== null) {
          var _tmp = elementA + elementB;

          if (elementA !== 0) {
            R_a.push((elementA / _tmp) * 100);
          } else {
            R_a.push(0);
          }

          if (elementB !== 0) {
            R_b.push((elementB / _tmp) * 100);
          } else {
            R_b.push(0);
          }
        } else {
          if (elementA) R_a.push(100);
          if (elementB) R_b.push(100);
        }
      }

      this.$nextTick(() => {
        if (!this.$refs["radar"]) return false;

        var radarChart = {
          radar: {
            startAngle: 90,
            center: ["50%", "50%"],
            radius: 70,
            name: {
              textStyle: {
                color: "#666",
                fontSize: 12,
              },
            },
            indicator: [
              { text: "K/D", max: 100 },
              { text: "ARD", max: 100 },
              { text: "KAST", max: 100 },
              { text: "IMPACK", max: 100 },
            ],
            splitLine: {
              lineStyle: {
                color: [
                  "#ccc",
                  "#ccc",
                  "#ccc",
                  "#ccc",
                ],
                width: 2,
              },
            },
            axisLine: {
              lineStyle: {
                color: "#ccc",
                width: 2,
              },
            },
            splitArea: {
              show: false,
            },
          },
          series: [
            {
              // name: '预算 vs 开销（Budget vs spending）',
              type: "radar",
              tooltip: {
                trigger: "item",
              },
              areaStyle: {
                opacity: 0.2,
              },
              lineStyle: {
                width: 2,
                opacity: 1,
              },
              symbol: "none",
              data: [
                {
                  value: R_a,
                  name: "A",
                  itemStyle: {
                    color: "#33C6D6",
                  },
                },
                {
                  value: R_b,
                  name: "B",
                  itemStyle: {
                    color: "#F05365",
                  },
                },
              ],
            },
          ],
        };
        var myChart = this.$echarts.init(this.$refs["radar"]);
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(radarChart);
      });
    },
  },
  created() {},
  mounted() {
    console.log("-----------liveData--------\n", this.liveData); //debug;
    if (this.status !== 1) this.initChart();
  },
  watch: {
    player: {
      deep: true,
      handler: function (newV, oldV) {
        this.initChart();
      },
    },
  },
};
</script>
<style lang='less' scoped>
.nowrap {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.csgo-detail {
  margin-bottom: 20px;
  .custom-table {
    img {
      width: 20px;
      height: 20px;
    }
  }

  & > div {
    margin-top: 33px;
    .teams {
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > div {
        display: flex;
        align-items: center;
        width: 130px;
        .name {
          flex: 1;
          font-weight: bold;
        }
        &.home-team {
          text-align: right;
          .name {
            text-align: right;
            color: #33C6D6;
            margin-right: 12px;
          }
          .group {
            flex: 1;
            display: flex;
            align-items: center;
            .icon {
              flex: 1;
            }
            .miname {
              color: #333;
              max-width: 68px;
              margin: 0 4px;
            }
          }
        }
        &.away-team {
          text-align: left;
          .name {
            color: #F05365;
            margin-left: 12px;
          }
          .group {
            flex: 1;
            width: 100%;
            display: flex;
            align-items: center;
            .icon {
              flex: 1;
            }
            .miname {
              max-width: 68px;
              color: #333;
              margin: 0 4px;
            }
          }
        }
      }
      .vs {
        color: #999;
        font-size: 26px;
        padding: 0 10px;
        font-weight: bold;
        flex: 1;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        &.nopd {
          padding: 0;
          font-size: 0;
        }
        b {
          font-size: 26px;
          width: 31px;
          display: inline-block;
          color: #33C6D6;
          &.red {
            color: #F05365;
          }
        }
        i {
          font-size: 26px;
          width: 10px;
          display: inline-block;
          font-style: normal;
        }
      }
    }
    .row-box {
      margin-top: 26px;
      .row-bar-colum {
        margin-bottom: 16px;
      }
    }
    .live-session {
      display: flex;
      justify-content: space-between;
      .match-info {
        height: 488px;
        width: 392px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.6);
        margin-left: 12px;
        padding: 32px 24px 0 24px;
        &.vertical {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 0;
        }
        .team-status-str {
          color: #999;
          font-weight: bold;
          font-size: 24px;
          margin-top: 12px;
          text-align: center;
        }
        .win-rate {
          margin-top: 68px;
          & > .title {
            color: #ffffff;
            font-weight: 400;
            font-size: 16px;
            & > span {
              font-size: 12px;
              color: #888888;
            }
          }
        }
      }
    }
    .session {
      margin-top: 60px;
      .content {
        margin-top: 20px;
        border-radius: 6px;
        .table-header-right {
          display: flex;
          & > div {
            margin-left: 24px;
            font-size: 14px;
            color: #666;
          }
        }
        .pie-box {
          position: relative;
          text-align: center;
          height: 140px;
          overflow: hidden;
          .pie {
            z-index: 999;
            display: inline-block;
            canvas {
              z-index: 999;
            }
          }
          .team-pic {
            width: 100px;
            position: absolute;
            height: 100px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
      &.history-session {
        .content {
          display: flex;
          justify-content: space-between;
          overflow: hidden;
          height: 534px;

          .content-left {
            width: 796px;
            background: rgba(255, 255, 255, 0.6);
            padding: 16px 12px;
            .table-header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
              .table-header-left {
                display: flex;
                align-items: center;
                .cup-icon {
                  display: inline-block;
                  width: 22px;
                  height: 22px;
                  background: url("/images/cup.png") no-repeat 0 0;
                  background-size: 100% 100%;
                }
                p {
                  color: #6521D7;
                  font-weight: bold;
                  font-size: 18px;
                  margin-left: 6px;
                }
              }
            }
            .table-body {
              width: 100%;
            }
          }
          .content-right {
            flex: 1;
            margin-left: 12px;
            background: rgba(255, 255, 255, 0.6);
            padding: 18px 0;
            .content-right-title {
              padding: 0 12px;
              display: flex;
              align-items: center;
              margin-bottom: 12px;
              & > img {
                margin-right: 6px;
              }
              & > span {
                color: #6521D7;
                font-weight: bold;
                font-size: 18px;
              }
            }
            .win-rate-pie {
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 24px 0 28px 0;
              & > div {
                position: relative;
                .data {
                  font-size: 14px;
                  font-weight: bold;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
                &.home {
                  .data {
                    color: #33C6D6;
                  }
                }
                &.away {
                  .data {
                    color: #F05365;
                  }
                }
              }
              .sl {
                padding: 0 44px;
                font-size: 12px;
              }
            }
            .row-box {
              //   padding: 0 24px;
              .row-bar {
                margin-bottom: 10px;
              }
            }
          }
        }
      }
      &.near-data-session {
        .content {
          height: 355px;
          background: rgba(255, 255, 255, 0.6);

          .table-header-right {
            justify-content: center;
            padding: 24px 0;
          }
          .body {
            display: flex;
            justify-content: center;

            .bar-box {
              width: 416px;
              margin: 0 92px;
              .row-bar-colum {
                margin-top: 12px;
              }
            }
            .title {
              text-align: center;
              font-size: 24px;
              font-weight: bold;
              color: #333;
              .line {
                width: 44px;
                height: 4px;
                background:#33C6D6;
                opacity: 1;
                border-radius: 12px;
                margin: 0 auto;
                margin-top: 8px;
                margin-bottom: 20px;
              }
            }
            .rote,
            .sl {
              text-align: center;
              font-size: 14px;
              text-align: center;
              color: #666;
              &.sl {
                padding: 8px 0;
              }
            }
            .home {
              position: relative;
              .rote {
                color: #33C6D6;
              }
            }
            .away {
              position: relative;
              .rote {
                color: #F05365;
              }
              .line {
                background: #F05365;
              }
            }
          }
        }
      }
      &.near-prok-session {
        .content {
          height: 534px;
          // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
          background:rgba(51, 198, 214, 0.2);
          
          &.content-2 {
            background: rgba(240, 83, 101, 0.2);
          }
          & > table {
            padding-left: 38px;
          }
          & > .title {
            display: flex;
            justify-content: space-between;
            padding: 12px 24px 24px 24px;
            .title-left {
              display: flex;
              align-items: center;
              color: #333;
              font-size: 18px;
              font-weight: bold;
              .team-name {
                margin-left: 4px;
              }
            }
          }
        }
      }
      &.map-session {
        .content {
          min-height: 400px;
          // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
          background: rgba(255, 255, 255, 0.6);
          & > table {
            padding-left: 30px;
            .map-container {
              border-radius: 4px;
              width: 170px;
              height: 103px;
              background: #fff;
            }
            td > div {
              padding-top: 16px;
              &:first-child {
                padding-bottom: 16px;
                padding-top: 0;
              }
            }
            thead {
              padding-right: 20px;
            }
            tbody > tr {
              position: relative;
              &::after {
                content: "  ";
                left: 250px;
                bottom: 53px;
                right: 48px;
                position: absolute;
                border-top: 1px solid #fff;
                opacity: 0.1;
              }
              td {
                text-align: center;
                width: 128px;
              }
            }
          }
        }
      }
    }
  }
  .started {
    .theafterdata {
      h5 {
        font-size: 16px;
        font-weight: bold;
        line-height: 21px;
        color: #6521D7;
        text-align: center;
        margin: 12px 0;
      }
      table {
        width: 100%;
        font-size: 14px;
        color: #333;
        tr {
          height: 30px;
          line-height: 30px;
          img {
            width: 22px;
            height: 22px;
            object-fit: contain;
            margin: 0 4px;
          }
        }
        th {
          background: rgba(51, 198, 214, 0.2);
          line-height: 30px;
          color: #666;
        }
        td {
          text-align: center;
        }
        &:last-child {
          th {
            background:rgba(240, 83, 101, 0.2);
          }
        }
      }
    }
    .live-session {
      display: flex;
      justify-content: space-between;
      .live-player {
        width: 796px;
        height: 488px;
        background: rgba(255, 255, 255, 0.6);
        // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
        border-radius: 6px;
        overflow: hidden;
      }
    }
    & > .pock-session {
      .content {
        height: 373px;
        background: rgba(255, 255, 255, 0.6);
        padding-top: 30px;
        .body {
          display: flex;
          justify-content: center;
          .ico_data {
            height: 20px;
            display: flex;
            margin-top: 10px;
            span {
              font-size: 16px;
              line-height: 20px;
              margin: 0 10px;
              width: 46px;
              img {
                width: 20px;
                height: 20px;
                vertical-align: top;
                margin-right: 6px;
              }
            }
          }
          .bar-box-row {
            width: 416px;
            margin: 0 44px;
            .row-bar {
              margin-bottom: 20px;
            }
            & > .box {
              display: flex;
              justify-content: center;
              text-align: center;
              margin-bottom: 46px;
              & > li {
                padding: 0 20px;
                & > p {
                  font-size: 14px;
                  color: #fff;
                  margin-bottom: 4px;
                }
                & > span {
                  font-weight: bold;
                  font-size: 16px;
                  color: #888888;
                  &.home {
                    color: #8b65ff;
                  }
                  &.away {
                    color: #eb47b1;
                  }
                }
              }
            }
          }
          .title {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #333;
            .line {
              width: 44px;
              height: 4px;
              background: #33C6D6;
              opacity: 1;
              border-radius: 12px;
              margin: 0 auto;
              margin-top: 8px;
              margin-bottom: 20px;
            }
          }
          .rote,
          .sl {
            text-align: center;
            font-size: 14px;
            text-align: center;
            color: #666;
            &.sl {
              padding: 8px 0;
            }
          }
          .home {
            position: relative;
            .rote {
              color: #33C6D6;
            }
          }
          .away {
            position: relative;
            .rote {
              color: #F05365
            }
            .line {
              background:#F05365;
            }
          }
        }
      }
    }
    // 选手阵容
    & > .player-lineup-session {
      .content {
        height: 452px;
        background: rgba(255, 255, 255, 0.6);
        // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
        padding: 42px 60px 0 60px;
        .players-list {
          display: flex;

          & > div {
            flex: 1;
            display: flex;
            align-items: center;
            .team-info {
              display: flex;
              .team-detail {
                & > .name {
                  font-size: 18px;
                  font-weight: bold;
                }
                & > .level {
                  font-size: 14px;
                  color: #333;
                }
              }
            }
            .player-item {
              display: flex;
              & > li {
                font-size: 0;
                padding: 0 10px;
                cursor: pointer;
                & > p {
                  font-size: 14px;
                  color: #666;
                  text-align: center;
                }
                &.active {
                  & > p {
                    // font-weight: bold;
                    color: #333;
                  }
                }
              }
            }
            &.home {
              .team-detail {
                margin-left: 8px;
                margin-right: 14px;
                .name {
                  color: #33C6D6;
                }
              }
            }
            &.away {
              display: flex;
              justify-content: flex-end;

              .team-detail {
                margin-right: 8px;
                margin-left: 14px;
                .name {
                  color: #F05365;
                  text-align: right;
                }
              }
            }
          }
        }
        .player-detail {
          margin-top: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          .echarts-content {
            margin: 0 58px;
          }
          .home-player,
          .away-player {
            text-align: center;
            .name {
              font-size: 24px;
              font-weight: bold;
            }
            .line {
              height: 4px;
              width: 44px;
              border-radius: 6px;
              margin: 0 auto;
              margin-top: 8px;
              margin-bottom: 10px;
            }
            .score {
              font-size: 14px;
              font-weight: bold;
            }
            &.home-player {
              .line {
                background:#33C6D6;
              }
              .score {
                color:#33C6D6;
              }
            }
            &.away-player {
              .line {
                background:#F05365;
              }
              .score {
                color:#F05365;
              }
            }

            .position {
              font-size: 14px;
              color: #999;
              margin-top: 8px;
            }
          }
        }
      }
    }
    & > .player-session {
      .content {
        padding-top: 10px;
        height: 288px;
        // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
        background:rgba(51, 198, 214, 0.2);
        &.content-2 {
          background: rgba(240, 83, 101, 0.2);
        }
        & > table {
          padding-left: 38px;
          padding-right: 80px;
        }
        & > .title {
          display: flex;
          justify-content: space-between;
          padding: 12px 24px 24px 24px;
          .title-left {
            display: flex;
            align-items: center;
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            .team-name {
              margin-left: 4px;
            }
          }
        }
      }
    }
    & > .map-session {
      .content {
        background: transparent !important;
        & > div.swiper {
          display: flex;
          align-items: center;
          .swiper-images {
            flex: 1;
            height: 84px;
            width: 90%;
            .swiper-item {
              border-radius: 4px;
              position: relative;
              overflow: hidden;
              .mappic {
                width: 100%;
                height: 84px;
                object-fit: cover;
                border-radius: 4px;
              }
              .mapname {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                text-align: center;
                line-height: 80px;
                color: #fff;
                background: rgba(0, 0, 0, 0.3);
              }
              &:hover {
                cursor: pointer;
                
              }
              border: 2px solid transparent;
              &.actived {
                border: 2px solid #801EF4;
              }
            }
            .score {
              text-align: center;
              padding-top: 4px;
              font-weight: bold;
              font-size: 18px;
              & > span{
                color: #999;
              }
              & > .home {
                color: #33C6D6;
              }
              & > .away {
                color: #F05365;
              }
            }
          }
          .arrow-right,
          .arrow-left {
            width: 48px;
            height: 84px;
            position: relative;
            & > .arrow {
              width: 18px;
              height: 18px;
              position: absolute;
              top: 50%;
              right: 0;
              margin-top: -9px;
              background: url("/images/arrow-right.png") no-repeat 0 0;
              background-size: 100% 100%;
              &:hover {
                background: url("/images/arrow-right-hover.png") no-repeat 0 0;
                background-size: 100% 100%;
                cursor: pointer;
              }
            }
            &.arrow-left {
              & > .arrow {
                left: 0;
                background: url("/images/arrow-left.png") no-repeat 0 0;
                background-size: 100% 100%;
                &:hover {
                  background: url("/images/arrow-right-hover.png") no-repeat 0 0;
                  background-size: 100% 100%;
                  cursor: pointer;
                  transform: rotateY(180deg);
                }
              }
            }
          }
        }
        .map-detail-data {
          height: 200px;
          background: rgba(255, 255, 255, 0.6);
          // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
          border-radius: 0px 0px 6px 6px;
          margin: 0 48px;
          margin-top: 50px;
          padding: 17px 16px 15px 16px;
          overflow: hidden;
          display: flex;
          .sencond-title {
            display: flex;
            font-size: 14px;
            color: #737373;
            height: 30px;
            line-height: 30px;
            margin: 16px 0 12px 0;
          }
          .team-info {
            width: 190px;
            .team {
              display: flex;
              align-items: center;
              .team-name {
                margin-left: 4px;
                font-weight: bold;
                font-size: 14px;
              }
              &.home {
                margin-bottom: 31px;
              }
            }
          }
          .first-half,
          .second-half {
            flex: 1;
            text-align: center;
            .data-list {
              display: flex;
              padding: 0 14px;
              & > li {
                flex: 1;
                & > .sencond-title {
                  text-align: center;
                  display: inherit;
                }
                & > div {
                  width: 20px;
                  height: 20px;
                  overflow: hidden;
                  margin: 0 auto;
                  &.home {
                    margin-bottom: 31px;
                  }
                }
              }
            }
            .title {
              font-size: 16px;
              color: #666;
            }
            &.first-half {
              position: relative;
              &:after {
                position: absolute;
                content: "";
                right: 0;
                bottom: -50px;
                width: 0;
                top: -20px;
                height: 210px;
                border-right: 1px solid rgba(204, 204, 204, 0.6);
              }
            }
          }
        }
      }
    }
  }
}
</style>