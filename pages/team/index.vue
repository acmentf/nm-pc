<!--
 * @Date: 2020-12-07 10:47:09
 * @LastEditors: FeikeQ
 * @LastEditTime: 2021-02-24 15:54:52
 * @FilePath: /nami-pc/pages/team/index.vue
-->
<template>
  <div class="team-box">
    <appCarousel></appCarousel>
    <asideTabsNav style="margin-top:20px;" />
    
    <app-title style="margin-top:25px;" :title="title" icon="/images/team_ranking.png">
      <div class="region_filter" alt="地区筛选">
        <span>地区筛选</span>
        <app-select
          v-model="regionFilter.value"
          :options="regionFilter.options"
          style="width:122px;margin-left:10px;"
          name="zone"
          @change="zoneChange"
        />
      </div>
    </app-title>
    
    <br />
    <el-table :data="tableData" :alt="regionFilter.value" @row-click="rowClick">
      <div slot="empty" style="margin: 100px 0;">
        <img src="/images/team_top_default.png" width="260" />
        <p>{{empty}}</p>
      </div>
      <el-table-column
        prop="rank"
        align="center"
        width="200"
      >
        <template slot="header">
          <p class="header-title">
            <img src="/images/histogram.png" style="margin-right:6px;" height="18px" width="18px" alt="histogram">排行
          </p>
        </template>
        <template slot-scope="scope">
          <span v-if="scope.row[scope.column.property] > 3">{{ scope.row[scope.column.property] }}</span>
          <img
            v-else
            :src="`/images/${scope.row[scope.column.property]}.png`"
            style="width:20px;height:20px;"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="team"
        min-width="200"
      >
        <template slot="header">
          <p class="header-title">
            <img src="/images/clan.png" style="margin-right:6px;" height="18px" width="18px" alt="histogram">战队
          </p>
        </template>
        <template slot-scope="scope">
          <img
            :src="scope.row[scope.column.property].logo || '/images/team_default.png'"
            style="width:24px;height:24px;"
            onerror="this.src='/images/team_default.png';this.onerror=null"
          />
          <b style="margin:0 8px;">{{ scope.row[scope.column.property].short_name }}</b>
          <span style="font-size: 14px;">
            {{
            scope.row[scope.column.property].name
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="country"
        label="国家"
        width="190"
        :formatter="formatter"
      >
       <template slot="header">
         <p  class="header-title">
           <img src="/images/positioning.png" style="margin-right:6px;" height="18px" width="18px" alt="histogram">国家
         </p>
        </template>
        <template slot-scope="scope">
          <img
            :src="scope.row[scope.column.property].img || '/images/country_default.png'"
            style="width:20px;height:16px;border-radius:2px;"
            onerror="this.src='/images/country_default.png';this.onerror=null"
          />
          {{ scope.row[scope.column.property].name }}
        </template>
      </el-table-column>
      <el-table-column
        prop="score"
        width="170"
        align="center"
        :formatter="formatter"
      >
       <template slot="header">
         <p class="header-title">
            <img src="/images/integral.png" style="margin-right:6px;" height="18px" width="18px" alt="histogram">积分
         </p>
        </template>
        </el-table-column>
    </el-table>
    <el-pagination
      :page-size="pageSize"
      :total="total"
      :currentPage="currentPage"
      background
      layout=" total,prev, pager, next"
      @current-change="currentChange"
    ></el-pagination>
    <div class="search-engine-optimization">
      <nuxt-link
        v-for="(item, index) in tableData"
        :to="`/team/${item.id}?game=${theGameID}`"
        :key="index"
        :title="item.team.name"
      >{{item.rank}} | {{ item.team.short_name }} | {{item.team.name}} | {{item.country.name}} | {{item.score}}</nuxt-link>
      <div class="page" title="分页">
        <nuxt-link
          v-for="index in Math.ceil(total/pageSize)"
          :to="`/team/?page=${index}`"
          :key="index"
          :title="`第 ${index} 页`"
        >{{ index }}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from "@/api/team";
import {mapGetters} from 'vuex';
import appCarousel from '~/components/common/appCarousel';
import asideTabsNav from "~/components/common/asideTabsNav";

export default {
  layout: "home",
  name: "team-box",
  components: {appCarousel,asideTabsNav},
  fetch({ store, params }) {},
  async asyncData({ app, params, store,query, env, $config }) {

    //   console.log("store:",store.state.common.game_id);
    //   console.log("query:",query.game);
      
      

      let _data = {
      title: "战队排行榜",
      name: app.head.title,
      empty: "暂无排行",
      total: 0,
      pageSize: 20,
      currentPage: (query.page || 1) * 1,
      theGameID: query.game || store.state.common.game_id ,
      tableData: [],
      regionFilter: {
        value: (query.zone || 0) * 1,
        options: [
          {
            label: "热门地区",
            options: [
              {
                value: 0,
                label: "所有地区"
              }
            ]
          },
          {
            label: "更多赛区",
            options:[]
          }
        ]
      },
      renderTag: true
    };
    
    if(_data.theGameID=='all') _data.theGameID = "DOTA2";

    // console.log("======asyncData====",_data);
    // if (!process.server) return _data;
    



    let _area = await api.getAreaInfo({
      game_id: _data.theGameID,
    });
    if (_area) {
        // console.log('区域的动态数据:'+_data.theGameID,_area)
       if(_area.length){
           _data.regionFilter.options[1].options = _area.map(item=>{
               return {
                   value:item.region_id,
                   label:item.name_zh,
                   name_en:item.name_en,
                   updated_at:item.updated_at,
               }
           })
       }
    //    console.log('_area_area_area',_data.regionFilter.options);
    }


    let _list = await api.getTeamList({
      game_id: _data.theGameID,
      page_status: _data.regionFilter.value * 1,
      page_size: _data.pageSize,
      page: _data.currentPage
    });
    if (_list) {
        
      if (_list.count) _data.total = _list.count * 1;
      if (_list.list) _data.tableData = api.$formatTeamList(_list.list);
    //   console.log("tableData",_data.tableData);
    }

    

    return _data;
  },
  data() {
  },
  computed: {
    ...mapGetters({
      storeGameID: "common/getGameId"
    })
  },
  watch: {
      storeGameID(newVal, oldVal){
          this.theGameID = newVal;
          this.currentPage = 1;
        //   console.log(oldVal,'------->',newVal);
          this.getAreaInfoData();
          this.getTeamListData();
      },
  },
  methods: {
      getAreaInfoData(){
          this.regionFilter.value = 0;
        api.getAreaInfo({
        game_id: this.theGameID,
        },_area=>{
            if(_area && _area.length){
                this.regionFilter.options[1].options = _area.map(item=>{
                    return {
                        value:item.region_id,
                        label:item.name_zh,
                        name_en:item.name_en,
                        updated_at:item.updated_at,
                    }
                })
                //  console.log('_area_area_area',this.regionFilter.options);
            }
        });
      },
    getTeamListData() {
        
      this.empty = "正在加载数据...";
      this.tableData = [];

      api.getTeamList(
        {
          game_id: this.theGameID,
          page_status: this.regionFilter.value * 1,
          page_size: this.pageSize,
          page: this.currentPage
        },_list => {
          if (_list && _list.count) {
            if (_list.count) this.total = _list.count * 1;
            if (_list.list) this.tableData = api.$formatTeamList(_list.list);
          } else {
            this.empty = "暂无排行";
          }
        }
      );
    },
    zoneChange(val) {
      this.currentPage = 1;
      this.page_status = val;
      let query = { game:this.$route.query.game, zone: val };
      this.$router.push({ query });
      this.getTeamListData();
    },
    currentChange(page) {
      this.currentPage = page;
      let query = { game:this.$route.query.game, page: page };
      if (this.regionFilter.value) query.zone = this.regionFilter.value;
      this.$router.push({ query });
      this.getTeamListData();
    },
    rowClick(row, column, event) {
      //this.$router.push(`/team/${row.id}/`);
      this.$router.push({path:`/team/${row.id}`, query: {game: this.theGameID}});
    },
    formatter(row, column, cellValue, index) {
      return cellValue;
    }
  },
  created() {
    if (process.client && !this.renderTag) {
        this.getAreaInfoData();
      this.getTeamListData();
    }
  },
  mounted() {
    
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
//   watchQuery: ['game'],
  head() {
    return {
      title: this.title + " - " + this.name,
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

<style lang="less" >
.team-box {
  width: 100%;
  position: relative;
  overflow: inherit;

  .aside_tab{
        position: absolute;
        left:-80px;
    }
    .fixd{
        position: fixed;
        top:70px;
        z-index: 300;
    }
    
  .header-title{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
  }
  .el-table,
  .el-table__expanded-cell {
    font-size: 18px;
  }
  .el-table th {
    font-size: 16px;
  }
  .el-table__empty-block {
    background: rgba(15, 30, 69, 0.5);
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  }
}

.region_filter {
  flex: 1;
  text-align: right;
  color: #666;
  font-size: 14px;
}
</style>
