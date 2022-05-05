<template>
    <div>
        <div>
            <el-input
                class="cusercarnumberinput"
                placeholder="请输入搜索的用户车牌号"
                prefix-icon="el-icon-search"
                v-model="get.cusercarnumberinput">
            </el-input>
            <el-button class="cusercarnumberbutton" size="medium" icon="el-icon-search" type="primary" @click="initTabelData" round>查询</el-button>
        </div>
        <div class="dataMain">
            <el-table
                :data="tablelist"
                :header-cell-style="{background:'#D1EEEE',color:'#828282'}"
                stripe
                border
                style="width: 100%">
                <el-table-column
                    prop="cuserId"
                    label="用户ID"
                    width="70">
                </el-table-column>
                <el-table-column
                    prop="cuserPassword"
                    label="用户密码"
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="cuserName"
                    label="用户姓名"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="cuserPhone"
                    label="用户电话"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="cuserEmail"
                    label="用户邮箱"
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="cuserOrgid"
                    label="注册停车场"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="cuserCarnumber"
                    label="用户车牌号"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="cuserBalance"
                    label="账户余额"
                    width="100">
                </el-table-column>
                <el-table-column
                    label="操作"
                    fixed="right"
                    width="180">
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
    name: "inquirecuserbycarnumber",
    data(){
        return{
            tablelist: [],
            dialogVisible: false,
            get: {
                cusercarnumberinput: ''
            }
        }
    },
    methods:{
        initTabelData(){
            if (this.get.cusercarnumberinput){
                this.getRequest('/cuser/getcuserbycarnumber/'+this.get.cusercarnumberinput).then(resp=>{
                    console.log(resp)
                    if (resp){
                        this.tablelist = resp;
                        this.$message({
                            message: '查询成功！',
                            type: 'success'
                        });
                    }
                })
            }else{
                this.$message.error('手机号码不能为空！');
            }
        }
    }
}
</script>

<style scoped>
.cusercarnumberinput{
    width: 300px;
    margin-right: 15px;
}
.cusercarnumberbutton{
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