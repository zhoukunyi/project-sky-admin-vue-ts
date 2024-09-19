<template>
  <div class="dashboard-container">
    <div class="container">
      <div class="tableBar">
        <label style="margin-right: 5px;">
          员工姓名：
        </label>
        <el-input v-model="name" placeholder="请输入员工姓名" style="width: 15%" />
        <el-button type="primary" style="margin-left: 15px;" @click="pageQuery()">查询</el-button>
        <el-button type="primary" style="float: right;">+添加员工</el-button>
      </div>
      <el-table
    :data="records"
    stripe
    style="width: 100%">
    <el-table-column
      prop="name"
      label="员工姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="username"
      label="账号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="status"
      label="帐号状态"
      width="180">
      <template slot-scope="scope">
        {{ scope.row.status === 0 ? '禁用' : '启用' }}
      </template>
    </el-table-column>
    <el-table-column
      prop="updateTime"
      label="最后操作时间">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="text">修改</el-button>
        <el-button type="text" @click="startOrStop(scope.row)">{{ scope.row.status === 1 ? '禁用' : '启用' }}</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      class="pageList"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import {getEmployeeList,handleStartOrStop} from '@/api/employee'
export default  {
  //数据模型
  data(){
      return{
        name: '',
        page: 1,
        pageSize: 10,
        total: 0,
        records: []
      }
    },
  created(){
    this.pageQuery()
  },
  methods:{
    //分页查询
    pageQuery(){
      //准备请求参数
      const params = {name:this.name,page:this.page,pageSize:this.pageSize}
      //发送ajax请求
      getEmployeeList(params).then(res => {
        if(res.data.code === 1){
          this.total = res.data.data.total
          this.records = res.data.data.records
        }
      }).catch(err => {
        this.$message.console.error('请求出错了：' + err.message);
      })
    },
    startOrStop(row){
      //alert(`id=${row.id} status=${row.status}`)
      if(row.username === 'admin'){
        this.$message.error('admin账号不能更改')
        return
      }

      this.$confirm('确定修改当前员工状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'}).then(() => {
            const p = {id:row.id,status:row.status ? 0 : 1}
            handleStartOrStop(p).then(res =>{
              if(res.data.code === 1){
            this.$message.success('修改成功')
            this.pageQuery()
          }
        })
      })
    },
    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.pageQuery()
    },
    handleCurrentChange(page){
      this.page = page
      this.pageQuery()
    }
  }
}
</script>

<style lang="scss" scoped>
.disabled-text {
  color: #bac0cd !important;
}
</style>
