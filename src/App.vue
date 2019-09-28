<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

* {
  margin: 0;
  padding: 0;
}
html, body, #app {
  width: 100%;
  height: 100%;
}
#app{
   .el-breadcrumb {
    margin-bottom: 8px ;
    padding: 8px 0;
    border-bottom: 1px solid #c5c5c5;
    // font-size: 15px;
  }
}

</style>
