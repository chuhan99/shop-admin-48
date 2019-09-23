<template>
  <div class="login">
    <!-- vue按钮组件 -->
    <!--
      1. type 控制颜色  success绿色  danger红色  primary深蓝色  info灰黑色  warning 黄色
      2. plain 简约
      3. circle 圆(椭圆) border-radius: 50%
      4. round  圆角, 胶囊
    -->
    <!--
      <el-button type="primary" round>默认按钮</el-button>
      <el-button type="primary" plain circle>默认按钮</el-button>
    -->

    <!--
      el-form 整个form表单组件
        (1) :model="form" 给form组件, 添加了一个model属性, 配置了 form对象
            将来会让表单中的表单元素 和 form 的属性双向数据绑定, 用于收集表单的信息
        (2) label-width 设置label提示文本的宽度(统一设置)

      el-form-item 单个表单项 (单行)
        (1) label 控制label提示文本
        (2) label-width 设置label提示文本的宽度(单独定制)

      el-input 输入框组件
        v-model="form.username" 让表单元素 和 form的属性双向数据绑定
     -->
    <el-form ref="form" status-icon :rules="rules" :model="form" label-width="80px">
      <img src="../assets/avatar.jpg" class="logo">
      <el-form-item label="用户名" label-width='80px' prop="username">
        <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input placeholder="请输入密码" type="password"  v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="login" class="loginBtn" type="primary">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 导入 axios
import axios from 'axios'

// 导出的是组件的配置对象, 除了template其他都能配
// 组件定义的规范: 定义的组件的根元素上, 一般都有一个和组件名同名的类名
// 定义的是 login组件 => 根元素就有 .login 类
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      // 配置校验规则的
      // 1. required: true 表示必填项
      // 2. message: 提示消息
      // 3. trigger 触发校验, blur失去焦点的时候校验
      // 4. trigger  change值改变的时候, 触发校验
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
          { min: 3, max: 12, message: '用户名必须是3-12位', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { min: 3, max: 12, message: '密码必须是3-12位', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    reset () {
      // 1. 获取到整个 form 表单组件实例
      // 2. 调用 form组件实例的方法 resetFields
      this.$refs.form.resetFields()
    },
    login () {
      // 发送ajax请求前, 先进行校验
      // 调用form组件的方法校验
      // 参数1: 是否校验成功
      // 参数2: 校验失败的字段
      this.$refs.form.validate(isValid => {
        // 如果校验失败, 直接return 啥都不用干
        if (!isValid) return
        // 校验成功, 发送ajax请求
        // console.log('发送ajax请求')
        // axios({
        //   method: 'post',
        //   url: 'http://localhost:8888/api/private/v1/login',
        //   data: this.form
        // }).then(res => {
        //   // res.data 后台返回的数据
        //   // console.log(res.data)
        //   // const meta = res.data.meta
        //   const { meta } = res.data
        //   if (meta.status === 200) {
        //     console.log('登录成功')
        //   } else {
        //     console.log(meta.msg)
        //   }
        // })

        // axios.post(url, data).then(..)
        axios.post('http://localhost:8888/api/private/v1/login', this.form).then(res => {
          const { meta } = res.data
          if (meta.status === 200) {
            // console.log('登录成功')
            // message消息框, 三种用法
            // 1. 直接提示
            // this.$message('你好哇')

            // 2. 通过配置对象, 配置不同的提示效果
            this.$message({
              type: 'success',
              message: '恭喜, 登录成功',
              duration: 1000
            })

            // 3. 直接使用方法名, 配置提示的效果
            // this.$message.success('恭喜, 登录成功')

            // 完成路由的跳转
            // this.$router整个路由实例, 可以有个方法, push 方法, 可以跳转路由
            // this.$route 当前路由相关的信息 (传参, 地址)
            // this.$router.push('/index')
            this.$router.push({ name: 'index' })
          } else {
            this.$message({
              type: 'error',
              message: meta.msg,
              duration: 1000
            })
          }
        })
      })
    }
  }
}

// const obj = {
//   name: 'pp',
//   age: 18,
//   desc: '你不错',
//   hobby: '打篮球'
// }
// const { name, age, desc, hobby } = obj

// const name = obj.name
// const age = obj.age
// const desc = obj.desc
// const hobby = obj.hobby

</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  background-color: #2d434c;
  overflow: hidden;

  .el-form {
    width: 400px;
    padding: 20px;
    padding-top: 70px;
    margin: 0 auto;
    margin-top: 200px;
    background-color: #fff;
    border-radius: 20px;
    position: relative;

    .logo {
      position: absolute;
      top: -70px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 50%;
      border: 5px solid #fff;
    }

    .loginBtn {
      margin-right: 80px;
    }
  }
}
</style>
