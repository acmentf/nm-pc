<!--
 * @Author: FeikeQ
 * @Date: 2020-12-11 09:34:26
 * @LastEditTime: 2021-03-02 16:56:38
 * @LastEditors: FeikeQ
 * @FilePath: /nami-pc/pages/team/_detail/index.vue
 * @Description: 
-->
<template>
    <div class="team_detail">
        <app-follow v-if="false"
            type="team"
            game_id="LOL"
            :ids="teamID"
            style="position: absolute; top:50px; right:0;"
        />
        <Breadcrumb>
            <breadcrumb-item>战队详情</breadcrumb-item>
        </Breadcrumb>

        <div style="height:20px"></div>

        <div class="info">
            <div class="logo" :team_id="teamID">
                <img
                    :src="info.team_logo"
                    onerror="this.src='/images/team_default.png';this.onerror=null"
                />
            </div>
            <div class="attr">
                <h2 :alt="info.team_id">
                    {{ info.team_name }}
                    <span>{{ info.team_long_name }}</span>
                </h2>
                <div class="itembox">
                    <p>
                        <em>世界排名：</em>
                        第{{ info.world_rank }}名
                    </p>
                    <p>
                        <em>地区排名：</em>
                        第{{ info.region_rank }}名
                    </p>
                    <p>
                        <em>所在地区：</em>
                        {{ info.country_name }}
                    </p>
                    <p :alt="info.region_rank">
                        <em>赛区：</em>
                        {{ info.region_name }}
                    </p>
                    <p>
                        <em>选手均龄：</em>
                        {{ info.avg_age }}
                    </p>
                    <p>
                        <em>总奖金：</em>
                        {{ info.total_earnings }}
                    </p>
                    <p><em>成立时间：</em>{{info.create_time}}</p>
                </div>
            </div>
        </div>
        <div style="height:60px"></div>

        <div class="player">
            <app-title title="战队选手" type="1" color="#333" />
            <scroll-snap :data="player" :game="theGameID" />
            <defaultBox
                v-if="!player.length"
                style="margin-top:20px;"
                width="160px"
                height="160px"
                src="/images/battle_details.png"
                >暂无选手资料</defaultBox
            >
        </div>
        <div style="height:60px"></div>

        <div class="honor">
            <app-title title="赛事荣誉" type="1" color="#333" />
            <div class="cup">
                <div>
                    <img
                        width="80px"
                        height="80px"
                        src="/images/second_place.png"
                    />
                    <p
                        style="color: #DBDBDB;text-shadow: 1px 2px 1px #999;"
                    >
                        {{ honor.secondPlace }}
                    </p>
                </div>

                <div style="margin:10px 40px 0 40px;">
                    <img
                        width="80px"
                        height="80px"
                        src="/images/champion.png"
                    />
                    <p
                        style="color: #FFE07D;text-shadow: 1px 1px 1px #CE9F46;"
                    >
                        {{ honor.champion }}
                    </p>
                </div>

                <div>
                    <img
                        width="80px"
                        height="80px"
                        src="/images/third_place.png"
                    />
                    <p
                        style="color: #FCB771;text-shadow: 1px 1px 1px #986326;"
                    >
                        {{ honor.thirdPlace }}
                    </p>
                </div>
            </div>
            <br />
            <el-table
                :data="honor.list"
                :default-sort="{ prop: 'date', order: 'descending' }"
                @row-click="tableRowClick"
                row-class-name="thesmall"
                height="340px"
            >
                <div slot="empty">
                    <defaultBox
                        width="160px"
                        height="160px"
                        src="/images/honor-null.png"
                        >暂无赛事荣誉</defaultBox
                    >
                </div>
                <el-table-column
                    prop="rank"
                    label="名次"
                    align="center"
                    width="80"
                    column-key="el-icon-medal"
                >
                <template slot="header">
                  <p class="header-title">
                    <img src="/images/top_ico.png" style="margin-right:6px;" height="18px" width="18px">名次
                  </p>
                </template>
                    <template slot-scope="scope">
                        <span v-if="scope.row.rank < 4">
                            <img
                                width="20"
                                :src="`/images/${scope.row.rank}.png`"
                            />
                        </span>
                        <span v-else>{{ scope.row.rank }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="bonus"
                    label="奖金"
                    width="180"
                    column-key="el-icon-money"
                    class-name="nowrap"
                >
                <template slot="header">
                  <p class="header-title">
                    <img src="/images/fund_ico.png" style="margin-right:6px;" height="18px" width="18px">奖金
                  </p>
                </template>
                </el-table-column>

                <el-table-column
                    prop="fund"
                    label="赛事奖金"
                    width="180"
                    column-key="el-icon-money"
                    class-name="nowrap"
                >
                <template slot="header">
                  <p class="header-title">
                    <img src="/images/fund_ico.png" style="margin-right:6px;" height="18px" width="18px">赛事奖金
                  </p>
                </template>
                </el-table-column>

                <el-table-column
                    prop="tournament"
                    label="赛事"
                    width="200"
                    column-key="el-icon-trophy"
                    class-name="nowrap"
                >
                <template slot="header">
                  <p class="header-title">
                    <img src="/images/game-icon.png" style="margin-right:6px;" height="18px" width="18px">赛事
                  </p>
                </template>
                </el-table-column>

                <el-table-column
                    prop="time"
                    label="时间"
                    width="180"
                    header-align="center"
                    align="left"
                    column-key="el-icon-time"
                >
                <template slot="header">
                  <p class="header-title">
                    <img src="/images/time-icon.png" style="margin-right:6px;" height="18px" width="18px">时间
                  </p>
                </template>
                    <template slot-scope="scope">{{
                        $utils.formatime(
                            scope.row.time * 1000,
                            "yyyy-MM-dd hh:mm"
                        )
                    }}</template>
                </el-table-column>

                <!-- <el-table-column
                    prop="contest"
                    label="赛制"
                    width="100"
                    align="center"
                    column-key="el-icon-basketball"
                    
        ></el-table-column>-->

                <el-table-column
                    prop="country"
                    label="位置"
                    min-width="200"
                    header-align="center"
                    align="right"
                    column-key="el-icon-location-information"
                >
                <template slot="header">
                  <p class="header-title">
                    <img src="/images/positioning.png" style="margin-right:6px;" height="18px" width="18px">位置
                  </p>
                </template>
                    <!-- <template slot-scope="scope">
                        <img
                            :src="scope.row[scope.column.property]"
                            style="width:20px;height:20px;border-radius:50%;"
                        />
          </template>-->
                </el-table-column>
            </el-table>

            <!-- <el-pagination
                :page-size="5"
                :total="100"
                background
                layout=" total,prev, pager, next"
      ></el-pagination>-->
        </div>
        <div style="height:60px"></div>

        <div class="data">
            <app-title title="战队数据" type="1" color="#333" />
            <div class="select_filter">
                <span>筛选条件</span>
                <app-select
                    v-model="datas.type"
                    :options="datas.typeFilter"
                    style="width:122px"
                    @change="getData"
                />

                <span>{{ datas.type == 1 ? "赛事" : "场次" }}筛选</span>
                <app-select
                    v-model="datas.sub_type"
                    :options="selectDataList"
                    style="width:257px"
                    @change="getData"
                />
            </div>
            <div class="tags" style="margin: 0 -6px;">
                <p v-for="(item, index) in datas.tags" :key="index">
                    <b>{{ item.value }}</b>
                    {{ item.name }}
                </p>
            </div>
            <br />
            <div class="subdata">
                <div class="radar">
                    <app-title
                        title="能力图谱"
                        icon="/images/radar.png"
                        style="padding:10px;"
                    />
                    <div class="radar-chart" ref="radarChart"></div>
                </div>

                <div class="table" v-if="theGameID != 'csgo'">
                    <app-title
                        title="常用英雄"
                        icon="/images/hero_title.png"
                        icon2="/images/map.png"
                        style="padding:10px;"
                    />
                    <div class="table-hero">
                        <el-table
                            :data="datas.commonHeroes"
                            :default-sort="{
                                prop: 'date',
                                order: 'descending'
                            }"
                            @row-click="tableRowClick"
                            size="small"
                            height="350"
                        >
                            <el-table-column
                                prop="rank"
                                label="排名"
                                align="center"
                                width="50"
                            >
                                <template slot-scope="scope">
                                    {{ scope.$index + 1 }}
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="hero"
                                label="英雄"
                                align="left"
                                class-name="nowrap"
                            >
                                <template slot-scope="scope">
                                    <img
                                        :src="
                                            scope.row[scope.column.property].pic
                                        "
                                        style="width:20px;height:20px;border-radius:50%;"
                                    />
                                    {{ scope.row[scope.column.property].name }}
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="attendances"
                                label="出场数"
                                align="center"
                                width="88"
                                sortable
                            ></el-table-column>

                            <el-table-column
                                prop="winning"
                                label="胜场率"
                                align="center"
                                width="88"
                                sortable
                                :formatter="formatter"
                            ></el-table-column>

                            <!-- <el-table-column
                                prop="attendance"
                                label="出场率"
                                align="center"
                                width="88"
                                sortable
                                
              ></el-table-column>-->

                            <el-table-column
                                prop="firstBlood"
                                label="一血率"
                                align="center"
                                width="88"
                                sortable
                                :formatter="formatter"
                            ></el-table-column>

                            <el-table-column
                                prop="tower"
                                label="一塔率"
                                align="center"
                                width="88"
                                sortable
                                :formatter="formatter"
                            ></el-table-column>

                            <el-table-column
                                prop="pentaKill"
                                label="五杀率"
                                align="center"
                                width="88"
                                sortable
                                :formatter="formatter"
                            ></el-table-column>

                            <el-table-column
                                prop="decaKill"
                                label="十杀率"
                                align="center"
                                width="88"
                                sortable
                                :formatter="formatter"
                            ></el-table-column>
                        </el-table>
                    </div>
                </div>

                <div class="table" v-if="theGameID == 'csgo'">
                    <app-title
                        title="地图数据"
                        icon="/images/map.png"
                        style="padding:10px;"
                    />
                    <div class="table-hero">
                        <el-table
                            :data="datas.mapData"
                            :default-sort="{
                                prop: 'date',
                                order: 'descending'
                            }"
                            @row-click="tableRowClick"
                            size="small"
                            height="350"
                        >
                            <el-table-column
                                prop="rank"
                                label="排名"
                                align="center"
                                width="50"
                            >
                                <template slot-scope="scope">
                                    {{ scope.$index + 1 }}
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="map_name"
                                label="地图"
                                align="left"
                                class-name="nowrap"
                            >
                                <template slot-scope="scope">
                                    <img
                                        :src="scope.row.map_cover_img"
                                        style="width:20px;height:20px;object-fit: cover;"
                                    />
                                    {{ scope.row[scope.column.property] }}
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="use_time"
                                label="使用次数"
                                align="center"
                                sortable
                            ></el-table-column>

                            <el-table-column
                                prop="map_win_rate"
                                label="胜率"
                                align="center"
                                width="88"
                                sortable
                            ></el-table-column>

                            <!-- <el-table-column
                                prop="attendance"
                                label="先胜5轮"
                                align="center"
                                sortable
                            ></el-table-column>

                            <el-table-column
                                prop="firstBlood"
                                label="先胜10轮"
                                align="center"
                                sortable
                                
              ></el-table-column>-->
                        </el-table>
                    </div>
                </div>
            </div>
            <!-- <div class="subdata">
                <el-pagination
                    :page-size="5"
                    :total="100"
                    background
                    layout=" total,prev, pager, next"
                    style="width:100%;"
                ></el-pagination>
      </div>-->
        </div>
        <div style="height:60px"></div>

        <div class="match">
            <app-title title="战队比赛" type="1" color="#333" />
            <div style="height:20px"></div>
            <div class="columns">
                <div>
                    <app-title
                        :title="theGameID.toUpperCase() + '·近期赛果'"
                        icon="/images/log2.png"
                    />

                    <match-list
                        v-for="(item, index) in match.recent"
                        :key="index"
                        :title="
                            theGameID.toUpperCase() + '·' + item.tournament_name
                        "
                        :icon="`/images/${theGameID.toLowerCase()}.png`"
                        :state="
                            ['异常', '未开赛', '进行中', '完场'][
                                item.tournament_statu
                            ]
                        "
                        :alt="item.tournament_id"
                        :data="item.list"
                    />
                </div>
                <div>
                    <app-title
                        :title="theGameID.toUpperCase() + '·未来赛程'"
                        :icon="`/images/log.png`"
                    />
                    <match-list
                        v-for="(item, index) in match.future"
                        :key="index"
                        :title="
                            theGameID.toUpperCase() + '·' + item.tournament_name
                        "
                        :icon="`/images/${theGameID.toLowerCase()}.png`"
                        :data="item.list"
                        type="vs"
                    />
                    <defaultBox
                        v-if="!match.future.length"
                        style="margin-top:120px;"
                        width="260px"
                        height="260px"
                        src="/images/match_list.png"
                        >暂无未来赛程</defaultBox
                    >
                </div>
            </div>
        </div>
        <div style="height:60px"></div>
    </div>
</template>

<script>
import appSelect from "~/components/common/appSelect";
import defaultBox from "~/components/common/default";
import * as api from "@/api/team";

export default {
    layout: "home",
    name: "team_detail",
    components: { appSelect, defaultBox },
    async asyncData({ app, params, query, store, env, $config }) {
        var _data = {
            teamID: params.detail,
            theGameID: query.game || store.state.common.game_id,
            info: {
                team_id: null,
                team_name: null,
                team_logo: null,
                world_rank: null,
                region_name: null,
                region_rank: null,
                create_time: null,
                country_name: null,
                team_long_name: null,
                avg_age: null,
                total_earnings: null
            },
            player: [],
            honor: {
                champion: 0,
                secondPlace: 0,
                thirdPlace: 0,
                list: []
            },
            datas: {
                run: false,
                type: 2,
                typeFilter: [],
                sub_type: 1,
                tournaments: null,
                tournamentsFilter: [],
                times: null,
                timesFilter: [],

                tags: [],
                radarChart: {
                    name: null,
                    indicator: [],
                    v1: [],
                    v2: []
                },
                commonHeroes: [
                    {
                        hero: {
                            pic: "/images/hero_default.png",
                            name: "潮汐海灵-加之无星"
                        },
                        attendances: 132,
                        attendance: "31.53%",
                        winning: 68.5,
                        firstBlood: 31.8,
                        tower: 77.7,
                        pentaKill: 69.1,
                        decaKill: 34.2
                    }
                ],
                mapData: []
            },
            match: {
                future: [
                    {
                        tournament_id: 982,
                        tournament_name: "深渊联赛",
                        tournament_statu: "",
                        list: []
                    }
                ],
                recent: []
            }
        };

        if (_data.theGameID == "all") _data.theGameID = "DOTA2";

        if (process.server) {
            console.log("asyncData___server");
        } else {
            console.log("asyncData___client");
            console.log("teamID", _data.teamID);
            console.log("theGameID", _data.theGameID);
        }

        if (_data.teamID) {
            let _info_res = await api.getTeamInfoRes({
                game_id: _data.theGameID,
                team_id: _data.teamID * 1
            });
            if (_info_res && _info_res.team_info) {
                for (const key in _info_res.team_info) {
                    _data.info[key] = _info_res.team_info[key];
                }
                _data.datas.radarChart.name = _data.info.team_name;
            }

            let _player = await api.getTeamPlayer({
                game_id: _data.theGameID,
                team_id: _data.teamID * 1
            });

            if (_player) {
                _data.player = _player.player;
                _data.datas.typeFilter = _player.typeFilter;
                _data.datas.tournamentsFilter = _player.tournamentsFilter;
                _data.datas.tournaments = _player.tournaments;
                _data.datas.timesFilter = _player.timesFilter;
                _data.datas.times = _player.times;
                _data.datas.sub_type = _player.tournaments || _player.times; //初始值
            }

            let _honor = await api.getTeamHonor({
                game_id: _data.theGameID,
                team_id: _data.teamID * 1
            });
            if (_honor) {
                // console.log('战队详情-数据页面-赛事荣耀',_honor);
                _data.honor.champion = _honor.first_num;
                _data.honor.secondPlace = _honor.second_num;
                _data.honor.thirdPlace = _honor.third_num;
                _data.honor.list = [];
                if (_honor.honor) {
                    for (let index = 0; index < _honor.honor.length; index++) {
                        const element = _honor.honor[index];
                        var _obj = {
                            rank: element.rank, //element.ranking,
                            rank_img: element.rank_img, //图标
                            bonus: element.price,
                            fund: element.tournament_price || "-",
                            tournament: element.tournament_name,
                            tournament_id: element.tournament_id,
                            time: element.get_time_int,
                            contest: "BO5", // 赛制没有
                            country: element.country_img
                        };
                        _data.honor.list.push(_obj);
                    }
                }
            }

            //战队详情-数据页面-数据展示部分
            let _datas = await api.getTeamData({
                game_id: _data.theGameID,
                team_id: _data.teamID * 1,
                type: _data.datas.type,
                sub_type: _data.datas.sub_type
            });
            if (_datas) {
                _data.datas.tags = _datas.tags; // 标签集
                _data.datas.commonHeroes = _datas.commonHeroes; //英雄榜单
                _data.datas.mapData = _datas.mapData; // 地图榜
                // 雷达图
                _data.datas.radarChart.indicator = _datas.radarChart.indicator;
                _data.datas.radarChart.v1 = _datas.radarChart.v1;
                _data.datas.radarChart.v2 = _datas.radarChart.v2;
            }

            // 战队详情-比赛页面
            let _match = await api.getTeamMatch({
                game_id: _data.theGameID,
                team_id: _data.teamID * 1
            });
            if (_match) {
                _data.match.recent = _match.recent; // 近期赛果
                _data.match.future = _match.future; // 未来赛程
            }
        }
        // console.log("_data",_data);
        return _data;
    },
    computed: {
        selectDataList() {
            return this.datas.type == 1
                ? this.datas.tournamentsFilter
                : this.datas.timesFilter;
        }
    },
    data() {},
    methods: {
        getData() {
            // console.log("查数据了..",this.datas);
            if (this.datas.run) return;
            this.datas.run = true;

            // 战队详情-数据页面-数据展示部分
            api.getTeamData(
                {
                    game_id: this.theGameID,
                    team_id: this.teamID * 1,
                    type: this.datas.type,
                    sub_type: this.datas.sub_type
                },
                data => {
                    this.datas.run = false;
                    console.log("战队详情-数据页面-数据展示部分", data);

                    this.datas.tags = data.tags; // 标签集
                    this.datas.commonHeroes = data.commonHeroes; //英雄榜单
                    // 雷达图
                    this.datas.radarChart.indicator = data.radarChart.indicator;
                    this.datas.radarChart.v1 = data.radarChart.v1;
                    this.datas.radarChart.v2 = data.radarChart.v2;
                    this.initChart("radarChart", this.datas.radarChart);
                }
            ).catch(err => {
                this.datas.run = false;
                console.log("战队详情-数据页面-数据展示部分 -ERR");
                console.log(err);
            });
        },
        tableRowClick(row, column, event) {
            if (this.$listeners && this.$listeners["rowClick"])
                this.$listeners["rowClick"](row, column, event);
        },
        formatter(row, column, cellValue, index) {
            return cellValue + "%";
        },
        initChart(domName, chartData) {
            var _data = {
                // title: {
                //     text: '基础雷达图'
                // },
                tooltip: {
                    show: false
                    // trigger: 'axis'
                },
                legend: {
                    left: "center",
                    top: 5,
                    itemGap: 40,
                    itemWidth: 46,
                    itemHeight: 6,
                    selectedMode:false,
                    textStyle: {
                        color: "#333",
                        fontSize: 14
                    }
                },
                radar: {
                    startAngle: 60,
                    center: ["50%", "55%"],
                    radius: 80,
                    name: {
                        textStyle: {
                            color: "#333",
                            fontSize: 14,
                            padding: [3, 5]
                        },
                        rich: {
                            p: {
                                color: "#333",
                                align: "center",
                                // backgroundColor: '#666',
                                // padding: 2,
                                // borderRadius: 4
                                lineHeight: 20
                            },
                            a: {
                                color: "#33C6D6"
                            },
                            b: {
                                color: "#F05365"
                            }
                        },
                        formatter: function(value, indicator) {
                            return `${value.title}\n{a|${value.home}}{p|/}{b|${value.away}}`;
                        }
                    },
                    indicator: [
                        {
                            name: {
                                title: "一血率",
                                home: "37.2",
                                away: "87.3"
                            },
                            max: 100
                        },
                        {
                            name: {
                                title: "胜率",
                                home: "37.2",
                                away: "87.3"
                            },
                            max: 100
                        },
                        {
                            name: {
                                title: "五杀率",
                                home: "37.2",
                                away: "87.3"
                            },
                            max: 100
                        },
                        {
                            name: {
                                title: "十杀率",
                                home: "37.2",
                                away: "87.3"
                            },
                            max: 100
                        },
                        {
                            name: {
                                title: "场均时长",
                                home: "37.2",
                                away: "87.3"
                            },
                            max: 100
                        },
                        {
                            name: {
                                title: "一塔率",
                                home: "37.2",
                                away: "87.3"
                            },
                            max: 100
                        }
                    ],
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
                        data: [
                            {
                                value: [51.6, 37.2, 77.1, 87.9, 12.3, 77],
                                name: "RNG",
                                itemStyle: {
                                    color: "#33C6D6"
                                }
                            },
                            {
                                value: [68.5, 87.3, 66.6, 12, 34.7, 22],
                                name: "赛事均值",
                                itemStyle: {
                                    color: "#F05365"
                                }
                            }
                        ]
                    }
                ]
            };
            if (chartData.name) _data.series[0].data[0].name = chartData.name;
            if (chartData.indicator.length)
                _data.radar.indicator = chartData.indicator;
            if (chartData.v1.length)
                _data.series[0].data[0].value = chartData.v1;
            if (chartData.v2.length)
                _data.series[0].data[1].value = chartData.v2;

            console.log("this.datas.radarChart", _data);
            this.$nextTick(() => {
                var myChart = this.$echarts.init(this.$refs[domName]);
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(_data);
            });
        }
    },
    mounted() {
        this.initChart("radarChart", this.datas.radarChart);
    },
    created() {
        if (!process.client) return;

        api.getTeamInfoRes(
            {
                game_id: this.theGameID,
                team_id: this.teamID * 1
            },
            _info_res => {
                if (_info_res && _info_res.team_info) {
                    console.log(_info_res);
                    for (const key in _info_res.team_info) {
                        this.info[key] = _info_res.team_info[key];
                    }
                }
                this.datas.radarChart.name = this.info.team_name;
            }
        );
    },
    head() {
        return {
            title: this.info.team_long_name + " - 战队详情",
            meta: [
                { name: "keywords", content: "战队详情" },
                {
                    hid: "description", //为了避免子组件中的 meta 标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 hid 键为 meta 标签配一个唯一的标识编号。
                    name: "description",
                    content: "战队详情"
                }
            ]
        };
    }
};
</script>

<style lang="less" scoped>
.team_detail {
    overflow: hidden;
    position: relative;
    .el-table {
        padding-bottom: 10px;
    }
    .el-table,
    .el-table__expanded-cell {
        font-size: 16px;
    }

    .info {
        display: flex;
        .logo {
            text-align: center;
            width: 392px;
            height: 187px;
            background: rgba(255, 255, 255, 0.6);
            & > img {
                width: 162px;
                height: 162px;
                margin-top: 12.5px;
                object-fit: contain;
            }
        }
        .attr {
            padding: 0 12px;
            flex: 1;
            display: flex;
            flex-direction: column;
            h2 {
                font-size: 60px;
                height: 79px;
                line-height: 79px;
                span {
                    font-size: 28px;
                    color: #666;
                    margin-left: 12px;
                }
            }

            .itembox {
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                align-content: flex-end;

                p {
                    margin: 20px 10px 0 0;
                    width: 180px;
                    font-size: 18px;
                    line-height: 24px;
                    em {
                        color: #666;
                        font-size: 14px;
                    }
                }
            }
        }
    }
    .cup {
        text-align: center;
        display: flex;
        justify-content: center;
        & > div {
            width: 80px;
            margin-top: 35px;
            img {
                width: 100%;
            }
            p {
                height: 26px;
                font-size: 20px;
                font-weight: bold;
                line-height: 42px;
                margin-top: -6px;
            }
        }
    }
    .data {
        .select_filter {
            height: 19px;
            font-size: 14px;
            line-height: 19px;
            color: #999;
            text-align: center;
            margin: 20px;
            span {
                margin-left: 20px;
            }
        }
        .tags {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            p {
                width: 109px;
                height: 100px;
                background: rgba(255, 255, 255, 0.6);
                text-align: center;
                font-size: 16px;
                line-height: 50px;
                color: #666;
                border: 1px solid transparent;
                margin: 6px;
                overflow: hidden;
                &:hover {
                  border: 1px solid #5D2BCF;
                    // box-shadow: 0px 4px 6px rgba(42, 47, 247, 0.8);
                }
                b {
                    font-size: 20px;
                    color:#333;
                    display: block;
                    line-height: 20px;
                    margin-top: 30px;
                }
            }
        }
        .subdata {
            display: flex;
            // padding: 0 57px;
            .radar {
                width: 390px;
                height: 405px;
                background: rgba(255, 255, 255, 0.6);
                // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
                border-radius: 6px;
                display: flex;
                flex-direction: column;
                .radar-chart {
                    flex: 1;
                }
            }
            .table {
                flex: 1;
                height: 405px;
                background: rgba(255, 255, 255, 0.6);
                margin-left: 12px;
                border-radius: 6px;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                .table-hero {
                    margin-top: -10px;
                    flex: 1;
                }
            }
        }
    }
    .match {
        .columns {
            display: flex;
            justify-content: space-between;
            & > div {
                padding: 12px;
                width: 594px;
                background-color:rgba(255, 255, 255, 0.6);
                // box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.5);
                border-radius: 6px;
            }
        }
    }
}
</style>
