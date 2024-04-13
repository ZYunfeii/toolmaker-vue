<template>
    <el-container>
        <el-header>
            描述
        </el-header>
        <el-container>
          <el-aside width="200px">
            <component :is="avatar"></component>
          </el-aside>
          <el-main>
            <component :is="hello"></component>
            <component :is="test"></component>
            <component :is="table"></component>
          </el-main>
        </el-container>
      </el-container>
</template>

<script>
import Avatar from '@/components/Avatar'
import Helloworld from '@/components/Helloworld'
import Test from '@/components/Test'
import Table from '@/components/Table'
export default {
  data() {
    return {
      avatar: Avatar,
      hello: Helloworld,
      test: Test,
      table: Table
    };
  },
  // 组件逻辑
}
</script>

<style>
  .el-header, .el-footer {
    background-color: #78ddb6;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #bbece4;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #fcfcfc;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>