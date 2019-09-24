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
          unique-opened
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
              <span slot="title">角色列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>
              <span slot="title">权限列表</span>
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
