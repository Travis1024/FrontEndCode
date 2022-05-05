<template>
    <div>
        <el-form :rules="rules"
                 v-loading="loading"
                 element-loading-text="正在登陆..."
                 element-loading-spinner="el-icon-loading"
                 element-loading-background="rgba(0, 0, 0, 0.8)"
                 ref="loginForm"
                 :model="loginForm" class="loginContainer">
            <h3 class="loginTitle">系统登陆</h3>

            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.userid" placeholder="请输入用户名"></el-input>
            </el-form-item>

            <el-form-item prop="password">
                <el-input type="password" auto-complete="false" v-model="loginForm.password"
                          placeholder="请输入密码"></el-input>
            </el-form-item>

            <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
            <el-button type="primary" style="width: 100%" @click="submitLogin">登陆</el-button>

        </el-form>
    </div>
</template>

<script>

export default {
    name: "Login",
    data() {
        return {
            loginForm: {
                userid: "root",
                password: '1234'
            },
            checked: true,
            loading:false,
            rules: {
                userid: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                password: [{required: true, message: '请输入密码', trigger: 'blur'}]
            }
        }
    },
    methods: {
        submitLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading=true;
                    this.postRequest('/login',this.loginForm).then(resp=>{
                        if(resp){
                            this.loading=false;
                            //存储token
                            const tokenStr = resp.obj.tokenHead+resp.obj.token;
                            window.sessionStorage.setItem('tokenStr',tokenStr);
                            this.$router.replace('/home')
                        }
                    })
                } else {
                    this.$message.error('请输入所有字段!');
                    return false;
                }
            });
        }
    }
}
</script>

<style>
.loginContainer {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 160px auto;
    width: 350px;
    padding: 25px 35px 25px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
    margin: 0px auto 40px auto;
    text-align: center;
}

.loginRemember {
    text-align: left;
    margin: 0px 0px 15px 0px;
}

</style>