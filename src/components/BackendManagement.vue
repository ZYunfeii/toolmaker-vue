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

<style>
@import '../../static/backendmanagement.css';
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