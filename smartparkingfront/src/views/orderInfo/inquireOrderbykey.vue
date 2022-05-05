<template>
    <div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="用户ID" name="byCuserId"><byCuserId></byCuserId></el-tab-pane>
            <el-tab-pane label="车牌号" name="byCarNumber"><byCarNumber></byCarNumber></el-tab-pane>
            <el-tab-pane label="停车场ID" name="byOrgId"><byOrgId></byOrgId></el-tab-pane>
            <el-tab-pane label="进入时间段" name="byEnterTime"><byEnterTime></byEnterTime></el-tab-pane>
            <el-tab-pane label="离开时间段" name="byLeftTime"><byLeftTime></byLeftTime></el-tab-pane>
            <el-tab-pane label="进入时间段和停车场ID" name="byEnterAndOrgId"><byEnterAndOrgId></byEnterAndOrgId></el-tab-pane>
            <el-tab-pane label="离开时间段和停车场ID" name="byLeftAndOrgId"><byLeftAndOrgId></byLeftAndOrgId></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import byCuserId from "../../components/order/inquireOrderByKey/byCuserId";
    import byCarNumber from "../../components/order/inquireOrderByKey/byCarNumber";
    import byOrgId from "../../components/order/inquireOrderByKey/byOrgId";
    import byEnterTime from "../../components/order/inquireOrderByKey/byEnterTime";
    import byLeftTime from "../../components/order/inquireOrderByKey/byLeftTime";
    import byEnterAndOrgId from "../../components/order/inquireOrderByKey/byEnterAndOrgId";
    import byLeftAndOrgId from "../../components/order/inquireOrderByKey/byLeftAndOrgId";

    export default {
        name: "inquireOrderbykey",
        data() {
            return {
                activeName: 'byCuserId'
            }
        },
        components:{
            byCuserId,
            byCarNumber,
            byOrgId,
            byEnterTime,
            byLeftTime,
            byEnterAndOrgId,
            byLeftAndOrgId
        }
    }
</script>

<style scoped>

</style>