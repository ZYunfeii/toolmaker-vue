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
        </el-col>
    </div>
</template>

<style>
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
            apiDelete: '/api/blog/delete'
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            console.log("enter fetchData!");
            this.$axios.get('/api/blog/list')
                .then(response => {
                    console.log(response);
                    this.tableData = JSON.parse(response.data.data);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        deleteRow(index, tableData) {
            console.log(tableData[index].fileName);
            this.$axios.delete(`${this.apiDelete}/${tableData[index].identifier}`)
                .then(response => {
                    if (response.data.code === 200) {
                        Message.success({
                            message: '删除成功！',
                            onClose: () => {
                                this.fetchData()
                            }
                        });
                    } else if (response.data.code >= 400) {
                        Message.success('删除失败！');
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        },
        goToMarkdown() {
            console.log("enter markdown")
            this.$router.push('/markdown');
        }
    }
};
</script>