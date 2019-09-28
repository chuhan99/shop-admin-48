<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <!-- 添加 -->
    <el-button  class="addBtn" type="success" plain>添加用户</el-button>
    <el-table :data="userList" style="width: 100%;align:center" border>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <template v-slot:default="obj">
          <el-switch v-model="obj.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot:default="{row}">
          <el-button size="small" plain type="primary" icon="el-icon-edit"></el-button>
          <el-button
            size="small"
            plain
            type="danger"
            @click="DeleteRole(row.id)"
            icon="el-icon-delete"
          ></el-button>
          <el-button @click="assignRoles(row)" size="small" plain type="success" icon="el-icon-check">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--
      @size-change="handleSizeChange" 每页条数发生变化触发
      @current-change="handleCurrentChange" 当前页发生变化时触发
      :current-page="currentPage4" 配置当前页

    -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8,10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 分配对话框 -->
    <el-dialog title="分配角色" :visible.sync="assignVisible" width="40%">
      <el-form :model="assignForm" label-width="80px">
        <el-form-item label="用户名">
          <el-tag type="info">{{ assignForm.usersName }}</el-tag>
        </el-form-item>
        <el-form-item label="角色列表">
          <!-- select框的value值, 就是选中的option的value值, 用于提交的 -->
          <el-select v-model="assignForm.rid" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
<!-- @click="assignRole" -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="assignVisible = false">取 消</el-button>
        <el-button @click="allotVisible" type="primary">分 配</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created () {
    this.getUserList()
  },
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      userList: [],
      total: 0,
      assignVisible: false,
      assignForm: {
        usersName: '',
        rid: '',
        id: ''
      },
      options: []
    }
  },
  methods: {
    async getUserList () {
      const { meta, data } = await this.$axios.get('users', {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      if (meta.status === 200) {
        this.userList = data.users
        this.total = data.total
        // console.log(data)
      } else {
        this.$message.error(meta.msg)
      }
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.pagenum = 1
      this.getUserList()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUserList()
    },
    async DeleteRole (id) {
      try {
        await this.$confirm('亲，你确定要删除嘛？', '温馨提示', {
          type: 'warning'
        })
        const { meta } = await this.$axios.delete(`users/${id}`)
        // console.log(res)
        if (meta.status === 200) {
          this.$message.success(meta.msg)
          if (this.userList.length === 1 && this.pagenum > 1) {
            this.pagenum--
          }
          this.getUserList()
        } else {
          this.$message.error(meta.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async assignRoles (row) {
      // console.log(row)
      this.assignVisible = true
      this.assignForm.usersName = row.username
      this.assignForm.id = row.id
      const usersId = await this.$axios.get(`users/${row.id}`)
      // console.log(usersId)
      if (usersId.meta.status === 200) {
        const rid = usersId.data.rid
        // console.log(rid)

        // this.assignForm.rid = rid === -1 ? '' : rid
        this.assignForm.rid = rid === -1 ? '' : rid
      } else {
        this.$message.error(usersId.meta.msg)
      }

      // 获取角色列表
      const { meta, data } = await this.$axios.get('roles')
      // console.log(res)
      if (meta.status === 200) {
        this.options = data
      } else {
        this.$message.success(meta.msg)
      }
    },
    async allotVisible () {
      const { id, rid } = this.assignForm
      if (rid === '') {
        this.$message.error('请选择角色')
        return
      }
      const { meta } = await this.$axios.put(`users/${id}/role`, { rid })
      // console.log(res)
      if (meta.status === 200) {
        this.assignVisible = false
        this.getUserList()
        this.$message.success(meta.msg)
      } else {
        this.$message.error(meta.msg)
        console.log(meta)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.users {
  .input-with-select {
    width: 300px;
    margin-bottom: 10px;
  }
  .addBtn {
    margin-left: 10px;
  }
}
</style>
