<template>
    <div>
        <el-button class="refreshbutton" size="medium" icon="el-icon-refresh-right" type="primary" @click="refreshView" round>刷新</el-button>
        <el-button class="addDataButton" size="medium" icon="el-icon-circle-plus-outline" type="primary" @click="showAddView" round>新增停车场</el-button>
        <div class="dataMain">
            <el-table
                :data="tablelist"
                :header-cell-style="{background:'#D1EEEE',color:'#828282'}"
                stripe
                border
                style="width: 100%">
                <el-table-column
                    prop="orgId"
                    label="停车场编号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="orgName"
                    label="停车场名称"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="orgTotalnumber"
                    label="车位总数量"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="orgBusynumber"
                    label="已占用车位"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="orgAddress"
                    label="停车场地址"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="orgStatus"
                    label="停车场状态"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="orgManagername"
                    label="管理员姓名"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="orgManagerphone"
                    label="管理员手机号码"
                    width="140">
                </el-table-column>
                <el-table-column
                    prop="orgUnlockpassword"
                    label="停车场管理密码"
                    width="140">
                </el-table-column>
                <el-table-column
                    prop="orgPriceid"
                    label="停车场计费规则"
                    width="120">
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="新增停车场信息"
            :visible.sync="dialogVisible"
            width="30%">
            <div>
                <el-tag class="updateTag">停车场编号</el-tag>
                <el-input v-model="addData.orgId" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">停车场名称</el-tag>
                <el-input v-model="addData.orgName" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">车位总数量</el-tag>
                <el-input v-model="addData.orgTotalnumber" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">已占用车位</el-tag>
                <el-input v-model="addData.orgBusynumber" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">停车场地址</el-tag>
                <el-input v-model="addData.orgAddress" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">停车场状态</el-tag>
                <el-input v-model="addData.orgStatus" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">管理员姓名</el-tag>
                <el-input v-model="addData.orgManagername" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">管理员手机号码</el-tag>
                <el-input v-model="addData.orgManagerphone" size="medium" class="updateInputLong"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">停车场管理密码</el-tag>
                <el-input v-model="addData.orgUnlockpassword" size="medium" class="updateInputLong"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">停车场计费规则</el-tag>
                <el-input v-model="addData.orgPriceid" size="medium" class="updateInputLong"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="doAddData">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "parkingInfo",
    data(){
        return{
            tablelist:[],
            dialogVisible:false,
            addData:{
                orgAddress:'',
                orgBusynumber:'',
                orgId:'',
                orgManagername:'',
                orgManagerphone:'',
                orgName:'',
                orgPriceid:'',
                orgStatus:'',
                orgTotalnumber:'',
                orgUnlockpassword:''
            },
            addDataNull:{
                orgAddress:'',
                orgBusynumber:'',
                orgId:'',
                orgManagername:'',
                orgManagerphone:'',
                orgName:'',
                orgPriceid:'',
                orgStatus:'',
                orgTotalnumber:'',
                orgUnlockpassword:''
            }
        }
    },
    mounted(){
        this.initTabelData();
    },
    methods:{
        refreshView(){
            this.initTabelData();
            this.$message({
                message: '刷新成功！',
                type: 'success'
            });
        },
        doAddData(){
            this.postRequest('/parklist/',this.addData).then(resp=>{
                if (resp.code == 200){
                    this.initTabelData();
                    this.dialogVisible = false;
                    Object.assign(this.addData,this.addDataNull);
                    this.$message({
                        message: '添加成功！',
                        type: 'success'
                    });
                }else{
                    this.$message.error('未知错误，添加失败！');
                }
            })
        },
        showAddView(){
            this.dialogVisible = true;
        },
        initTabelData(){
            this.getRequest('/parklist/').then(resp=>{
                if (resp){
                    this.tablelist = resp;
                }
            })
        }
    }
}
</script>

<style scoped>
.refreshbutton{
    background-color: #00afaf;
    border-color: #00afaf;
}
.addDataButton{
    margin-left: 20px;
    background-color: #00afaf;
    border-color: #00afaf;
}
.dataMain{
    margin-top: 15px;
}
.updateInput{
    width: 233px;
    margin-left: 30px;
    margin-bottom: 15px;
}
.updateInputLong{
    width: 200px;
    margin-left: 15px;
    margin-bottom: 15px;
}
.updateTag{
    margin-left: 40px;
}
.el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
    border-color: #D1EEEE;
}
.el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: #D1EEEE;
}
</style>