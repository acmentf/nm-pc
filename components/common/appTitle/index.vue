<!--
 * @Author: FeikeQ
 * @Date: 2020-12-07 13:45:42
 * @LastEditors: FeikeQ
 * @LastEditTime: 2021-02-25 09:57:55
 * @FilePath: /nami-pc/components/common/appTitle/index.vue
 * @Description: 标题组件
 * 使用方法(只有type为0普通标题时才支持插槽)
 * 普通标题 <app-title title="战队排行" icon="/images/xxx.png">[插槽]</app-title>
 * 分组标题 <app-title title="战队选手" type=1 color="#E4E4E4"/>
-->
<template>
  <h3 :style="{fontSize:size+'px',lineHeight:size*1.4+'px',color:color}">
      <div v-if="type"><dd style="flex:1"><img width="100%" src="./images/group_line.png" /></dd><em style="margin:0 12px;" :style="{fontSize:(size*1.1111111).toFixed()+'px',lineHeight:(size*1.11111111*1.4).toFixed()+'px',color:color}">{{title}}</em><dd style="flex:1"><img width="100%" style="transform: rotateY(180deg);" src="./images/group_line.png" /></dd></div>
      <div v-else><img v-if="icon" :style="{width:(size*1.2222222 ).toFixed()+'px',maxHeight:(size*1.2222222).toFixed()+'px'}" :src="icon" :alt="title" > <em>{{title}}</em> <slot></slot></div>
  </h3>
</template>


<script>
export default {
    name:'appTitle',
    props:{
        "type":{
            type:[String, Number],
            default:0
        },
        "size":{
            type:[String, Number],
            default:18
        },
        "color":{
            type:String,
            default:"#6521D7"
        },
        "title":{
            type:String,
            default:""
        },
        "icon":{
            type:String,
            default:""
        }
    }
}
</script>

<style lang="less" scoped>

h3{
    &>div{
        display:flex;
        overflow: hidden;
        // align-items: center;
        vertical-align: middle;
        img{
            vertical-align:middle;
            margin-right:6px;
        }
    }
    
}


</style>