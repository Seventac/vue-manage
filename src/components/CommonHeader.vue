<template>
  <header>
    <div class="l-content">
      <el-button type="button" @click="handleMenu" plain icon="el-icon-s-fold" size="mini" ref="icon"></el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in tags" :key="item.path">
          <span style="color: #42b983">{{ item.label }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>

    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
      <span>
        <img class="user" :src="userImg" alt="用户头像">
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="backHome">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "CommonHeader",
  data() {
    return {
      userImg: '',
    }
  },
  methods: {
    handleMenu() {
      this.$store.commit('CollapseMenu')
    },
    logOut() {
      this.$store.commit('clearToken')
      this.$store.commit('ClearMenu')
      this.$store.commit('clearAvatar')
      //删除浏览器会话缓存的用户信息
      sessionStorage.removeItem('userInfo')
      this.$router.push('/login')
      this.$message.success('用户退出成功')
    },
    backHome() {
      if(this.$route.name!='home')
      this.$router.push({name: 'home'})
      else
        console.log("重复进入页面")
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList,
    })
  },
  created() {
    console.log(sessionStorage.getItem('avatar'),"用户头像")
    this.userImg = require("@/" + sessionStorage.getItem('avatar'))
  }
}
</script>

<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}

.l-content {
  display: flex;
  align-items: center;

  .el-button {
    margin-right: 20px;
  }
}

.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}

</style>
