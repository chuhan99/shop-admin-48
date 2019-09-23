<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
// sass 有两种语法
// (1) scss 和 less 的语法比较类似的, 该嵌套还是嵌套 区别: 声明变量 $
// (2) sass 不太适应, 必须省略 {}  ;
* {
  margin: 0;
  padding: 0;
}
html, body, #app {
  width: 100%;
  height: 100%;
}

// $color: skyblue;
// body {
//   background-color: $color;
//   p {
//     font-size: 30px;
//     color: red;
//   }
// }

// *
//   margin: 0
//   padding: 0

// body
//   background: pink
//   p
//     font-size: 50px
//     color: red

</style>
