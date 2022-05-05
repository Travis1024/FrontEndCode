<template>
    <div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="全部用户信息" name="inquirecuserinfo"><inquirecuserinfo></inquirecuserinfo></el-tab-pane>
            <el-tab-pane label="根据用户ID查询" name="inquirecuserbyid"><inquirecuserbyid></inquirecuserbyid></el-tab-pane>
            <el-tab-pane label="根据用户姓名查询" name="inquirecuserbyname"><inquirecuserbyname></inquirecuserbyname></el-tab-pane>
            <el-tab-pane label="根据车牌号码查询" name="inquirecuserbycarnumber"><inquirecuserbycarnumber></inquirecuserbycarnumber></el-tab-pane>
            <el-tab-pane label="根据手机号码查询" name="inquirecuserbyphone"><inquirecuserbyphone></inquirecuserbyphone></el-tab-pane>
        </el-tabs>
    </div>

</template>

<script>
import Inquirecuserinfo from "../../components/cuser/inquireCuserInfo/inquirecuserinfo";
import Inquirecuserbyid from "../../components/cuser/inquireCuserInfo/inquirecuserbyid";
import Inquirecuserbyname from "../../components/cuser/inquireCuserInfo/inquirecuserbyname";
import Inquirecuserbycarnumber from "../../components/cuser/inquireCuserInfo/inquirecuserbycarnumber";
import Inquirecuserbyphone from "../../components/cuser/inquireCuserInfo/inquirecuserbyphone";

export default {
    name: "inquireUserinfo",
    data(){
        return{
            activeName: 'inquirecuserinfo'
        }
    },
    components: {Inquirecuserbyphone, Inquirecuserbycarnumber, Inquirecuserbyname, Inquirecuserbyid, Inquirecuserinfo}
}
</script>

<style scoped>

</style>