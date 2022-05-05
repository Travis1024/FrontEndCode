<template>
    <div>
        <el-button class="refreshbutton" size="small" icon="el-icon-refresh-right" type="primary" @click="refreshView" round>刷新</el-button>
        <div class="dataMain">
            <el-table
                :data="tablelist"
                :header-cell-style="{background:'#D1EEEE',color:'#828282'}"
                stripe
                border
                style="width: 90%">
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
                <el-table-column label="操作"
                                 fixed="right"
                                 width="180">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="showEditView(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="编辑计费规则"
            :visible.sync="dialogVisible"
            width="30%">
            <div>
                <el-tag class="updateTag">规则编号</el-tag>
                <el-input v-model="updateData.priceId" :disabled="true" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">规则名称</el-tag>
                <el-input v-model="updateData.priceName" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">第一段｜免费时长</el-tag>
                <el-input v-model="updateData.priceFreetime" size="medium" class="updateInputLong"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">第二段｜计费时长</el-tag>
                <el-input v-model="updateData.priceSecondtime" size="medium" class="updateInputLong"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">第二段｜计费单价</el-tag>
                <el-input v-model="updateData.priceSecondprice" size="medium" class="updateInputLong"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">第三段｜计费单价</el-tag>
                <el-input v-model="updateData.priceOtherprice" size="medium" class="updateInputLong"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">单次最高金额</el-tag>
                <el-input v-model="updateData.priceMaxprice" size="medium" class="updateInputLast"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "change",
    data(){
        return{
            tablelist:[],
            dialogVisible:false,
            updateData:{
                priceFreetime:'',
                priceId:'',
                priceMaxprice:'',
                priceName:'',
                priceOtherprice:'',
                priceSecondprice:'',
                priceSecondtime:''
            }
        }
    },
    mounted(){
        this.initTabelData();
    },
    methods:{
        refreshView(){
            this.initTabelData();
            this.$message({
                message: '刷新成功！',
                type: 'success'
            });
        },
        doUpdate(){
            this.putRequest('/pricelist/',this.updateData).then(resp=>{
                if (resp){
                    this.initTabelData();
                    this.dialogVisible = false;
                    this.$message({
                        message: '更新成功！',
                        type: 'success'
                    });
                }else{
                    this.$message.error('未知错误，更新失败！');
                }
            })
        },
        showEditView(index,data){
            Object.assign(this.updateData,data);
            this.dialogVisible = true;
        },
        initTabelData(){
            this.getRequest('/pricelist/').then(resp=>{
                if (resp){
                    this.tablelist = resp;
                }
            })
        }
    }
}
</script>

<style scoped>
.refreshbutton{
    background-color: #00afaf;
    border-color: #00afaf;
}
.dataMain{
    margin-top: 15px;
}
.updateInput{
    width: 233px;
    margin-left: 30px;
    margin-bottom: 15px;
}
.updateInputLong{
    width: 200px;
    margin-left: 15px;
    margin-bottom: 15px;
}
.updateInputLast{
    width: 224px;
    margin-left: 15px;
    margin-bottom: 10px;
}
.updateTag{
    margin-left: 40px;
}
.el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
    border-color: #D1EEEE;
}
.el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: #D1EEEE;
}

</style>