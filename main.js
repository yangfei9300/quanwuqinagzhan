// 入口文件

import Vue from 'vue'
import store from './store'
import App from './App'
import axios from "./common/axios.js"
import paths from "./common/path"
import tools from "./common/tools.js"

import util from './common/js/util.js';
//引用样式
import './style/style.css'
import './style/style_rpx.css'
Vue.prototype.$store = store; //挂在到Vue实例上
Vue.prototype.$axios = axios ;//请求封装
Vue.prototype.$paths = paths ;//请求地址
Vue.prototype.$tools = tools ;//工具类
Vue.prototype.util = util;

// 工具类
App.mpType = 'app'
const app = new Vue({
    ...App
})   
app.$mount()