import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 全局的属性变量
	state: {
		hasLogin: false,
		userInfo: {},
	},
	// 放一些同步方
	// 全局的同步方法(执行方式--->$store.commit("方法名"))
	mutations: {
			sum(state,a){
				console.log("mutations",a)
				console.log("mutations",state)
				return a;
			}
	},
	// 放一些异步的方法
	// 执行actions里面的方法的方式--->this.$store.dispatch("方法名字")
	actions: {
			sum(state,aObj){
				console.log("actions",aObj)
			}
	}
})

export default store
