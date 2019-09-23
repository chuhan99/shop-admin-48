<template>
  <div class="index">
    <el-header>
      <div class="logo">
        <img src="../assets/logo.png" alt />
      </div>
    </el-header>
  </div>
</template>

<script>
export default {}
</script>

<style lang='scss'>
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
  }
}
</style>
