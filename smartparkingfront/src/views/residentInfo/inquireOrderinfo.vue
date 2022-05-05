<template>
    <div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="用户ID" name="byCuserId"><byCuserId></byCuserId></el-tab-pane>
            <el-tab-pane label="车牌号" name="byCarNumber"><byCarNumber></byCarNumber></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import byCuserId from "../../components/order/inquireOrderByKey/byCuserId";
import byCarNumber from "../../components/order/inquireOrderByKey/byCarNumber";


export default {
    name: "inquireOrderinfo",
    data() {
        return {
            activeName: 'byCuserId'
        }
    },
    components:{
        byCuserId,
        byCarNumber
    }
}
</script>

<style scoped>

</style>