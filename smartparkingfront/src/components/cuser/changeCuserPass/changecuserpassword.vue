<template>
    <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用 户 ID" prop="cuserId">
                <el-input v-model="ruleForm.userid" placeholder="请输入用户ID"></el-input>
                <el-button class="checkcuserinfo" size="medium" icon="el-icon-refresh-right" type="primary" @click="showInfoView" round>核对用户信息</el-button>
            </el-form-item>
            <el-form-item label="用户密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入用户密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请再次输入用户密码"></el-input>
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
            title="核对用户信息"
            :visible.sync="dialogVisible"
            width="30%">
            <div>
                <el-tag class="updateTag">用户ID</el-tag>
                <el-input v-model="addData.cuserId" size="medium" class="updateInputFirst"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">用户密码</el-tag>
                <el-input v-model="addData.cuserPassword" size="medium" class="updateInput"></el-input>
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
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "changecuserpassword",
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
                cuserId: '',
                cuserPassword: '',
                cuserName: '',
                cuserPhone: '',
                cuserOrgid: '',
                cuserEmail: '',
                cuserCarnumber: '',
                cuserBalance: ''
            },
            dialogVisible:false,
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
                this.getRequest('/cuser/getcuserbyid/'+this.ruleForm.userid).then(resp=>{
                    if (resp[0]){
                        Object.assign(this.addData,resp[0]);
                        this.dialogVisible = true;
                    }else{
                        this.$message.error('未查询到该用户ID的个人信息！');
                    }
                })
            }else{
                this.$message.error('请输入用户ID！');
            }
        },
        submitForm() {
            if (this.ruleForm.userid){
                this.updateData.cuserId = this.ruleForm.userid;
                this.updateData.cuserPassword = this.ruleForm.pass;
                this.putRequest('/cuser/judgepassword/', this.updateData).then(resp=>{
                    if (resp.code === 200){
                        this.updateData.cuserId = this.ruleForm.userid;
                        this.updateData.cuserPassword = this.ruleForm.newpassword;
                        this.putRequest('/cuser/changenewpass/', this.updateData).then(resp2=>{
                            if (resp2.code === 200){
                                this.$message.success('密码修改成功！');
                            }else {
                                this.$message.error('密码修改失败，异常错误！');
                            }
                        })
                    }else {
                        this.$message.error('用户密码错误！');
                    }
                })
                this.updateData.cuserId = '';
                this.updateData.cuserPassword = '';
            }else{
                this.$message.error('用户ID不能为空！');
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