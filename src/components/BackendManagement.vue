<template>
    <el-container>
        <el-header>
            <el-row type="flex" class="row-bg" justify="end">
                <el-col class="toptitle">
                    云飞的后台管理系统
                </el-col>
                <el-col :span="6" class="avatar-col">
                    <component :is="avatar"></component>
                </el-col>
                
            </el-row>
        </el-header>

        <component :is="navi"></component>

        
            
    </el-container>
</template>

<style scoped>
.el-header {
    background-color: #e4ecec;
    color: #333;
    font-family:Arial, Helvetica, sans-serif;
    border-radius: 10px; /* 添加圆角 */
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1); /* 添加阴影 */
    margin-bottom: 20px;
  }

  .avatar-col {
    position: relative;
    bottom: -10px; /* 向下偏移的距离 */
  }

.toptitle {
  position: relative;
    bottom: -15px; /* 向下偏移的距离 */;
    font-family: Arial, sans-serif;
    font-size: 150%;
}
</style>

<script>
import Navigation from '@/components/Navigation'
import Avatar from '@/components/Avatar'
export default {
    data() {
        return {
            navi: Navigation,
            avatar: Avatar
        };
    }
}
</script>