<!--
 * @Author: FeikeQ
 * @Date: 2020-12-18 10:58:37
 * @LastEditTime: 2020-12-18 11:16:03
 * @LastEditors: FeikeQ
 * @FilePath: /ti-pc/pages/team/table.vue
 * @Description: 
-->
<template>
  <div>
    <a
      href="https://www.creative-tim.com/learning-lab/nuxt/tables/black-dashboard"
    >https://www.creative-tim.com/learning-lab/nuxt/tables/black-dashboard</a>
    <br />
    <el-table :data="tableData1">
      <el-table-column min-width="50" type="index"></el-table-column>
      <el-table-column min-width="150" prop="name" label="Name"></el-table-column>
      <el-table-column min-width="200" prop="job" label="Job Position"></el-table-column>
      <el-table-column min-width="150" prop="salary" label="Salary"></el-table-column>
      <el-table-column min-width="150" header-align="right" label="Actions">
        <div slot-scope="{row}" class="text-right">
          <el-tooltip content="Info" :open-delay="300" placement="top">
            <base-button type="info" size="sm" icon>
              <i class="tim-icons icon-single-02"></i>
            </base-button>
          </el-tooltip>

          <el-tooltip content="Settings" :open-delay="300" placement="top">
            <base-button type="success" size="sm" icon>
              <i class="tim-icons icon-settings"></i>
            </base-button>
          </el-tooltip>

          <el-tooltip content="Delete" :open-delay="300" placement="top">
            <base-button type="danger" size="sm" icon>
              <i class="tim-icons icon-simple-remove"></i>
            </base-button>
          </el-tooltip>
        </div>
      </el-table-column>
    </el-table>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>

    <div class="block">
      <span class="demonstration">页数较少时的效果</span>
      <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
    </div>
    <div class="block">
      <span class="demonstration">大于 7 页时的效果</span>
      <el-pagination layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
  </div>
</template>

  <script>
export default {
  data() {
    return {
      tableData1: [
        {
          id: 1,
          name: "Dakota Rice",
          salary: "$36.738",
          country: "Niger",
          city: "Oud-Turnhout"
        },
        {
          id: 2,
          name: "Minerva Hooper",
          salary: "$23,789",
          country: "Curaçao",
          city: "Sinaai-Waas"
        },
        {
          id: 3,
          name: "Sage Rodriguez",
          salary: "$56,142",
          country: "Netherlands",
          city: "Baileux"
        },
        {
          id: 4,
          name: "Philip Chaney",
          salary: "$38,735",
          country: "Korea, South",
          city: "Overland Park"
        },
        {
          id: 5,
          name: "Doris Greene",
          salary: "$63,542",
          country: "Malawi",
          city: "Feldkirchen in Kärnten"
        }
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>