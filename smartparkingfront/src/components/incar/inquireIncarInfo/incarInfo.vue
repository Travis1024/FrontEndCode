<template>
    <div>
        <el-button class="refreshbutton" size="medium" icon="el-icon-refresh-right" type="primary" @click="refreshView" round>刷新</el-button>
        <el-button class="addDataButton" size="medium" icon="el-icon-circle-plus-outline" type="primary" @click="showAddView" round>新增进入车辆</el-button>
        <div class="dataMain">
            <el-table
                :data="tablelist"
                :header-cell-style="{background:'#D1EEEE',color:'#828282'}"
                stripe
                border
                style="width: 100%">
                <el-table-column
                    prop="carId"
                    label="列表编号"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="carNumber"
                    label="车牌号码"
                    width="110">
                </el-table-column>
                <el-table-column
                    prop="carNumbercolor"
                    label="车牌颜色"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="carType"
                    label="车辆类型"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="carOrgid"
                    label="停车场编号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="carJudgecuser"
                    label="是否常驻用户"
                    width="110">
                </el-table-column>
                <el-table-column
                    prop="carEntertime"
                    label="车辆进入时间"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="carUrl"
                    label="车辆进入照片"
                    width="520">
                    <template slot-scope="scope">
                        <el-link @click="getNewsDetail(scope.row.carUrl)">{{scope.row.carUrl}}</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="新增进入车辆"
            :visible.sync="dialogVisible"
            width="30%">
            <div>
                <el-tag class="updateTag">车牌号码</el-tag>
                <el-input v-model="addData.carNumber" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">车牌颜色</el-tag>
                <el-input v-model="addData.carNumbercolor" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">车辆类型</el-tag>
                <el-input v-model="addData.carType" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">停车场编号</el-tag>
                <el-input v-model="addData.carOrgid" size="medium" class="updateInputLong"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="doAddData">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "incarInfo",
    data(){
        return{
            tablelist:[],
            dialogVisible:false,
            addData:{
                carId: '',
                carNumber: '',
                carNumbercolor: '',
                carType: '',
                carJudgecuser: '',
                carOrgid: '',
                carEntertime: '',
                carUrl: ''
            },
            addDataNull:{
                carId: '',
                carNumber: '',
                carNumbercolor: '',
                carType: '',
                carJudgecuser: '',
                carOrgid: '',
                carEntertime: '',
                carUrl: ''
            }
        }
    },
    mounted(){
        this.initTabelData();
    },
    methods:{
        getNewsDetail(url){
            window.open(url, "_blank");
        },
        refreshView(){
            this.initTabelData();
            this.$message({
                message: '刷新成功！',
                type: 'success'
            });
        },
        doAddData(){
            this.postRequest('/incar/addincar/',this.addData).then(resp=>{
                if (resp.code == 200){
                    this.initTabelData();
                    this.dialogVisible = false;
                    Object.assign(this.addData,this.addDataNull);
                    this.$message({
                        message: '添加成功！',
                        type: 'success'
                    });
                }else{
                    this.$message.error('未知错误，添加失败！');
                }
            })
        },
        showAddView(){
            this.dialogVisible = true;
        },
        initTabelData(){
            this.getRequest('/incar/allcar/').then(resp=>{
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
.addDataButton{
    margin-left: 20px;
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
    width: 221px;
    margin-left: 30px;
    margin-bottom: 15px;
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