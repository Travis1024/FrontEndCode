<template>
    <div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="所有计费规则" name="inquireAllRules"><inquire-all-rules></inquire-all-rules></el-tab-pane>
            <el-tab-pane label="根据ID查询" name="inquireRuleById"><inquire-rule-by-id></inquire-rule-by-id></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import inquireAllRules from "../../components/chargingrules/inquireRules/inquireAllRules";
    import inquireRuleById from "../../components/chargingrules/inquireRules/inquireRuleById";

    export default {
        name: "inquireRules",
        data(){
            return{
                activeName:'inquireAllRules'
            }
        },
        components:{
            inquireAllRules,
            inquireRuleById
        }
    }
</script>

<style scoped>

</style>