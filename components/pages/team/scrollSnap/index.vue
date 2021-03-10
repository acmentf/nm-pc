<!--
 * @Author: FeikeQ
 * @Date: 2020-12-24 16:16:11
 * @LastEditTime: 2021-02-25 10:29:48
 * @LastEditors: FeikeQ
 * @FilePath: /nami-pc/components/pages/team/scrollSnap/index.vue
 * @Description: 
-->
<template>
    <div class="scroll-snap">
        <div v-if="arrow" class="act left" :class="left?'show':'hide'" @click="scrollAct(0)"></div>
        
        
        <div class="scroll-box" id="scroll_snap_box" ref="scrollBox">
            <div class="card" v-for="(item,index) in data" :key="index" :id="item.id">
                <nuxt-link  :to="{ path: `./${$route.params.detail}/${item.id}`, query: { game: $route.query.game }}" :title="item.name">


                    <div class="tip">
                        <img v-if="game.toUpperCase()!=='CSGO'" :src="`/images/station_${imgKey[game.toUpperCase()][item.seat]}.png`" :alt="item.seat"  />
                    </div>
                    <div class="pic">
                        <img :src="item.pic" onerror="this.src='/images/player_default.png';this.onerror=null" />
                    </div>
                    <div class="tag">
                        <p>{{item.name}}</p>
                        <p class="em">{{item.seatname || '&nbsp;'}}</p>
                    </div>
                </nuxt-link>
            </div>
        </div>
        <div v-if="arrow" class="act right" :class="right?'show':'hide'" @click="scrollAct(1)"></div>
        
    </div>
</template>

<script>
export default {
    props:{
        game:{
            type:String,
            default:"DOTA2",
        },
        data:{
            type:Array,
            default:()=>[
                {
                    id:1,
                    name:"Khan1",
                    seat:'a',//1,2,3,4,5 | a,b,c,d,e
                    seatname:"Top",
                    pic:"/images/player.png",
                },
                {
                    id:2,
                    name:"Khan2",
                    seat:'a',//1,2,3,4,5 | a,b,c,d,e
                    seatname:"Top",
                    pic:"/images/player.png",
                },
                {
                    id:3,
                    name:"Khan3",
                    seat:'a',//1,2,3,4,5 | a,b,c,d,e
                    seatname:"Top",
                    pic:"/images/player.png",
                },
                {
                    id:4,
                    name:"Khan4",
                    seat:'a',//1,2,3,4,5 | a,b,c,d,e
                    seatname:"Top",
                    pic:"/images/player.png",
                },
                {
                    id:55,
                    name:"Khan5",
                    seat:'a',//1,2,3,4,5 | a,b,c,d,e
                    seatname:"Top",
                    pic:"/images/player.png",
                },
                {
                    id:66,
                    name:"Khan6",
                    seat:'a',//1,2,3,4,5 | a,b,c,d,e
                    seatname:"Top",
                    pic:"/images/player.png",
                },
                {
                    id:77,
                    name:"Khan7",
                    seat:'a',//1,2,3,4,5 | a,b,c,d,e
                    seatname:"Top",
                    pic:"/images/player.png",
                },
                {
                    id:88,
                    name:"Khan8",
                    seat:'a',//1,2,3,4,5 | a,b,c,d,e
                    seatname:"Top",
                    pic:"/images/player.png",
                },
                {
                    id:99,
                    name:"Khan9",
                    seat:'a',//1,2,3,4,5 | a,b,c,d,e
                    seatname:"Top",
                    pic:"/images/player.png",
                },
                {
                    id:10,
                    name:"Khan100",
                    seat:'a',//1,2,3,4,5 | a,b,c,d,e
                    seatname:"Top",
                    pic:"/images/player.png",
                }
            ]
        }
    },
    data(){
        var arrow = (this.data && this.data.length > 5);
        return{
            imgKey:{
                CSGO:[],
                DOTA2:['',1,2,3,4,5],
                LOL:['','a','b','c','d','e']
            },
            arrow,
            left:false,
            right:true,
            containerId:'scroll_snap_box'
        }
    },
    methods:{
        handleScroll(event){
            // console.log("正在滚动",event)
            var _dom = event.target;
            let _now = _dom.scrollLeft;
            let max_scroll =(_dom.scrollWidth -  _dom.offsetWidth);
            var  _step = 200;
            if(_now>_step){
                this.left = true;
            }else{
                this.left = false;
            }
            if(_now < (max_scroll-_step)){
                this.right = true;
            }else{
                this.right = false;
            } 
             
        },
        scrollAct(act){
            var _step = 200, _time = 400;
            this.$nextTick(()=>{
                let _dom = this.$refs.scrollBox;
                let _now = _dom.scrollLeft;
                let _to = act?(_now+_step):(_now-_step);
                _dom.scroll({left:_to,behavior:'smooth'});
                 
            });
        }
    },
    mounted(){
         document.getElementById(this.containerId).addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy () {
         document.getElementById(this.containerId).removeEventListener('scroll', this.handleScroll);
    }
}
</script>

<style lang="less" scoped>
.scroll-snap {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items:  center ;
    .act{
        width: 24px;
        height: 24px;
        cursor: pointer;
        background-image: url("/images/arrow_g.png");
        background-size:cover;
        &:hover{
           background-image: url("/images/arrow_b.png"); 
        }
        &.left{
            transform: rotateY(180deg);
        }
        &.hide{
            background-image:none;
            cursor:default;
        }
    }
    
    .scroll-box{
        max-width: 1100px;
        font-size: 0;
        margin: auto;
        scroll-snap-type: x mandatory; /* 要求每次滚动的结束的位置精确地落在捕捉点上 */
        white-space: nowrap;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        text-align: center;
        &::-webkit-scrollbar{
            display:none;/*隐藏滚动条*/
        }

    }
    .card {
        display: inline-block;
        width: 190px;
        margin: 20px 15px;
        text-align: center;
        background-color:rgba(255, 255, 255, 0.6);
        border: 1px solid transparent;
        position: relative;
        cursor: pointer;
        scroll-snap-align: start; 
        &:before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: 1px solid transparent;
            pointer-events:none;
        }
        &:hover {
            &:before {
                border: 1px solid #5D2BCF;
            }
            .tip {
                &::before {
                    border-color: #5D2BCF transparent transparent #5D2BCF;
                }
            }
        }

        a{
            color: #333;
        }
        .tip {
            box-sizing: border-box;
            width: 54px;
            height: 54px;
            position: relative;
            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 0;
                height: 0;
                border-width: 26px;
                border-style: solid;
                border-color: #999 transparent transparent #999;
            }
            img {
                width: 22px;
                height: 22px;
                position: absolute;
                left: 4px;
                top: 4px;
            }
        }
        .pic {
            padding: 14px;
            margin-top: -45px;
            img {
                width: 162px;
                height: 162px;
                object-fit: cover;
            }
        }
        .tag {
            p {
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                height: 24px;
                line-height: 24px;
                font-size: 18px;
                font-weight: bold;
                margin: 6px 0;
                &.em {
                    font-size: 16px;
                }
            }
        }
    }
}
</style>