<template>
    <div>
        <div class="block">
            <el-date-picker
                v-model="post.entertime"
                type="datetimerange"
                range-separator="至"
                value-format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            <el-button class="EnterTimebutton" size="medium" icon="el-icon-search" type="primary" @click="initTabelData" round>查询</el-button>
        </div>
        <div class="dataMain">
            <el-table
                :data="tablelist"
                :header-cell-style="{background:'#D1EEEE',color:'#828282'}"
                stripe
                border
                style="width: 100%">
                <el-table-column
                    prop="orderId"
                    label="订单编号"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="orderCarnumber"
                    label="车牌号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="orderCarnumbercolor"
                    label="车牌颜色"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="orderCartype"
                    label="车辆类型"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="orderJudgecuser"
                    label="常驻用户"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="orderOrgid"
                    label="停车场"
                    width="70">
                </el-table-column>
                <el-table-column
                    prop="orderEntrytime"
                    label="进入时间"
                    width="170">
                </el-table-column>
                <el-table-column
                    prop="orderLefttime"
                    label="离开时间"
                    width="170">
                </el-table-column>
                <el-table-column
                    prop="orderCost"
                    label="总计费用"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="orderNeedpay"
                    label="缴纳费用"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="orderInurl"
                    label="进入图像url"
                    width="300">
                    <template slot-scope="scope">
                        <el-link @click="getNewsDetail(scope.row.orderInurl)">{{scope.row.orderInurl}}</el-link>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="orderOuturl"
                    label="离开图像url"
                    width="300">
                    <template slot-scope="scope">
                        <el-link @click="getNewsDetail(scope.row.orderOuturl)">{{scope.row.orderOuturl}}</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import {postRequest} from "../../../utils/api";

export default {
    name: "byEnterTime",
    data(){
        return{
            post:{
                entertime:[]
            },
            postdata:{
                starttime:'',
                endtime:'',
            },
            tablelist:[]
        }
    },
    methods:{
        getNewsDetail(url){
            window.open(url, "_blank");
        },
        initTabelData(){
            if (this.post.entertime){
                this.postdata.starttime = this.post.entertime[0];
                this.postdata.endtime = this.post.entertime[1];
                this.postRequest('/orderlist/getorderbyintime/',this.postdata).then(resp=>{
                    if (resp){
                        this.tablelist = resp;
                        this.$message({
                            message: '查询成功！',
                            type: 'success'
                        });
                    }
                })
            }else{
                this.$message.error('时间不能为空！');
            }
        }
    }
}
</script>

<style scoped>
.EnterTimebutton{
    margin-left: 15px;
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