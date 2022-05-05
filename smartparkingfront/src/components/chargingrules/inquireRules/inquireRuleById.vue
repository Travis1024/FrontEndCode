<template>
    <div>
        <div>
            <el-input
                class="ruleidinput"
                placeholder="请输入搜索的规则编号"
                prefix-icon="el-icon-search"
                v-model="get.ruleid">
            </el-input>
            <el-button class="rulebutton" size="medium" icon="el-icon-search" type="primary" @click="initTabelData" round>查询</el-button>
        </div>
        <div class="dataMain">
            <el-table
                :data="tablelist"
                :header-cell-style="{background:'#D1EEEE',color:'#828282'}"
                stripe
                border
                style="width: 80%">
                <el-table-column
                    prop="priceId"
                    label="规则编号"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="priceName"
                    label="规则名称"
                    width="140">
                </el-table-column>
                <el-table-column
                    prop="priceFreetime"
                    label="第一段｜免费时长"
                    width="140">
                </el-table-column>
                <el-table-column
                    prop="priceSecondtime"
                    label="第二段｜计费时长"
                    width="140">
                </el-table-column>
                <el-table-column
                    prop="priceSecondprice"
                    label="第二段｜计费单价"
                    width="140">
                </el-table-column>
                <el-table-column
                    prop="priceOtherprice"
                    label="第三段｜计费单价"
                    width="140">
                </el-table-column>
                <el-table-column
                    prop="priceMaxprice"
                    label="单次最高金额"
                    width="120">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name: "inquireRuleById",
    data(){
        return{
            get:{
                ruleid:''
            },
            tablelist:[]
        }
    },
    methods:{
        initTabelData(){
            if (this.get.ruleid){
                this.getRequest('/pricelist/getpricebyid/' + this.get.ruleid).then(resp=>{
                    if (resp){
                        this.tablelist = [];
                        this.tablelist.push(resp);
                        this.$message.success('查询成功！')
                    }else{
                        this.$message.error('该规则不存在！')
                    }
                })
            }else {
                this.$message.error('规则编号不能为空！');
            }
        }
    }
}
</script>

<style scoped>
.ruleidinput{
    width: 300px;
    margin-right: 15px;
}
.rulebutton{
    background-color: #00afaf;
    border-color: #00afaf;
}
.dataMain{
    margin-top: 15px;
}
.el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
    border-color: #D1EEEE;
}
.el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: #D1EEEE;
}
</style>