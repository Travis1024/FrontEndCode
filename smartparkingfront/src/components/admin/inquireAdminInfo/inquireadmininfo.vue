<template>
    <div>
        <el-button class="refreshbutton" size="medium" icon="el-icon-refresh-right" type="primary" @click="refreshView" round>刷新</el-button>
        <el-button class="addDataButton" size="medium" icon="el-icon-circle-plus-outline" type="primary" @click="showAddView" round>新增管理员</el-button>
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
        <el-dialog
            title="新增管理员"
            :visible.sync="dialogVisible"
            width="30%">
            <div>
                <el-tag class="updateTag">管理员ID</el-tag>
                <el-input v-model="addData.adminId" size="medium" class="updateInputFirst"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">管理员姓名</el-tag>
                <el-input v-model="addData.adminName" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">负责停车场</el-tag>
                <el-input v-model="addData.adminOrgid" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">管理员密码</el-tag>
                <el-input v-model="addData.adminPassword" size="medium" class="updateInput" show-password></el-input>
            </div>
            <div>
                <el-tag class="updateTag">管理员手机</el-tag>
                <el-input v-model="addData.adminPhone" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">上次登陆时间</el-tag>
                <el-input :disabled="true" v-model="addData.adminLatestlogin" size="medium" class="updateInputLong"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="doAddData">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改管理员信息"
            :visible.sync="dialogVisible2"
            width="30%">
            <div>
                <el-tag class="updateTag">管理员ID</el-tag>
                <el-input :disabled="true" v-model="addData.adminId" size="medium" class="updateInputFirst"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">管理员姓名</el-tag>
                <el-input v-model="addData.adminName" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">负责停车场</el-tag>
                <el-input v-model="addData.adminOrgid" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">管理员密码</el-tag>
                <el-input :disabled="true" v-model="addData.adminPassword" size="medium" class="updateInput" show-password></el-input>
            </div>
            <div>
                <el-tag class="updateTag">管理员手机</el-tag>
                <el-input v-model="addData.adminPhone" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">上次登陆时间</el-tag>
                <el-input :disabled="true" v-model="addData.adminLatestlogin" size="medium" class="updateInputLong"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible2 = false">取 消</el-button>
                <el-button size="small" type="primary" @click="doUpdateData">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="注销管理员"
            :visible.sync="dialogVisible3"
            width="30%">
            <div>
                <el-tag class="updateTag">用户ID</el-tag>
                <el-input :disabled="true" v-model="deleteData.adminId" size="medium" class="updateInputFirst"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">用户姓名</el-tag>
                <el-input :disabled="true" v-model="deleteData.adminName" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">用户密码</el-tag>
                <el-input v-model="deleteData.adminPassword" size="medium" class="updateInput" show-password></el-input>
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
    name: "inquireadmininfo",
    data(){
        return{
            tablelist:[],
            transcuserid:'',
            dialogVisible:false,
            dialogVisible2:false,
            dialogVisible3:false,
            addData:{
                adminId: '',
                adminLatestlogin: '',
                adminName: '',
                adminOrgid: '',
                adminPassword: '',
                adminPhone: ''
            },
            addDataNull:{
                adminId: '',
                adminLatestlogin: '',
                adminName: '',
                adminOrgid: '',
                adminPassword: '',
                adminPhone: ''
            },
            deleteData:{
                adminId: '',
                adminLatestlogin: '',
                adminName: '',
                adminOrgid: '',
                adminPassword: '',
                adminPhone: ''
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
            this.deleteData.adminPassword = '';
            this.dialogVisible3 = true;
        },
        dodeleteData(){
            this.transcuserid = this.deleteData.adminId;
            this.putRequest('/admin/judgepassword/', this.deleteData).then(resp=>{
                if (resp.code === 200){
                    this.deleteRequest('/admin/deleteadmin/' + this.transcuserid).then(resp2=>{
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
            this.putRequest('/admin/updateadmin/',this.addData).then(resp=>{
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
            this.postRequest('/admin/addadmin/',this.addData).then(resp=>{
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
            this.getRequest('/admin/').then(resp=>{
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