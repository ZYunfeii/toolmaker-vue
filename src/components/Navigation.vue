<template>
    <div>
        <el-container>
            <el-aside width="300px">
                <div>
                    <div class="left-align">
                        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                            <el-radio-button :label="false">展开</el-radio-button>
                            <el-radio-button :label="true">收起</el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="left-align">
                        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
                            <el-menu-item index="1" @click.native="handleOpen('/menu1')">
                                <i class="el-icon-location"></i>
                                <span slot="title">导航一</span>
                            </el-menu-item>
                            <el-menu-item index="2" @click.native="handleOpen('/menu2')">
                                <i class="el-icon-menu"></i>
                                <span slot="title">写日记</span>
                            </el-menu-item>
                            <el-menu-item index="3" @click.native="handleOpen('/menu3')">
                                <i class="el-icon-document"></i>
                                <span slot="title">导航三</span>
                            </el-menu-item>
                            <el-menu-item index="4" @click.native="handleOpen('/menu4')">
                                <i class="el-icon-setting"></i>
                                <span slot="title">导航四</span>
                            </el-menu-item>
                        </el-menu>
                    </div>
                </div>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>

</template>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.left-align {
    text-align: left;
}
</style>
<script>
export default {
    data() {
        return {
            isCollapse: true
        };
    },
    methods: {
        handleOpen(index) {
            console.log(index);
            this.$router.push(index);
        }
    },
    mounted() {
        console.log("启动!");
    }
}
</script>