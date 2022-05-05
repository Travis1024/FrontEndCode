<template>
    <div>
        <div>
            <el-input
                class="adminidinput"
                placeholder="请输入搜索的管理员ID"
                prefix-icon="el-icon-search"
                v-model="get.adminidinput">
            </el-input>
            <el-button class="adminidbutton" size="medium" icon="el-icon-search" type="primary" @click="initTabelData" round>查询</el-button>
        </div>
        <div class="dataMain">
            <el-table
                :data="tablelist"
                :header-cell-style="{background:'#D1EEEE',color:'#828282'}"
                stripe
                border
                style="width: 100%">
                <el-table-column
                    prop="adminId"
                    label="管理员ID"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="adminName"
                    label="管理员姓名"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="adminOrgid"
                    label="负责停车场"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="adminPassword"
                    label="管理员密码"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="adminPhone"
                    label="管理员手机"
                    width="160">
                </el-table-column>
                <el-table-column
                    prop="adminLatestlogin"
                    label="上次登陆时间"
                    width="240">
                </el-table-column>
                <el-table-column
                    label="操作"
                    fixed="right"
                    width="200">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="showEditView(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">注销</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name: "inquireadminbyid",
    data(){
        return{
            tablelist: [],
            dialogVisible: false,
            get: {
                adminidinput: ''
            }
        }
    },
    methods:{
        initTabelData(){
            if (this.get.adminidinput){
                this.getRequest('/admin/getadmininfobyid/'+this.get.adminidinput).then(resp=>{
                    if (resp){
                        this.tablelist = resp;
                        this.$message({
                            message: '查询成功！',
                            type: 'success'
                        });
                    }
                })
            }else{
                this.$message.error('管理员ID不能为空！');
            }
        }
    }
}
</script>

<style scoped>
.adminidinput{
    width: 300px;
    margin-right: 15px;
}
.adminidbutton{
    background-color: #00afaf;
    border-color: #00afaf;
}
.dataMain{
    margin-top: 15px;
}
.el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
    border-color: #D1EEEE;
}
.el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: #D1EEEE;
}
</style>