<template>
  <el-container class="index">
    <el-header>
      <div class="logo">
        <img src="../assets/logo.png" alt />
      </div>
      <div class="title">
        <h2>电商管理后台</h2>
      </div>
      <div class="right">
        欢迎光临~
        <a @click="open" href="javascript:;">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="defaultActive"
          router
          unique-opened
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu :index="l1.path" v-for="l1 in menuList" :key="l1.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{l1.authName}}</span>
            </template>
            <el-menu-item :index="l2.path" v-for="l2 in l1.children" :key="l2.id">
              <i class="el-icon-menu"></i>
              <span slot="title">{{l2.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menuList: []
    }
  },
  computed: {
    defaultActive () {
      // console.log(this.$route)
      return this.$route.path.slice(1)
    }
  },
  async created () {
    const { meta, data } = await this.$axios.get('menus')
    // console.log(data)
    if (meta.status === 200) {
      this.menuList = data
    } else {
      this.$message.error(meta.msg)
    }
  },
  methods: {
    open () {
      this.$confirm('亲。你确认要退出嘛？', '提示', {
        // confirmButtonText: '确定',
        // cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('token')
        this.$router.push('login')
        this.$message({
          type: 'success',
          message: '退出成功'
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.index {
  height: 100%;
  .el-header {
    background-color: #d8d8d8;
    display: flex;
    .logo {
      width: 180px;
      background-color: #d8d8d8;
      img {
        height: 40px;
        margin: 10px;
      }
    }
    .title {
      flex: 1;
      h2 {
        color: #545c64;
        text-align: center;
        line-height: 60px;
      }
    }
    .right {
      width: 180px;
      line-height: 60px;
      text-align: right;
      font-weight: 700;
      a {
        color: darkorange;
      }
    }
  }
  .el-aside {
    background-color: #545c64;
    .el-menu {
      border-right: none;
    }
  }
  .el-main {
    height: 100%;
    background-color: #ecf0f1;
  }
}
</style>
