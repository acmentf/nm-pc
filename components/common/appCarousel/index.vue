<!--
 * @Author: FeikeQ
 * @Date: 2021-02-24 10:09:17
 * @LastEditTime: 2021-03-02 11:57:38
 * @LastEditors: FeikeQ
 * @FilePath: /nami-pc/components/common/appCarousel/index.vue
 * @Description: 轮播图
-->
<template>
    <div class="carousel-box">
      <el-carousel height="300px" v-if="true">
        <el-carousel-item v-for="(item, index) in list_img" :key="index">
          <h3 class="small">
            <img :src="item.url" alt />
          </h3>
        </el-carousel-item>
      </el-carousel>
      <defaultBox v-else width="403px" height="120px" src="/images/logo-pic.png"></defaultBox>
    </div>
</template>

<script>
import defaultBox from '~/components/common/default'
export default {
  name: 'carousel-box',
  components: {
    defaultBox
  },
  data() {
    return {
      list_img: [
        { url: '/images/pictorial.png' },
        { url: '/images/pictorial1.png' },
        { url:  '/images/pictorial2.png'},
        { url:  '/images/pictorial3.png'},
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.carousel-box{
  width: 1200px;
  height: 300px;
  background: rgba(255 ,255 ,255 ,0.6);
  border-radius: 6px;
  display: table-cell;
  vertical-align: middle;
}
/deep/ .el-carousel__button{
  width: 6px;
  height: 6px;
  border-radius: 50%;
  opacity:1;
}
/deep/ .el-carousel__indicators>.is-active>.el-carousel__button{
  width: 50px;
  height: 6px;
  border-radius:3px;
  background: linear-gradient(90deg, #6521D7 0%, #BF49EB 100%);
}
.el-carousel__item h3 {
  opacity: 1;
  line-height: 296px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: red;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.small img {
  width: 100%;
  height: 100%;
}

</style>