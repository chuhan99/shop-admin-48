<template>
  <div class="roles">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button plain type="success" class="btn" @click="RoleAdd">添加角色</el-button>
    <el-table :data="RolesData" highlight-current-row style="width: 100%">
      <el-table-column type="expand">
        <template v-slot:default="{ row }">
          <el-row class="L1" v-for="L1 in row.children" :key="L1.id">
            <el-col :span="4">
              <el-tag @close="deleteAuthority(row,L1.id)" closable>{{ L1.authName }}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row L2 v-for="L2 in L1.children" :key="L2.id">
                <el-col :span="4">
                  <el-tag
                    @close="deleteAuthority(row,L2.id)"
                    closable
                    type="success"
                  >{{ L2.authName }}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    @close="deleteAuthority(row,L3.id)"
                    class="L3"
                    closable
                    v-for="L3 in L2.children"
                    :key="L3.id"
                    type="warning"
                  >{{ L3.authName }}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="120" class="demo-table-expand"></el-table-column>
      <el-table-column property="date" label="角色名称" prop="roleName"></el-table-column>
      <el-table-column property="name" label="描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template v-slot:default="{ row }">
          <el-button @click="roleChange(row)" size="small" plain type="primary" icon="el-icon-edit"></el-button>
          <el-button
            @click="DeleteRole(row.id)"
            size="small"
            plain
            type="danger"
            icon="el-icon-delete"
          ></el-button>
          <el-button
            @click="showAdd(row)"
            size="small"
            plain
            type="success"
            icon="el-icon-check"
          >分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="权限分配" :visible.sync="addPermission" width="40%">
      <!-- 树状 -->
      <el-tree
        ref="tree"
        node-key="id"
        :data="data"
        :props="defaultProps"
        show-checkbox
        default-expand-all
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPermission = false">取 消</el-button>
        <el-button @click="assignRights" type="primary">分 配</el-button>
      </span>
    </el-dialog>
    <!-- 添加和修改弹框 -->
    <el-dialog
      :title="DeleteAddTitle"
      :visible.sync="AddModification"
      width="40%"
      @close="EmptyTheEcho"
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="form.roleDesc" placeholder="请输入角色描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddModification = false">取 消</el-button>
        <el-button @click="ModifyTheAdd" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      RolesData: [],
      addPermission: false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      roleId: '',
      AddModification: false,
      DeleteAddTitle: '添加角色',
      form: {
        id: '',
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: ['blur', 'change'] }
        ],
        roleDesc: [
          { required: true, message: '角色描述不能为空', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created () {
    this.getRolesData()
  },
  methods: {
    async getRolesData () {
      const { meta, data } = await this.$axios.get('roles')
      // console.log(data)
      if (meta.status === 200) {
        this.RolesData = data
      } else {
        this.$message.error(meta.msg)
      }
    },
    // 删除权限
    async deleteAuthority (row, rightId) {
      const { meta, data } = await this.$axios.delete(
        `roles/${row.id}/rights/${rightId}`
      )
      // console.log(res)
      if (meta.status === 200) {
        this.$message.success(meta.msg)
        row.children = data
      } else {
        this.$message.error(meta.msg)
      }
    },
    // 显示分配弹框
    async showAdd (row) {
      // console.log(row.id)
      this.roleId = row.id
      this.addPermission = true
      const { meta, data } = await this.$axios.get('rights/tree')
      // console.log(res)
      if (meta.status === 200) {
        this.data = data
        console.log(row)

        const ids = []
        row.children.forEach(l1 => {
          l1.children.forEach(l2 => {
            l2.children.forEach(l3 => {
              ids.push(l3.id)
            })
          })
        })
        this.$refs.tree.setCheckedKeys(ids)
      } else {
        this.$message.error(meta.msg)
      }
    },
    // 分配权限提交
    async assignRights () {
      const ids = this.$refs.tree.getCheckedKeys()
      const halfs = this.$refs.tree.getHalfCheckedKeys()
      // console.log(ids, halfs)
      const rids = [...ids, ...halfs].join(',')
      // console.log(rids)

      const { meta } = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids
      })
      // console.log(res)
      if (meta.status === 200) {
        this.addPermission = false
        this.$message.success('分配成功')
        this.getRolesData()
      } else {
        this.$message.error(meta.msg)
      }
    },
    // 删除
    async DeleteRole (id) {
      try {
        await this.$confirm('你确定要删除嘛？', '温馨提示', {
          type: 'warning'
        })
        const { meta } = await this.$axios.delete(`roles/${id}`)
        // console.log(res)
        if (meta.status === 200) {
          this.$message.success(meta.msg)
          this.getRolesData()
        } else {
          this.$message.success(meta.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 更改添加和删除弹框的title
    RoleAdd () {
      this.AddModification = true
      this.DeleteAddTitle = '添加角色'
    },
    roleChange (row) {
      // console.log(row)
      this.AddModification = true
      this.DeleteAddTitle = '修改角色'
      this.$nextTick(() => {
        this.form.id = row.id
        this.form.roleName = row.roleName
        this.form.roleDesc = row.roleDesc
      })
    },
    // 清空回显
    EmptyTheEcho () {
      this.$refs.form.resetFields()
      this.form.id = ''
    },
    // 添加角色和修改角色的ajax提交
    async ModifyTheAdd () {
      const isAdd = this.DeleteAddTitle === '添加角色'
      const url = isAdd ? 'roles' : `roles/${this.form.id}`
      const method = isAdd ? 'post' : 'put'
      const { meta } = await this.$axios[method](url, this.form)
      // console.log(res)
      if (meta.status === 200 || meta.status === 201) {
        this.AddModification = false
        this.getRolesData()
        this.$message.success('操作成功')
      } else {
        this.$message.error(meta.msg)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.btn {
  margin-bottom: 10px;
}
.L1 {
  border-bottom: 1px dotted #ccc;
  margin: 7px 0;
}
.L2 {
  margin: 5px 0;
}
.L3 {
  margin: 0 5px 5px 5px;
}
</style>
