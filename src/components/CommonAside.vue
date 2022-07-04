<template>
<!-- 待完善处，让tag焦点改变后，边框的选择项跟着改变 -->
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose"
           :collapse="isCollapse">
    <h3>{{isCollapse?'后台':'后台管理系统'}}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
      <i :class="'el-icon-' + item.icon"></i>
      <span>{{item.label}}</span>
    </el-menu-item>
      <!-- index进行了数据绑定不转换成字符串会报错   -->
    <el-submenu v-for="item in hasChildren"  :index="item.path+''" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-'+ item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group  v-for="(subItem,subIndex) in item.children" :key="subItem.path">
        <!-- index进行了数据绑定不转换成字符串会报错   -->
        <el-menu-item @click="clickMenu(subItem)" :index="subIndex+''">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: `CommonAside`,
  data() {
    return {
      menu:[]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item){
      console.log("进行的点击导航按钮操作")
      if(item.name=== item.name)
        this.$router.replace({ name:item.name }).catch(()=>{ console.log('重复进入同一页面')});
      else
      this.$router.push({
          name:item.name
      })

      this.$store.commit('SelectMenu',item)
    }
  },
  computed:{
    noChildren(){
     return  this.asyncMenu.filter(item => !item.children)
    },
    hasChildren(){
      return this.asyncMenu.filter(item => item.children)
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    },
    asyncMenu(){
      return this.$store.state.tab.menu
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;

}
.el-menu{
  height: 100vh;
  border: none;
  h3{
    color: #fff;
    text-align: center;
    line-height: 40px;
  }
}
</style>