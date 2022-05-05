<template>
    <div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="全部管理员信息" name="inquireadmininfo"><inquireadmininfo></inquireadmininfo></el-tab-pane>
            <el-tab-pane label="根据管理员ID查询" name="inquireadminbyid"><inquireadminbyid></inquireadminbyid></el-tab-pane>
            <el-tab-pane label="根据管理员姓名查询" name="inquireadminbyname"><inquireadminbyname></inquireadminbyname></el-tab-pane>
            <el-tab-pane label="根据停车场ID查询" name="inquireadminbyorgid"><inquireadminbyorgid></inquireadminbyorgid></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Inquireadmininfo from "../../components/admin/inquireAdminInfo/inquireadmininfo";
import Inquireadminbyid from "../../components/admin/inquireAdminInfo/inquireadminbyid";
import Inquireadminbyname from "../../components/admin/inquireAdminInfo/inquireadminbyname";
import Inquireadminbyorgid from "../../components/admin/inquireAdminInfo/inquireadminbyorgid";
export default {
    name: "inquireAllmanagers",
    components: {Inquireadminbyorgid, Inquireadminbyname, Inquireadminbyid, Inquireadmininfo},
    data(){
        return{
            activeName: 'inquireadmininfo'
        }
    }
}
</script>

<style scoped>

</style>