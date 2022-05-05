<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <div class="title">车辆出入管理系统</div>
                <el-dropdown @command="commandHandler">
                    <span class="dropdownInfo">
                        <i class="el-icon-user-solid"></i>
                        {{user.adminName}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="userinfo"><i class="el-icon-user"></i>个人中心</el-dropdown-item>
                        <el-dropdown-item command="logout"><i class="el-icon-circle-close"></i>注销登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>

            <el-container>
                <el-aside width="220px">
                    <el-menu @select="menuClick">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-menu"></i>管理员信息</template>
                            <el-menu-item index="/inquireAllmanagers"><i class="el-icon-user"></i>管理员信息查询</el-menu-item>
                            <el-menu-item index="/changeAdminPass"><i class="el-icon-key"></i>管理员密码修改</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title"><i class="el-icon-menu"></i>常驻用户管理</template>
                            <el-menu-item index="/inquireUserinfo"><i class="el-icon-user"></i>用户信息查询</el-menu-item>
                            <el-menu-item index="/changeUserbalance"><i class="el-icon-s-finance"></i>用户余额充值</el-menu-item>
                            <el-menu-item index="/changeCuserPass"><i class="el-icon-key"></i>修改用户密码</el-menu-item>
                            <el-menu-item index="/inquireOrderinfo"><i class="el-icon-search"></i>查询订单</el-menu-item>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title"><i class="el-icon-menu"></i>车辆信息管理</template>
                            <el-menu-item index="/inquireIncars"><i class="el-icon-search"></i>查询现有车辆</el-menu-item>
                            <el-menu-item index="/changeCarinfo"><i class="el-icon-edit"></i>修改现有信息</el-menu-item>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title"><i class="el-icon-menu"></i>停车场管理</template>
                            <el-menu-item index="/inquireParkinginfo"><i class="el-icon-search"></i>停车场信息查询</el-menu-item>
                            <el-menu-item index="/changeParkinginfo"><i class="el-icon-edit"></i>修改停车场信息</el-menu-item>
                        </el-submenu>
                        <el-submenu index="5">
                            <template slot="title"><i class="el-icon-menu"></i>计费规则管理</template>
                            <el-menu-item index="/inquireRules"><i class="el-icon-search"></i>查询现有规则</el-menu-item>
                            <el-menu-item index="/changeRules"><i class="el-icon-edit"></i>修改计费规则</el-menu-item>
                        </el-submenu>
                        <el-submenu index="6">
                            <template slot="title"><i class="el-icon-menu"></i>订单管理</template>
                            <el-menu-item index="/inquireAllorders"><i class="el-icon-search"></i>查询所有订单</el-menu-item>
                            <el-menu-item index="/inquireOrderbykey"><i class="el-icon-coin"></i>条件查询订单</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>

                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right"
                                   v-if="this.$router.currentRoute.path!='/home'">
                        <el-breadcrumb-item :to="{ path: '/home'}">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>{{ this.$router.currentRoute.name }}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="homeWelcome" v-if="$router.currentRoute.path=='/home'">
                        欢迎来到车辆管理系统 !
                    </div>
                    <router-view class="homeRouterView"/>
                </el-main>
            </el-container>

        </el-container>
    </div>
</template>

<script>
export default {
    name: "Home",
    data(){
        return{
            user: JSON.parse(window.sessionStorage.getItem('user'))
        }
    },
    methods: {
        menuClick(index) {
            this.$router.push(index);
        },
        commandHandler(command){
            if(command=='logout'){
                this.$confirm('此操作将注销登陆, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.postRequest('/logout');
                    window.sessionStorage.removeItem('tokenStr')
                    window.sessionStorage.removeItem('user')
                    this.$router.replace('/')
                    this.$message({
                        type: 'success',
                        message: '注销成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消注销'
                    });
                });



            }
        }
    }
}
</script>

<style>
.homeHeader {
    background: darkcyan;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    box-sizing: border-box;
}

.title {
    font-size: 25px;
    color: antiquewhite;
    font-family: STKaiti;
}

.homeWelcome {
    text-align: center;
    font-size: 30px;
    font-family: STKaiti;
    color: darkcyan;
    padding-top: 50px;
}

.dropdownInfo{
    color: antiquewhite;
}
.homeRouterView{
    margin-top: 16px;
}

</style>