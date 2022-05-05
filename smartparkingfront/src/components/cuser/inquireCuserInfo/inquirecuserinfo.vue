<template>
    <div>
        <el-button class="refreshbutton" size="medium" icon="el-icon-refresh-right" type="primary" @click="refreshView" round>刷新</el-button>
        <el-button class="addDataButton" size="medium" icon="el-icon-circle-plus-outline" type="primary" @click="showAddView" round>新增常驻用户</el-button>
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
        <el-dialog
            title="新增常驻用户"
            :visible.sync="dialogVisible"
            width="30%">
            <div>
                <el-tag class="updateTag">用户ID</el-tag>
                <el-input v-model="addData.cuserId" size="medium" class="updateInputFirst"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">用户密码</el-tag>
                <el-input v-model="addData.cuserPassword" size="medium" class="updateInput" show-password></el-input>
            </div>
            <div>
                <el-tag class="updateTag">用户姓名</el-tag>
                <el-input v-model="addData.cuserName" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">用户电话</el-tag>
                <el-input v-model="addData.cuserPhone" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">用户邮箱</el-tag>
                <el-input v-model="addData.cuserEmail" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">注册停车场</el-tag>
                <el-input v-model="addData.cuserOrgid" size="medium" class="updateInputLong"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">用户车牌号</el-tag>
                <el-input v-model="addData.cuserCarnumber" size="medium" class="updateInputLong"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">账户余额</el-tag>
                <el-input v-model="addData.cuserBalance" size="medium" class="updateInput"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="doAddData">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改常驻用户信息"
            :visible.sync="dialogVisible2"
            width="30%">
            <div>
                <el-tag class="updateTag">用户ID</el-tag>
                <el-input :disabled="true" v-model="addData.cuserId" size="medium" class="updateInputFirst"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">用户密码</el-tag>
                <el-input :disabled="true" v-model="addData.cuserPassword" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">用户姓名</el-tag>
                <el-input v-model="addData.cuserName" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">用户电话</el-tag>
                <el-input v-model="addData.cuserPhone" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">用户邮箱</el-tag>
                <el-input v-model="addData.cuserEmail" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">注册停车场</el-tag>
                <el-input v-model="addData.cuserOrgid" size="medium" class="updateInputLong"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">用户车牌号</el-tag>
                <el-input v-model="addData.cuserCarnumber" size="medium" class="updateInputLong"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">账户余额</el-tag>
                <el-input :disabled="true" v-model="addData.cuserBalance" size="medium" class="updateInput"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible2 = false">取 消</el-button>
                <el-button size="small" type="primary" @click="doUpdateData">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="注销用户"
            :visible.sync="dialogVisible3"
            width="30%">
            <div>
                <el-tag class="updateTag">用户ID</el-tag>
                <el-input :disabled="true" v-model="deleteData.cuserId" size="medium" class="updateInputFirst"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">用户密码</el-tag>
                <el-input v-model="deleteData.cuserPassword" size="medium" class="updateInput" show-password></el-input>
            </div>
            <div>
                <el-tag class="updateTag">账户余额</el-tag>
                <el-input :disabled="true" v-model="deleteData.cuserBalance" size="medium" class="updateInput"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible3 = false">取 消</el-button>
                <el-button size="small" type="primary" @click="dodeleteData">确定注销</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "inquirecuserinfo",
    data(){
        return{
            tablelist:[],
            transcuserid:'',
            dialogVisible:false,
            dialogVisible2:false,
            dialogVisible3:false,
            addData:{
                cuserId: '',
                cuserPassword: '',
                cuserName: '',
                cuserPhone: '',
                cuserOrgid: '',
                cuserEmail: '',
                cuserCarnumber: '',
                cuserBalance: ''
            },
            addDataNull:{
                cuserId: '',
                cuserPassword: '',
                cuserName: '',
                cuserPhone: '',
                cuserOrgid: '',
                cuserEmail: '',
                cuserCarnumber: '',
                cuserBalance: ''
            },
            deleteData:{
                cuserId: '',
                cuserPassword: '',
                cuserName: '',
                cuserPhone: '',
                cuserOrgid: '',
                cuserEmail: '',
                cuserCarnumber: '',
                cuserBalance: ''
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
        showEditView(index,data){
            Object.assign(this.addData,data);
            this.dialogVisible2 = true;
        },
        handleDelete(index,data){
            Object.assign(this.deleteData,data);
            this.deleteData.cuserPassword = '';
            this.dialogVisible3 = true;
        },
        dodeleteData(){
            this.transcuserid = this.deleteData.cuserId;
            this.putRequest('/cuser/judgepassword/', this.deleteData).then(resp=>{
                if (resp.code === 200){
                    this.deleteRequest('/cuser/deletecuser/' + this.transcuserid).then(resp2=>{
                        if (resp2.code === 200){
                            this.$message.success('注销成功！');
                            this.dialogVisible3 = false;
                            this.initTabelData();
                        }else {
                            this.$message.error('注销失败，未知错误！');
                        }
                    })
                }else{
                    this.$message.error('密码验证失败！');
                }
            })
        },
        doUpdateData(){
            this.putRequest('/cuser/updateinfo/',this.addData).then(resp=>{
                if (resp.code === 200){
                    this.initTabelData();
                    this.dialogVisible2 = false;
                    this.$message({
                        message: '更新成功！',
                        type: 'success'
                    });
                }else{
                    this.$message.error('未知错误，更新失败！');
                }
            })
        },
        doAddData(){
            this.postRequest('/cuser/addcuser/',this.addData).then(resp=>{
                if (resp.code === 200){
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
            Object.assign(this.addData,this.addDataNull);
            this.dialogVisible = true;
        },
        initTabelData(){
            this.getRequest('/cuser/allinfo/').then(resp=>{
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
    width: 225px;
    margin-left: 30px;
    margin-bottom: 15px;
}
.updateInputLong{
    width: 225px;
    margin-left: 18px;
    margin-bottom: 15px;
}
.updateInputFirst{
    width: 224px;
    margin-left: 42px;
    margin-bottom: 10px;
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