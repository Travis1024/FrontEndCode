import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import {postRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {getRequest} from "./utils/api";


Vue.config.productionTip = false
Vue.use(ElementUI);
//插件形式使用请求
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;

router.beforeEach((to, from, next) => {
    if (window.sessionStorage.getItem('tokenStr')) {
        if(!window.sessionStorage.getItem('user')){
            return getRequest('/admin/info').then(resp=>{
                if(resp){
                    window.sessionStorage.setItem('user',JSON.stringify(resp));
                    next();
                }
            })
        }
        next();
    } else {
        if (to.path == '/') {
            next();
        }else{
            next('/?redirect='+to.path);
        }
    }
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
