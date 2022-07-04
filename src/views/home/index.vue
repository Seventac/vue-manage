<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img class="userImg"  :src="userInfo.avatar" alt="用户头像">
          <div class="userinfo">
            <p class="name">{{userInfo.username}}</p>
            <p class="access">{{userInfo.boot}}</p>
          </div>
        </div>
        <br>
        <br>
        <hr/>
        <div class="login-info">
          <p>上次登录时间：<span>2021-7-19</span></p>
          <p>上次登录地点：<span>南昌</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px;height: 460px;">
        <el-table :data="tableData">
          <el-table-column v-for="(val,key) in tableLabel"
                           :key="key"
                           :prop="key"
                           :label="val">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col style="margin-top: 20px;" :span="15">
      <div class="numbr">
        <el-card v-for="item in countData" :key="item.name" :body-style="{padding:0,margin:'5px 0px'}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px;float: right;width: 740px;margin-left: 10px">
<!--        <div style="height: 280px" ref="echarts"></div>-->
        <Echarts :chartData="echartData.order" style="height: 280px"/>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px;float: right;width: 740px;margin-left: 10px">
<!--          <div style="height: 240px" ref="userEcharts"></div>-->
          <Echarts :chartData="echartData.user" style="height: 240px"/>
        </el-card>
        <el-card style="height: 260px;float: right;width: 740px;margin-left: 10px">
<!--          <div style="height: 240px" ref="videoEcharts"></div>-->
          <Echarts :chartData="echartData.video" :isAxisChart="false" style="height: 240px"/>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {getData} from '@/api/data'
import Echarts from "@/components/Echarts";



export default {
  name: `home`,
  components: {
    Echarts
  },
  data() {
    return {
      userInfo:{
        username:'',
        password:'',
        boot:'',
        avatar: ''
      },
      tableData: [],
      tableLabel: {
        name: '手机',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总共购买'
      },
      countData: [],
      echartData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series:[]
        }
      }
    }
  },
  mounted() {
    let us=JSON.parse(sessionStorage.getItem('userInfo'))
    this.userInfo.username=us.username
    this.userInfo.password=us.password
    if(this.userInfo.username==='admin')
      this.userInfo.boot='超级管理员'
    else
      this.userInfo.boot='普通用户'
    /*this.$http.get('/user?ID=12345')
    .then(function (response){
      console.log(response);
    })
    .catch(function (error){
      console.log(error);
    });*/
    getData().then(res => {
      console.log(res,"home/getData/res")
      const {code, data} = res.data
      if (code === 20000) {
        this.tableData = data.tableData
        this.countData = data.countData
        const order = data.orderData
        const xData = order.date
        const keyArray = Object.keys(order.data[0])
        const series = []
        keyArray.forEach(key => {
          series.push({
            name: key,
            data: order.data.map(item => item[key]),
            type: 'line'
          })
        })

        /*const option = {
          xAxis: {
            data: xData
          },
          yAxis: {},
          legend: {
            data: keyArray
          },
          series
        }*/
        this.echartData.order.xData= xData
        this.echartData.order.series= series
        /*const E = echarts.init(this.$refs.echarts)
        E.setOption(option)*/
        //用户图
        /*const userOption = {
          legend: {
            //图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          //提示框
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: "category",//类目轴
            data: data.userData.map(item => item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
          series: [{
            name: '新增用户',
            data: data.userData.map(item => item.new),
            type: 'bar'
          },
            {
              name: '活跃用户',
              data: data.userData.map(item => item.active),
              type: 'bar'
            },
          ],
        }*/
        this.echartData.user.xData= data.userData.map(item => item.date)
        this.echartData.user.series= [{
          name: '新增用户',
          data: data.userData.map(item => item.new),
          type: 'bar'
        },
          {
            name: '活跃用户',
            data: data.userData.map(item => item.active),
            type: 'bar'
          },
        ]
        /*const U = echarts.init(this.$refs.userEcharts)
        U.setOption(userOption)*/
        //饼图
        /*const videoOption = {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              data: data.videData,
              type: 'pie'
            }
          ],
        }*/
        this.echartData.video.series=[
          {
            data: data.videData,
            type: 'pie'
          }
        ]
        /*const V = echarts.init(this.$refs.videoEcharts)
        V.setOption(videoOption)*/
      }
      console.log(res)
    })
  },
  methods:{
    /*uploadImg(e){
      let $target = e.target || e.target
      let file = $target.files[0]
      let reader = new FileReader()
      reader.onload = (data) => {
        let res = data.target || data.target
        this.userInfo.avatar = res.result
      }
      reader.readAsDataURL(file)
    },*/
  },
  created() {
    console.log(sessionStorage.getItem('avatar'),"用户头像")
    this.userInfo.avatar = require("@/" + sessionStorage.getItem('avatar'))
  }
}
</script>

<style lang="less" scoped>
.userImg {
  border-radius: 50%;
  width: 140px;
  height: 140px;
}

.userinfo {
  margin-top: -150px;
  margin-left: 160px;

  .name {
    font-size: 30px;
    font-weight: bolder;
  }

  .access {
    margin-top: -20px;
  }
}

.login-info {
  font-family: "华文楷体";
  font-weight: bolder;
}

.icon {
  width: 80px;
}

.numbr {
  position: absolute;
}

.detail {
  width: 200px;
  height: 80px;
  text-align: center;

  .num {
    width: 80px;
    font-size: 20px;
    font-weight: bolder;
  }

  .txt {
    width: 120px;
  }
}
</style>
