<template>
    <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="管 理 员 ID" prop="userid">
                <el-input v-model="ruleForm.userid" placeholder="请输入管理员ID"></el-input>
                <el-button class="checkcuserinfo" size="medium" icon="el-icon-refresh-right" type="primary" @click="showInfoView" round>核对管理员信息</el-button>
            </el-form-item>
            <el-form-item label="管理员密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入管理员密码"></el-input>
            </el-form-item>
            <el-form-item label="确 认 密 码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请再次输入管理员密码"></el-input>
            </el-form-item>
            <el-form-item label="新 密 码" prop="newpassword">
                <el-input type="password" v-model="ruleForm.newpassword" autocomplete="off" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="submitbutton" type="primary" @click="submitForm"><i class="el-icon-circle-check"></i> 提交</el-button>
                <el-button @click="resetForm"><i class="el-icon-brush"></i> 重置</el-button>
            </el-form-item>
        </el-form>
        <el-dialog
            title="核对管理员信息"
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
                <el-input v-model="addData.adminPassword" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">管理员手机</el-tag>
                <el-input v-model="addData.adminPhone" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">上次登陆时间</el-tag>
                <el-input v-model="addData.adminLatestlogin" size="medium" class="updateInputLong"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "changeadminpassword",
    data() {
        var checkNewpassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('新密码不能为空'));
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                userid:'',
                pass: '',
                checkPass:'',
                newpassword:''

            },
            ruleFormNull: {
                userid:'',
                pass: '',
                checkPass:'',
                newpassword:''
            },
            updateData:{
                adminId: '',
                adminLatestlogin: '',
                adminName: '',
                adminOrgid: '',
                adminPassword: '',
                adminPhone: ''
            },
            dialogVisible:false,
            addData:{
                adminId: '',
                adminLatestlogin: '',
                adminName: '',
                adminOrgid: '',
                adminPassword: '',
                adminPhone: ''
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                newpassword: [
                    { validator: checkNewpassword, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        showInfoView(){
            if (this.ruleForm.userid){
                this.getRequest('/admin/getadmininfobyid/'+this.ruleForm.userid).then(resp=>{
                    if (resp[0]){
                        Object.assign(this.addData,resp[0]);
                        this.dialogVisible = true;
                    }else{
                        this.$message.error('未查询到该管理员ID的个人信息！');
                    }
                })
            }else{
                this.$message.error('请输入管理员ID！');
            }
        },
        submitForm() {
            if (this.ruleForm.userid){
                this.updateData.adminId = this.ruleForm.userid;
                this.updateData.adminPassword = this.ruleForm.pass;
                this.putRequest('/admin/judgepassword/', this.updateData).then(resp=>{
                    if (resp.code === 200){
                        this.updateData.adminId = this.ruleForm.userid;
                        this.updateData.adminPassword = this.ruleForm.newpassword;
                        this.putRequest('/admin/changenewpass/', this.updateData).then(resp2=>{
                            if (resp2.code === 200){
                                this.$message.success('密码修改成功！');
                            }else {
                                this.$message.error('密码修改失败，异常错误！');
                            }
                        })
                    }else {
                        this.$message.error('管理员密码错误！');
                    }
                })
                this.updateData.cuserId = '';
                this.updateData.cuserPassword = '';
            }else{
                this.$message.error('管理员ID不能为空！');
            }
        },
        resetForm() {
            Object.assign(this.ruleForm,this.ruleFormNull);
        }
    }
}
</script>

<style scoped>
.demo-ruleForm{
    width: 380px;
    margin-left: 350px;
    margin-top: 100px;
}
.checkcuserinfo{
    background-color: #00afaf;
    border-color: #00afaf;
    margin-top: 20px;
}
.submitbutton{
    background-color: #00afaf;
    border-color: #00afaf;
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
</style>