<template>
    <div>
        <el-col>
            <el-row>
                <el-col :span="6">
                    <router-link to="/markdown">
                        <el-button type="primary" icon="el-icon-edit" circle @click="goToMarkdown"></el-button>
                    </router-link>
                </el-col>
            </el-row>
            <el-row>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="博客名称">
                        <template slot-scope="scope">
                            {{ scope.row.fileName }}
                        </template>
                    </el-table-column>
                    <el-table-column label="博客文件大小">
                        <template slot-scope="scope">
                            {{ scope.row.fileSize }}KiB
                        </template>
                    </el-table-column>
                    <el-table-column label="博客地址">
                        <template slot-scope="scope">
                            <a :href="scope.row.url">{{ scope.row.url }}</a>
                        </template>
                    </el-table-column>
                    <el-table-column label="博客文件标识码">
                        <template slot-scope="scope">
                            {{ scope.row.identifier }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text"
                                size="small">
                                移除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="totalRows" />
            </el-row>
        </el-col>
    </div>
</template>

<style scoped>
.el-button {
    display: flex;
    justify-content: flex-end;
}
</style>

<script>
import { Message } from 'element-ui';
export default {
    name: 'Table',
    data() {
        return {
            tableData: [],
            apiDelete: '/api/blog/delete',
            // 分页相关的数据
            currentPage: 1, // 当前页码
            pageSize: 10, // 每页显示的条目数
            totalRows: 100, // 总条目数
        };
    },
    mounted() {
        this.fetchData(this.currentPage, this.pageSize);
    },
    methods: {
        fetchData(curPage, pageSize) {
            console.log("enter fetchData!");
            this.$axios.get(`/api/blog/list?page=${curPage}&pageSize=${pageSize}`)
                .then(response => {
                    console.log(response);
                    this.tableData = JSON.parse(response.data.data).data;
                    // console.log(response.data.data);
                    this.totalRows = JSON.parse(response.data.data).totalRows;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        deleteRow(index, tableData) {
            console.log(tableData[index].fileName);
            this.$axios.delete(`${this.apiDelete}/${tableData[index].identifier}`)
                .then(response => {
                    console.log(response.data);
                    if (response.data.code === 200) {
                        Message.success({
                            message: '删除成功！',
                            onClose: () => {
                                this.fetchData(curPage, pageSize);
                            }
                        });
                    } else if (response.data.code === 40001) {
                        Message.error({
                            message: '删除失败，未认证！',

                        })
                        this.$router.push('/login');
                    } else {
                        Message.error({
                            message: '删除失败！',
                        })
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        },
        goToMarkdown() {
            console.log("enter markdown")
            this.$router.push('/markdown');
        },
        // 处理每页显示条目数变化
        handleSizeChange(size) {
            this.pageSize = size;
            // 更新数据或重新获取数据
            this.fetchData(this.currentPage, this.pageSize);
        },
        // 处理页码变化
        handleCurrentChange(page) {
            this.currentPage = page;
            // 更新数据或重新获取数据
            this.fetchData(this.currentPage, this.pageSize);
        },
    }
};
</script>