<template>
  <div class="rights">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="RightsData" highlight-current-row style="width: 100%">
      <el-table-column type="index" width="120"></el-table-column>
      <el-table-column property="date" label="权限名称" prop="authName"></el-table-column>
      <el-table-column property="name" label="路径" prop="path"></el-table-column>
      <el-table-column property="address" label="层级" >
          <template v-slot:default="{ row }">
            <p v-if="row.level==='0'">一级</p>
            <p v-if="row.level==='1'">二级</p>
            <p v-if="row.level==='2'">三级</p>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      RightsData: []
    }
  },
  async created () {
    const { meta, data } = await this.$axios.get('rights/list')
    console.log(data)
    if (meta.status === 200) {
      this.RightsData = data
    } else {
      this.$message.error(meta.msg)
    }
  }
}
</script>

<style>
</style>
