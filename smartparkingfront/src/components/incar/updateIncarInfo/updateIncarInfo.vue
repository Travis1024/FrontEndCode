<template>
    <div>
        <el-button class="refreshbutton" size="medium" icon="el-icon-refresh-right" type="primary" @click="refreshView" round>刷新</el-button>
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
                    width="300">
                    <template slot-scope="scope">
                        <el-link @click="getNewsDetail(scope.row.carUrl)">{{scope.row.carUrl}}</el-link>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    fixed="right"
                    width="220">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="showEditView(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">手动处理离开</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="修改车辆信息"
            :visible.sync="dialogVisible"
            width="30%">
            <div>
                <el-tag class="updateTag">列表编号</el-tag>
                <el-input v-model="updateData.carId" :disabled="true" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">车牌号码</el-tag>
                <el-input v-model="updateData.carNumber" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">车牌颜色</el-tag>
                <el-input v-model="updateData.carNumbercolor" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">车辆类型</el-tag>
                <el-input v-model="updateData.carType" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">停车场编号</el-tag>
                <el-input v-model="updateData.carOrgid" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">是否常驻用户</el-tag>
                <el-input v-model="updateData.carJudgecuser" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">车辆进入时间</el-tag>
                <el-input v-model="updateData.carEntertime" size="medium" class="updateInput"></el-input>
            </div>
            <div>
                <el-tag class="updateTag">车辆进入照片</el-tag>
                <el-input v-model="updateData.carUrl" :disabled="true" size="medium" class="updateInputLong"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {deleteRequest} from "../../../utils/api";

export default {
    name: "updateIncarInfo",
    data(){
        return{
            tablelist:[],
            dialogVisible:false,
            updateData:{
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
        doUpdate(){
            this.putRequest('/incar/updatecar/',this.updateData).then(resp=>{
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
        doDelete(data){
            Object.assign(this.updateData,data);
            this.deleteRequest('/incar/handleleft/' + this.updateData.carNumber).then(resp=>{
                if (resp.code === 200){
                    this.initTabelData();
                    this.$message({
                        message: '手动处理成功！',
                        type: 'success'
                    });
                }else{
                    this.$message.error('未知错误，手动处理失败！');
                }
            })
        },
        handleDelete(index,data){
            this.$confirm('此操作将手动处理车辆离开,请确保车辆将进行缴费 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.doDelete(data)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消操作'
                });
            });
        },
        showEditView(index,data){
            Object.assign(this.updateData,data);
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
.dataMain{
    margin-top: 15px;
}
.updateInput{
    width: 233px;
    margin-left: 30px;
    margin-bottom: 15px;
}
.updateInputLong{
    width: 210px;
    margin-left: 25px;
    margin-bottom: 15px;
}
.updateTag{
    margin-left: 30px;
}
.el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
    border-color: #D1EEEE;
}
.el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: #D1EEEE;
}
</style>