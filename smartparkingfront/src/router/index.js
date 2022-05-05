import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import Home from "../views/Home";

import changeRules from "../views/chargingrulesInfo/changeRules";
import inquireRules from "../views/chargingrulesInfo/inquireRules";

import changeCarinfo from "../views/incarInfo/changeCarinfo";
import inquireIncars from "../views/incarInfo/inquireIncars";

import inquireAllmanagers from "../views/managerInfo/inquireAllmanagers";
import changeAdminPass from "../views/managerInfo/changeAdminPass";

import inquireAllorders from "../views/orderInfo/inquireAllorders";
import inquireOrderbykey from "../views/orderInfo/inquireOrderbykey";

import changeParkinginfo from "../views/parkingInfo/changeParkinginfo";
import inquireParkinginfo from "../views/parkingInfo/inquireParkinginfo";

import changeUserbalance from "../views/residentInfo/changeUserbalance";
import inquireOrderinfo from "../views/residentInfo/inquireOrderinfo";
import inquireUserinfo from "../views/residentInfo/inquireUserinfo";
import changeCuserPass from "../views/residentInfo/changeCuserPass";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children:[
            {
                path: '/changeRules',
                name: '修改计费规则',
                component: changeRules
            },
            {
                path: '/inquireRules',
                name: '查询现有规则',
                component: inquireRules
            },
            {
                path: '/changeCarinfo',
                name: '修改现有信息',
                component: changeCarinfo
            },
            {
                path: '/inquireIncars',
                name: '查询现有车辆',
                component: inquireIncars
            },
            {
                path: '/inquireAllmanagers',
                name: '查询所有',
                component: inquireAllmanagers
            },
            {
                path: '/changeAdminPass',
                name: '管理员密码修改',
                component: changeAdminPass
            },
            {
                path: '/inquireAllorders',
                name: '查询所有订单',
                component: inquireAllorders
            },
            {
                path: '/inquireOrderbykey',
                name: '条件查询订单',
                component: inquireOrderbykey
            },
            {
                path: '/changeParkinginfo',
                name: '修改停车场信息',
                component: changeParkinginfo
            },
            {
                path: '/inquireParkinginfo',
                name: '停车场信息查询',
                component: inquireParkinginfo
            },
            {
                path: '/changeUserbalance',
                name: '用户余额充值',
                component: changeUserbalance
            },
            {
                path: '/inquireOrderinfo',
                name: '查询订单',
                component: inquireOrderinfo
            },
            {
                path: '/inquireUserinfo',
                name: '用户信息查询',
                component: inquireUserinfo
            },
            {
                path: '/changeCuserPass',
                name: '修改用户密码',
                component: changeCuserPass
            }
        ]
    }
]

const router = new VueRouter({
    // mode: 'history',
    // routes: routes
    routes
})

export default router
