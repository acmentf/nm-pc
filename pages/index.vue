<template>
  <div class="main-box">
    <appCarousel></appCarousel>
    <div class="main-box-child">
      <div class="aside-box">
        <!-- 边栏——战队排行 -->
        <div class="teamRanking-box">
          <div class="teamRanking-child">
            <h3>
              <img
                style="margin: 0 6px 0 0"
                width="22px"
                height="22px"
                src="/images/team_ranking.png"
                alt="战队排行"
              />
              <span style="font-size:18px;font-weight:bold;color:#6521D7">战队排行</span>
            </h3>
            <p>
              <span
                class="teamRanking-tabs"
                :class="{
                  active: teamRankingActive == 'DOTA2',
                }"
                @click="teamRankingActive = 'DOTA2'"
              >DOTA2</span>
              <span
                class="teamRanking-tabs"
                :class="{ active: teamRankingActive == 'CSGO' }"
                @click="teamRankingActive = 'CSGO'"
              >CSGO</span>
              <span
                class="teamRanking-tabs"
                :class="{ active: teamRankingActive == 'LOL' }"
                @click="teamRankingActive = 'LOL'"
              >LOL</span>
            </p>

            <div
              class="teamRanking-table"
              :style="{
                display: teamRankingActive == 'DOTA2' ? '' : 'none',
              }"
            >
              <p style="margin: 0 12px 12px 12px">
                <span class="table-title">排名</span>
                <span class="table-title" style="margin-right: 35px">国籍/战队</span>
                <span class="table-title" style="margin-right: 0">积分</span>
              </p>
              <p
                class="teamRanking-table-cell"
                style="margin: 5px 0; display: flex"
                v-for="(item, index) in teamRanking.DOTA2"
                :key="index"
                @click="toTeamRanking(item.team_id, 'dota2')"
                :team_id="item.team_id"
              >
                <span class="table-cell1">
                  <img
                    v-if="item.team_rank == 1"
                    width="16px"
                    height="16px"
                    src="/images/1.png"
                    alt="1"
                  />
                  <img
                    v-else-if="item.team_rank == 2"
                    width="16px"
                    height="16px"
                    src="/images/2.png"
                    alt="2"
                  />
                  <img
                    v-else-if="item.team_rank == 3"
                    width="16px"
                    height="16px"
                    src="/images/3.png"
                    alt="3"
                  />
                  <span v-else>{{ item.team_rank }}</span>
                </span>
                <span class="table-cell2">
                  <img
                    style="margin-right: 4px"
                    width="16px"
                    height="12px"
                    :src="item.country_img_url"
                    onerror="this.src='/images/country_default.png';this.onerror=null"
                  />
                  <span class="table-cell2-text" :title="item.team_name">{{ item.team_name }}</span>
                </span>
                <span class="table-cell3" style>{{ item.score }}</span>
              </p>
            </div>

            <div
              class="teamRanking-table"
              :style="{
                display: teamRankingActive == 'CSGO' ? '' : 'none',
              }"
            >
              <p style="margin: 0 12px 12px 12px">
                <span class="table-title">排名</span>
                <span class="table-title" style="margin-right: 35px">国籍/战队</span>
                <span class="table-title" style="margin-right: 0">积分</span>
              </p>
              <p
                class="teamRanking-table-cell"
                style="margin: 5px 0; display: flex"
                v-for="(item, index) in teamRanking.CSGO"
                :key="index"
                @click="toTeamRanking(item.team_id, 'csgo')"
                :team_id="item.team_id"
              >
                <span class="table-cell1">
                  <img
                    v-if="item.team_rank == 1"
                    width="16px"
                    height="16px"
                    src="/images/1.png"
                    alt="1"
                  />
                  <img
                    v-else-if="item.team_rank == 2"
                    width="16px"
                    height="16px"
                    src="/images/2.png"
                    alt="2"
                  />
                  <img
                    v-else-if="item.team_rank == 3"
                    width="16px"
                    height="16px"
                    src="/images/3.png"
                    alt="3"
                  />
                  <span v-else>{{ item.team_rank }}</span>
                </span>
                <span class="table-cell2">
                  <img
                    style="margin-right: 4px"
                    width="16px"
                    height="12px"
                    :src="item.country_img_url"
                    onerror="this.src='/images/country_default.png';this.onerror=null"
                  />
                  <span class="table-cell2-text" :title="item.team_name">{{ item.team_name }}</span>
                </span>
                <span class="table-cell3" style>{{ item.score }}</span>
              </p>
            </div>

            <div
              class="teamRanking-table"
              :style="{
                display: teamRankingActive == 'LOL' ? '' : 'none',
              }"
            >
              <p style="margin: 0 12px 12px 12px">
                <span class="table-title">排名</span>
                <span class="table-title" style="margin-right: 35px">国籍/战队</span>
                <span class="table-title" style="margin-right: 0">积分</span>
              </p>
              <p
                class="teamRanking-table-cell"
                style="margin: 5px 0; display: flex"
                v-for="(item, index) in teamRanking.LOL"
                :key="index"
                @click="toTeamRanking(item.team_id, 'lol')"
                :team_id="item.team_id"
              >
                <span class="table-cell1">
                  <img
                    v-if="item.team_rank == 1"
                    width="16px"
                    height="16px"
                    src="/images/1.png"
                    alt="1"
                  />
                  <img
                    v-else-if="item.team_rank == 2"
                    width="16px"
                    height="16px"
                    src="/images/2.png"
                    alt="2"
                  />
                  <img
                    v-else-if="item.team_rank == 3"
                    width="16px"
                    height="16px"
                    src="/images/3.png"
                    alt="3"
                  />
                  <span v-else>{{ item.team_rank }}</span>
                </span>
                <span class="table-cell2">
                  <img
                    style="margin-right: 4px"
                    width="16px"
                    height="12px"
                    :src="item.country_img_url"
                    onerror="this.src='/images/country_default.png';this.onerror=null"
                  />
                  <span class="table-cell2-text" :title="item.team_name">{{ item.team_name }}</span>
                </span>
                <span class="table-cell3" style>{{ item.score }}</span>
              </p>
            </div>

            <!-- <defaultBox style="margin-top:68px"  width="150px" height="150px" src="/images/team_top_default.png">暂无排行</defaultBox> -->
          </div>
        </div>
        <download></download>
      </div>
      <div style="width:998px;position:relative;margin-bottom:20px;">
        <asideTabsNav />
        <p class="sort-text" @click="sortSwitch">
          <img width="20px" height="20px" src="/images/refresh.png" alt="刷新" />
          <span v-if="sortType">赛事排序</span>
          <span v-else>时间排序</span>
        </p>
      </div>

      
      
      

      <!--赛事排序 -->
      <div class="tiem-centent-box" v-if="sortType">
        <div v-if="matchList.processing && matchList.processing.length" class="body-box">
          <!--body——进行中 -->
          <div class="body-centent-box notbg">
            <p class="title-text">
              <img
                width="22px"
                height="22px"
                style="margin-right: 6px"
                src="/images/processing.png"
                alt="进行中"
              />进行中
            </p>

            <div class="processing-box">
              <template v-for="(group, key) in matchList.processing">
                <div
                  class="processing-child"
                  v-for="(item, index) in group.group_item"
                  :key="index"
                  @click="toProcessing(item.base.match_id, item.game_id)"
                >
                  <p class="active-box">
                    <span class="aleft">
                      <img
                        style="margin-right: 4px"
                        width="18px"
                        height="18px"
                        :src="'/images/' + item.game_id.toLowerCase() + '.png'"
                      />
                      <span class="title">
                        {{ item.game_id.toUpperCase() }}
                        ·
                        {{ item.base.tournament_name }}
                      </span>
                    </span>
                    <span class="acenter">
                      {{ item.info.title }}&nbsp;{{
                      $utils.realFormatSecond(item.info.live_time)
                      }}
                    </span>
                    <span class="aright">
                      {{
                      item.base.box
                      }}
                    </span>
                  </p>
                  <p class="match-info">
                    
                    <span class="title-box">


                      <span class="title-box-item">
                        <img
                          v-if="item.info.home.economic && item.info.home.economic > 0"
                          style="margin-right: 4px"
                          width="10px"
                          height="10px"
                          src="/images/arrowup_b.png"
                        />
                        <span
                          v-if="item.info.home.economic && item.info.home.economic > 0"
                          class="title-one"
                          style="color: #33C6D6"
                        >{{ (item.info.home.economic / 1000).toFixed(2) }}k</span>
                        <img
                          v-if="item.info.home.economic"
                          style="margin: 0 6px 0 2px"
                          width="16px"
                          height="16px"
                          src="/images/lead_b.png"
                        />
                        <span
                          class="title-two"
                          style="color:#333"
                        >{{ item.base.home.team_short_name }}</span>
                      </span>
                      <span class="title-icon">
                        <el-image :src="item.base.home.team_img" :title="item.base.home.team_short_name" :team_id="item.base.home.team_id" fit="contain" lazy>
                          <img slot="placeholder"  src="/images/team_default.png" />
                          <img slot="error" src="/images/team_default.png" />
                        </el-image>
                        <b>{{item.info.home.score}}</b>
                        <i>-</i>
                        <b class="red">{{item.info.away.score}}</b>
                        <el-image :src="item.base.away.team_img" :title="item.base.away.team_short_name" :team_id="item.base.away.team_id" fit="contain" lazy>
                          <img slot="placeholder"  src="/images/team_default.png" />
                          <img slot="error" src="/images/team_default.png" />
                        </el-image>
                      </span>
                      <span class="title-box-item" style="text-align:left">
                        <span
                          class="title-two"
                          style="color:#333"
                        >{{ item.base.away.team_short_name }}</span>
                        <img
                          v-if="item.info.away.economic"
                          style="margin: 0 2px 0 6px"
                          width="16px"
                          height="16px"
                          src="/images/lead_r.png"
                        />
                        <span
                          v-if="item.info.away.economic && item.info.away.economic > 0"
                          class="title-one"
                          style="color: #F05365"
                        >{{ (item.info.away.economic / 1000).toFixed(2) }}k</span>
                        <img
                          v-if="item.info.away.economic && item.info.away.economic > 0"
                          style="margin-left: 4px"
                          width="10px"
                          height="10px"
                          src="/images/arrowup_r.png"
                        />
                      </span>

                      
                    </span>
                    <!-- <img
                        style="position: absolute; top:0;right:0"
                        width="24px"
                        height="24px"
                        src="/images/live.png"
                        alt="直播中"
                      /> -->
                  </p>
                  <p class="full-spot" style="display:flex;">
                    <span class="full-item"
                      :title="
                        $utils.formatime(
                          item.base.match_time * 1000,
                          'yyyy-MM-dd hh:mm'
                        )
                      "
                    >
                      {{
                      $utils.formatime(item.base.match_time * 1000, "hh:mm")
                      }}
                    </span>
                    <span class="mid">
                      <span class="title-three" :score="item.info.home.score">{{item.info.home.global_score}}</span>
                      <span class="title-four">全场</span>
                      <span class="title-three" :score="item.info.away.score">{{ item.info.away.global_score}}</span>
                    </span>
                    <span class="full-item rl" >
                      <template v-if="item.info.room_persons">
                        <img
                        src="/images/audience.png"
                        width="16px"
                        height="16px"
                        style="margin-right: 5px"
                      />
                      {{ item.info.room_persons }}

                      </template>
                      
                    </span>
                  </p>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!--——未开始 -->
        <div class="body-box">
          <p class="title-text">
              <img
                width="22px"
                height="22px"
                style="margin-right: 6px"
                src="/images/not_started.png"
                alt="未开始"
              />未开始
            </p>
          <div class="body-centent-box">
            <div v-if="matchList.notstarted && matchList.notstarted.length">
              <div
                class="body-centent-table"
                style="margin-bottom: 8px"
                v-for="(group, key) in matchList.notstarted"
                :key="key"
              >
                <p class="time">{{ group.group_str }}</p>
                <p
                  class="table-box"
                  v-for="(item, index) in group.group_item"
                  :key="index"
                  @click="toNotStarted(item.base.match_id, item.game_id)"
                >
                  <span class="gameName">
                    <img
                      v-if="item.game_id"
                      width="18px"
                      height="18px"
                      :src="'/images/' + item.game_id.toLowerCase() + '.png'"
                      :alt="item.game_id"
                    />
                    {{ item.game_id ? item.game_id.toUpperCase() : "" }}
                  </span>
                  <span
                    class="gameTime"
                    :title="
                      $utils.formatime(
                        item.base.match_time * 1000,
                        'yyyy-MM-dd hh:mm'
                      )
                    "
                  >{{ $utils.formatime(item.base.match_time * 1000, "hh:mm") }}</span>
                  <span class="playName">{{ item.base.tournament_name }}</span>
                  <span class="gameVs">
                    <span class="gameVsName" :team_id="item.base.home.team_id">
                      <span>
                        <i>
                          <!-- <img src="/images/victory_b.png"/> -->
                        </i>
                        <b>{{ item.base.home.team_short_name }}</b>
                      </span>
                    </span>
                    <el-image :src="item.base.home.team_img" :title="item.base.home.team_short_name" :team_id="item.base.home.team_id" fit="contain" lazy>
                      <img slot="placeholder"  src="/images/team_default.png" />
                      <img slot="error" src="/images/team_default.png" />
                    </el-image>
                    <span class="gameVs-text">vs</span>
                    <el-image :src="item.base.away.team_img" :title="item.base.away.team_short_name" :team_id="item.base.away.team_id" fit="contain" lazy>
                      <img slot="placeholder"  src="/images/team_default.png" />
                      <img slot="error" src="/images/team_default.png" />
                    </el-image>
                    <span class="gameVsName red" :team_id="item.base.away.team_id">
                      <span>
                        <b>{{ item.base.away.team_short_name }}</b>
                        <i>
                          <!-- <img src="/images/victory_b.png"/> -->
                        </i>
                      </span>
                    </span>
                  </span>
                  <span class="gameRule">{{ item.base.box }}</span>
                </p>
              </div>
            </div>
            <defaultBox
              v-else
              width="260px"
              height="260px"
              src="/images/processing_default.png"
              style="padding-bottom: 30px"
            >暂无赛程</defaultBox>
          </div>
        </div>

        <!--—已结束 -->
        <div class="body-box">
          <p class="title-text">
              <img
                width="22px"
                height="22px"
                style="margin-right: 6px"
                src="/images/over.png"
                alt="已结束"
              />已结束
            </p>
          <div class="body-centent-box">
            <div v-if="matchList.endover && matchList.endover.length">
              <div
                class="body-centent-table"
                style="margin-bottom: 8px"
                v-for="(group, key) in matchList.endover"
                :key="key"
              >
                <p class="time" style="color: #666; margin: 0 0 12px 11px">{{ group.group_str }}</p>
                <p
                  class="table-box"
                  v-for="(item, index) in group.group_item"
                  :key="index"
                  @click="toOver(item.base.match_id, item.game_id)"
                >
                  <span class="gameName">
                    <img
                      v-if="item.game_id"
                      width="18px"
                      height="18px"
                      :src="'/images/' + item.game_id.toLowerCase() + '.png'"
                      :alt="item.game_id"
                    />
                    {{ item.game_id ? item.game_id.toUpperCase() : "" }}
                  </span>
                  <span
                    class="gameTime"
                    :title="
                      $utils.formatime(
                        item.base.match_time * 1000,
                        'yyyy-MM-dd hh:mm'
                      )
                    "
                  >{{ $utils.formatime(item.base.match_time * 1000, "hh:mm") }}</span>
                  <span class="playName">{{ item.base.tournament_name }}</span>
                  <span class="gameVs">
                    <span class="gameVsName" :team_id="item.base.home.team_id">
                      <span>
                        <i>
                          <img v-if="item.info.home.win" src="/images/victory_b.png" />
                        </i>
                        <b>{{ item.base.home.team_short_name }}</b>
                      </span>
                    </span>
                    <el-image :src="item.base.home.team_img" :title="item.base.home.team_short_name" :team_id="item.base.home.team_id" fit="contain" lazy>
                      <img slot="placeholder"  src="/images/team_default.png" />
                      <img slot="error" src="/images/team_default.png" />
                    </el-image>
                    <span class="gameVs-text fgroup">
                      <b>{{ item.base.home_score }}</b>
                      <i>:</i>
                      <b>{{ item.base.away_score }}</b>
                    </span>
                    <el-image :src="item.base.away.team_img" :title="item.base.away.team_short_name" :team_id="item.base.away.team_id" fit="contain" lazy>
                      <img slot="placeholder"  src="/images/team_default.png" />
                      <img slot="error" src="/images/team_default.png" />
                    </el-image>
                    <span class="gameVsName red">
                      <span>
                        <b>{{ item.base.away.team_short_name }}</b>
                        <i>
                          <img v-if="item.info.away.win" src="/images/victory_r.png" />
                        </i>
                      </span>
                    </span>
                  </span>
                  <span class="gameRule">{{ item.base.box }}</span>
                </p>
              </div>
            </div>
            <defaultBox
              v-else
              width="260px"
              height="260px"
              src="/images/processing_default.png"
              style="padding-bottom: 30px"
            >暂无赛程</defaultBox>
          </div>
        </div>
      </div>

      <!--时间排序 -->
      <div class="tiem-centent-box" v-else>
        <div
          class="body-box"
          style="margin-bottom: 24px"
          v-for="(group, key) in matchList.sortList"
          :key="key"
        >
          <div v-if="group.group_item && group.group_item.length" class="body-centent-box">
            <p
              class="title-text bgActive"
              @click="toSportingEvent(group.tournament_id, group.game_idstr)"
            >
              <img
                style="margin-right: 6px"
                width="22px"
                height="22px"
                :src="group.group_icon"
                onerror="this.src='/images/league_default.png';this.onerror=null"
                :alt="group.group_str"
              />
              {{ group.group_str }}
            </p>
            <div style="margin-bottom: 8px">
              <p
                class="table-box"
                v-for="(item, index) in group.group_item"
                :key="index"
                :ppppp="
                  item.base.match_id +
                  ',' +
                  item.game_id +
                  ',' +
                  item.info.status_id
                "
                @click="
                  toSingleField(
                    item.base.match_id,
                    item.game_id,
                    item.info.status_id
                  )
                "
              >
                <span class="gameName" style="width: 100px">
                  <img
                    width="18px"
                    height="18px"
                    :src="'/images/' + item.game_id.toLowerCase() + '.png'"
                    :alt="item.game_id"
                  />
                  {{ item.game_id ? item.game_id.toUpperCase() : "" }}
                </span>
                <span style="width: 130px; padding: 0">
                  {{
                  $utils.formatime(
                  item.base.match_time * 1000,
                  "yyyy-MM-dd hh:mm"
                  )
                  }}
                </span>
                <span class="score">
                  <span class="left-box">
                    <img
                      v-if="item.info.home.win"
                      width="20px"
                      height="20px"
                      src="/images/victory_b.png"
                    />
                    <span
                      v-if="
                        item.info.home.economic && item.info.home.economic > 0
                      "
                      class="economy"
                    >
                      <img
                        style="margin-right: 4px"
                        width="10px"
                        height="10px"
                        src="/images/arrowup_b.png"
                      />
                      <span
                        class="title-one"
                        style="color: #33C6D6"
                      >{{ item.info.home.economic / 1000 }}k</span>
                      <img
                        style="margin: 0 6px 0 2px"
                        width="16px"
                        height="16px"
                        src="/images/lead_b.png"
                      />
                    </span>

                    <span class="gameVsName">
                      {{
                      item.base.home.team_short_name
                      }}
                    </span>
                    <el-image :src="item.base.home.team_img" :title="item.base.home.team_short_name" :team_id="item.base.home.team_id" fit="contain" lazy>
                      <img slot="placeholder"  src="/images/team_default.png" />
                      <img slot="error" src="/images/team_default.png" />
                    </el-image>
                  </span>
                  <span class="mid-box">
                    <template v-if="item.base.status_id > 1">
                      <span class="left">{{ item.base.home_score }}</span>
                      <b>:</b>
                      <span class="right">{{ item.base.away_score }}</span>
                    </template>
                    <template v-else>vs</template>
                  </span>
                  <span class="right-box">
                    <el-image :src="item.base.away.team_img" :title="item.base.away.team_short_name" :team_id="item.base.away.team_id" fit="contain" lazy>
                      <img slot="placeholder"  src="/images/team_default.png" />
                      <img slot="error" src="/images/team_default.png" />
                    </el-image>
                    <span class="gameVsName">
                      {{
                      item.base.away.team_short_name
                      }}
                    </span>
                    <span
                      class="economy"
                      v-if="
                        item.info.away.economic && item.info.away.economic > 0
                      "
                    >
                      <img width="16px" height="16px" src="/images/lead_r.png" />
                      <span
                        style="
                          font-size: 14px;
                          font-weight: 400;
                          color: #F05365;
                        "
                      >{{ item.info.away.economic / 1000 }}k</span>
                      <img
                        style="margin-left: 4px"
                        width="10px"
                        height="10px"
                        src="/images/arrowup_r.png"
                      />
                    </span>
                    <img
                      v-if="item.info.away.win"
                      width="20px"
                      height="20px"
                      src="/images/victory_r.png"
                    />
                  </span>
                </span>
                <span class="gameTime">
                  <!-- {{(item.base.status_id===2)?(item.info.title + '&nbsp;' +$utils.realFormatSecond(item.info.live_time)):'&nbsp;'}} -->
                  {{ item.base.status_id === 2 ? item.info.title : "&nbsp;" }}
                </span>
                <span class="time" style="color:#999">
                  {{
                  item.base.box
                  }}
                </span>
              </p>
            </div>
          </div>
          <defaultBox
            v-else
            style="margin-top: 20px"
            width="100px"
            height="100px"
            src="/images/processing_default.png"
          >暂无赛程</defaultBox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/home";
import { mapGetters } from "vuex";
import defaultBox from "~/components/common/default";
import download from "~/components/header/download";
import appCarousel from "~/components/common/appCarousel";
import asideTabsNav from "~/components/common/asideTabsNav";

export default {
  layout: "home",
  name: "main-box",
  components: {
    appCarousel,
    defaultBox,
    download,
    asideTabsNav
  },
  async asyncData({ app, params, query, store, env, $config }) {
    var _data = {
      theGameID: query.game || store.state.common.game_id,
      matchList: {
        processing: [],
        notstarted: [],
        endover: [],
        sortList: []
      },
      sortType: true,
      sortRun: false,

      teamRankingActive: "DOTA2",
      teamRanking: {
        LOL: [],
        CSGO: [],
        DOTA2: []
      }
    };
    if (_data.theGameID) {
      if (_data.theGameID === "all") {
        _data.teamRankingActive = "DOTA2";
      } else {
        _data.teamRankingActive = _data.theGameID.toUpperCase();
      }
    }


    if(process.client) return _data; // 首页性能调优 byFeikeQ

    var _style = _data.sortType ? 1 : 2;
    let _matchList = await api.getMatchList({
      game_id: _data.theGameID,
      // game_day: "2020-1-29",
      style: _style, // 1首页-按时间 2首页-按赛事 3赛程页面
      game_status: 4 //所有的状态
    });
    if (_matchList) _data.matchList = _matchList;

    let _teamRanking_LOL = await api.getTeamRanking({
      game_id: "LOL",
      page_status: 0, // 所有地区
      page_size: 15
    });
    if (_teamRanking_LOL) {
      _data.teamRanking.LOL = _teamRanking_LOL.list;
    }

    let _teamRanking_CSGO = await api.getTeamRanking({
      game_id: "CSGO",
      page_status: 0, // 所有地区
      page_size: 15
    });
    if (_teamRanking_CSGO) {
      _data.teamRanking.CSGO = _teamRanking_CSGO.list;
    }

    let _teamRanking_DOTA2 = await api.getTeamRanking({
      game_id: "DOTA2",
      page_status: 0, // 所有地区
      page_size: 15
    });
    if (_teamRanking_DOTA2) {
      _data.teamRanking.DOTA2 = _teamRanking_DOTA2.list;
    }

    return _data;
  },
  data() {
    return {
      sortValue: true
    };
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      // alert(123)
    });
  },
  computed: {
    ...mapGetters({
      storeGameID: "common/getGameId"
    })
  },
  watch: {
    storeGameID(newVal, oldVal) {
      this.theGameID = newVal;
      //   console.log(oldVal,'------->',newVal);
      this.clientGetMatchList();

      if (this.theGameID) {
        if (this.theGameID === "all") {
          this.teamRankingActive = "DOTA2";
        } else {
          this.teamRankingActive = this.theGameID.toUpperCase();
        }
      }
    }
  },
  created() {
    // 首页性能调优 byFeikeQ
    if(process.client){
      var _style = this.sortType ? 1 : 2;
      api.getMatchList({
        game_id: this.theGameID,
        // game_day: "2020-1-29",
        style: _style, // 1首页-按时间 2首页-按赛事 3赛程页面
        game_status: 4 //所有的状态
      },_matchList=>{
        if (_matchList) this.matchList = _matchList;
      });
      
      
      
      api.getTeamRanking({
        game_id: "LOL",
        page_status: 0, // 所有地区
        page_size: 15
      },_teamRanking_LOL =>{
        if (_teamRanking_LOL) {
          this.teamRanking.LOL = _teamRanking_LOL.list;
        }
      });
      
      
      api.getTeamRanking({
        game_id: "CSGO",
        page_status: 0, // 所有地区
        page_size: 15
      },_teamRanking_CSGO => {
        if (_teamRanking_CSGO) {
          this.teamRanking.CSGO = _teamRanking_CSGO.list;
        }
      });
      
      
      api.getTeamRanking({
        game_id: "DOTA2",
        page_status: 0, // 所有地区
        page_size: 15
      },_teamRanking_DOTA2=>{
        if (_teamRanking_DOTA2) {
          this.teamRanking.DOTA2 = _teamRanking_DOTA2.list;
        }
      });
      
    }
  },
  mounted() {},
  methods: {
    teamImg_default(event){
      var img = event.srcElement;
      img.src ='/images/team_default.png';
    },
    clientGetMatchList() {
      var _style = this.sortType ? 1 : 2;
      api.getMatchList(
        {
          game_id: this.theGameID,
          // game_day: "2020-1-29",
          style: _style, // 1首页-按时间 2首页-按赛事 3赛程页面
          game_status: 4 //所有的状态
        },
        _matchList => {
          if (_matchList) this.matchList = _matchList;
          this.sortRun = false;
        }
      );
    },
    sortSwitch() {
      if(this.sortRun) return;
      this.sortRun = true;
      this.sortType = !this.sortType;
      this.clientGetMatchList();
    },
    toProcessing(id, game) {
      //跳转进行中详情
      if (!game) return;
      var _game = game.toLowerCase();
      var _url = {
        path: "/home/" + _game,
        query: { match_id: id }
      };
      if (_game !== "csgo") _url.path += "/processing";
      this.$router.push(_url);
    },
    toNotStarted(id, game) {
      //跳转未开始详情
      if (!game) return;
      var _game = game.toLowerCase();
      var _url = {
        path: "/home/" + _game,
        query: { match_id: id }
      };
      if (_game !== "csgo") _url.path += "/notStarted";
      this.$router.push(_url);
    },
    toOver(id, game) {
      //跳转已结束详情
      if (!game) return;
      var _game = game.toLowerCase();
      var _url = {
        path: "/home/" + _game,
        query: { match_id: id }
      };
      if (_game !== "csgo") _url.path += "/over";
      this.$router.push(_url);
    },
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
    toSportingEvent(id, game) {
      if (!game) return;
      //跳转赛事详情
      this.$router.push({
        path: `/schedule/detail`,
        query: { game: game.toLowerCase(), tournament_id: id }
      });
    },
    toTeamRanking(id, game) {
      //跳转单个战队详情
      this.$router.push({ path: `/team/${id}`, query: { game: game } });
    }
  },
  beforeDestroy() {}
};
</script>

<style scoped lang="less">
.main-box {
  // background: blue;
  //   overflow: hidden;
  .el-carousel__indicators--horizontal {
    left: 87%;
  }
  .main-box-child {
    margin-top: 20px;
    min-height: 1250px;
    position: relative;
    .aside_tab {
      position: absolute;
      left: -80px;
    }
    .fixd {
      position: fixed;
      top: 70px;
      z-index: 300;
    }
    .aside-box {
      position: absolute;
      top: -17px;
      right: 0;
      .teamRanking-box {
        width: 190px;
        // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
        border-radius: 6px;
        position: relative;
        margin-bottom: 16px;
        background: rgba(255, 255, 255, 0.6);
        .teamRanking-child {
          padding-bottom: 10px;
          margin: 17px 0;
          h3 {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            vertical-align: middle;
            margin: 0 12px;
            font-size: 18px; font-weight: bold; color:#6521D7;
            height: 40px;
            line-height: 40px;
          }
          > p {
            margin: 15px 12px;
            .teamRanking-tabs {
              display: inline;
              font-size: 14px;
              font-weight: bold;
              color: #999;
              margin-right: 10px;
              cursor: pointer;
            }
            .active {
              color: #6521D7;
              // text-shadow: 0px 4px 6px rgba(42, 47, 247, 0.8);
            }
          }
          .teamRanking-table {
            transition: all 0.2s linear 0s;
            .teamRanking-table-cell {
              width: 190px;
              height: 24px;
              .table-cell1 {
                width: 48px;
                text-align: center;
                font-size: 14px;
                font-weight: 400;
                color: #919191;
                margin-right: 5px;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                vertical-align: middle;
              }
              .table-cell2 {
                width: 85px;
                margin-right: 5px;
                display: inline-flex;
                justify-content: left;
                align-items: center;
                vertical-align: middle;
                font-size: 14px;
                font-weight: 400;
                color: #333;
                .table-cell2-text {
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }
              }
              .table-cell3 {
                width: 50px;
                text-align: center;
                font-size: 14px;
                font-weight: 400;
                color: #333;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                vertical-align: middle;
              }
            }
            .teamRanking-table-cell:hover {
              background: linear-gradient(135deg,rgba(101,33,215,0.3) 0%,rgba(191,73,235,0.3) 100%);
              cursor: pointer;
            }
            p {
              .table-title {
                display: inline-block;
                font-size: 12px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color:#666;
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
    .sort-text {
      width: 112px;
      height: 30px;
      border: 1px solid #6521D7;
      border-radius: 15px;
      font-size: 14px;
      font-weight: 400;
      line-height: 19px;
      color: #6521D7;
      position: absolute;
      top: 10px;
      right: 10px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      vertical-align: middle;
      cursor: pointer;
    }
    .sort-text:hover {
      // background: linear-gradient(136deg, #6521D7 0%, #BF49EB 100%);
      background: linear-gradient(135deg,rgba(101,33,215,0.3) 0%,rgba(191,73,235,0.3) 100%);
      border: 0;
    }
    .tiem-centent-box {
      // position: absolute;
      .body-box {
        width: 998px;
        margin-bottom: 20px;
        // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.5);
        border-radius: 6px;
        position: relative;
        overflow: hidden;
        .title-text {
          font-size: 18px;
          font-weight: bold;
          color: #6521D7;
          display: inline-flex;
          align-items: center;
          vertical-align: middle;
          padding: 17px 0 12px 11px;
          width: 100%;
        }

        .body-centent-box {
          background: rgba(255, 255, 255, 0.6);
          &.notbg{
            background:transparent;
          }
          border-radius: 6px;
          .body-centent-table {
            .time {
              line-height: 19px;
              font-size: 14px;
              font-weight: 400;
              line-height: 19px;
              color: #666;
              padding: 12px;
            }
          }
          
          .bgActive:hover {
            background: linear-gradient(135deg,rgba(101,33,215,0.3) 0%,rgba(191,73,235,0.3) 100%);
          }
          .table-box {
            height: 30px;
            width: 100%;
            padding: 0 24px;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            margin-bottom: 12px;
            font-size: 14px;
            span {
              padding: 0 10px;
              display: inline-block;
            }
            .playName {
              width: 200px;
              white-space: nowrap;
              text-overflow: ellipsis;
              display: inline-block;
              overflow: hidden;
            }
            .score {
              font-size: 16px;
              padding: 0;
              display: inline-flex;
              justify-content: center;
              align-items: center;
              vertical-align: middle;
              flex: 1;
              .left-box {
                display: inline-block;
                flex: 1;
                text-align: right;
                padding: 0;
                img,.el-image{
                  width: 18px;
                  height: 18px;
                  object-fit: contain;
                }
              }
              .mid-box {
                width: 70px;
                font-weight: bold;
                color: #999;
                padding: 0;
                text-align: center;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                vertical-align: middle;
                b {
                  width: 10px;
                  display: inline-block;
                }
                .left {
                  line-height: 19px;
                  color: #33C6D6;
                  width: 30px;
                  padding: 0;
                  display: inline-block;
                }
                .right {
                  line-height: 19px;
                  color: #F05365;
                  width: 30px;
                  padding: 0;
                  display: inline-block;
                }
              }
              .right-box {
                display: inline-block;
                flex: 1;
                padding: 0;
                img,.el-image{
                  width: 18px;
                  height: 18px;
                  object-fit: contain;
                }
              }
              .gameVsName {
                max-width: 140px;
                white-space: nowrap;
                text-overflow: ellipsis;
                display: inline-block;
                overflow: hidden;
                vertical-align: middle;
              }
              .economy {
                padding: 0;
                width: 80px;
                white-space: nowrap;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                vertical-align: middle;
                span {
                  padding: 0;
                }
              }
            }
            .gameName {
              display: inline-flex;
              justify-content: left;
              align-items: center;
              vertical-align: middle;
              width: 130px;
              padding-left: 0;
              img {
                margin-right: 10px;
              }
            }
            .gameTime {
              width: 100px;
            }
            .gameVs {
              flex: 1;
              font-size: 16px;
              display: inline-flex;
              justify-content: center;
              align-items: center;
              vertical-align: middle;

              img,.el-image{
                width:18px;
                height: 18px;
                object-fit: contain;
              }

              padding: 0;
              span {
                padding: 0;
              }
              .gameVsName {
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                display: inline-block;
                flex: 1;
                padding-right: 10px;
                text-align: right;

                &.red {
                  text-align: left;
                  padding-left: 10px;
                  i {
                    img {
                      margin-left: 10px;
                    }
                  }
                }
                b {
                  font-weight: normal;
                  max-width: 135px;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  display: inline-block;
                }
                i {
                  display: inline-block;
                  flex: 1;
                  img {
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                  }
                }
                span {
                  width: 100%;
                  display: inline-flex;
                  justify-content: right;
                  align-items: center;
                  vertical-align: middle;
                }
              }
              .gameVs-text {
                text-align: center;
                width: 60px;
                height: 19px;
                font-size: 14px;
                font-weight: 400;
                line-height: 19px;
                color: #999;
                &.fgroup{
                  font-size: 0;
                }
                i {
                  font-size: 14px;
                  font-style: normal;
                  width: 6px;
                  display: inline-block;
                  text-align: center;
                }
                b {
                  font-size: 14px;
                  width: 25px;
                  display: inline-block;
                  text-align: center;
                  color: #33C6D6;
                  &:last-child {
                    color: #F05365;
                  }
                }
              }
            }
            .gameRule {
              color: #999;
            }
          }
          .table-box:hover {
            background: linear-gradient(135deg,rgba(101,33,215,0.3) 0%,rgba(191,73,235,0.3) 100%);
            cursor: pointer;
          }





          .processing-box{
            display: flex;
            flex-wrap: wrap;
            margin: 0 -6px;
          }







          .processing-child {
            width: 493px;
            margin:0 6px;
            margin-bottom: 16px;
            height: 110px;
            position: relative;
            background: rgba(255, 255, 255, 0.6);
            border: 1px solid transparent;
            border-radius: 6px;
            overflow: hidden;
            font-size: 14px;
            color: #666;
            text-align: center;
            .active-box{
              width: 100%;
              display:inline-flex;
              padding: 0 12px;
              height: 30px;
              span{
                display: inline-flex;
                justify-content: center;
                align-items: center;
                vertical-align: middle;
              }
              .aleft{
                flex: 1;
                .title {
                  display: inline-block;
                  flex:1;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  text-align: left;
                }
              }
              .acenter {
                position: absolute;
                top: 6px;
                left: 0;
                right: 0;
              }

              .aright {
                width: 60px;
                text-align:center;
              }
            }
            p {
              position: relative;
            }
            .match-info{
              height: 50px;
              .title-box {
                width: 100%;
                height: 100%;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                vertical-align: middle;

                .title-box-item {
                  width:170px;
                  text-align: right;
                  .title-two{
                    width: 70px;
                    overflow: hidden;
                  }
                }
                .title-icon{
                  flex:1;
                  text-align:center;
                  display: inline-flex;
                  justify-content: center;
                  align-items: center;
                  b{
                    width: 35px;
                    font-size: 20px;
                    font-weight: bold;
                    color: #33C6D6;
                    display: inline-block;
                    &.red{
                      color: #F05365;
                    }
                  }
                  i{
                    color: #999;
                    font-style: normal;
                  }
                  img,.el-image{
                    width:30px;height:30px;object-fit:contain;
                  }
                }
              }
            }
            .full-spot{
              height: 20px;
              line-height: 20px;
              display: flex;
              .mid{
                flex: 1;
              }
              .full-item{
                width: 150px;
                text-align: left;
                padding: 0 12px;
                &.rl{
                  text-align: right;
                }
              }
            }
          }
          .processing-child:hover {
            border: 1px solid #9E3AE4;
            cursor: pointer;
            .title-center {
                color:#fff;
              }
            .active-box {
              color:#fff;
              background: linear-gradient(135deg, #6521D7 0%, #BF49EB 100%);
            }
          }
        }
      }
    }
  }
}
</style>
