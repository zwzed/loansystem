import Vue from 'vue'
import Vuex from 'vuex'
import { userInfo } from '@/apis/user';
import router from '@/router/index';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 声明一个菜单数组，转换为JSON
    menuList: JSON.parse(localStorage.getItem('menuList')) || [],
    // 用户名
    userName: localStorage.getItem('userName') || ''
  },
  getters: {
  },
  mutations: {
    // 改变菜单数组的值，并做持久化储存
    GETMENULIST(state, menuList) {
      state.menuList = menuList
      localStorage.setItem('menuList', JSON.stringify(menuList))
    },
    // 更新用户名
    NAMEUPDATE(state, userName) {
      state.userName = userName
      localStorage.setItem('userName', userName)
    }
  },
  actions: {
    async getMenuList({ commit }) {
      let res = await userInfo()
      // 如果返回值不等于 20000 则代表 token 失效了
      if (res.data.code !== 20000)
        return
      let role = res.data.data.roles[0].name
      // 请求菜单列表
      let res2 = await axios.get('/menus.json')
      // 保存菜单列表
      let list = res2.data
      let menuList = []
      let routes = []

      // 用户判断
      if (role === 'administrator') {
        // 管理员获得所有权限
        routes = list
      } else if (role === 'input') {
        // 销售员获取填写申请表单权限
        routes = list.filter(item =>
          item.meta && item.meta.roles && item.meta.roles.indexOf(role) != -1 || item.meta.title === '首页'
        )
      } else if (role === 'approve') {
        // 如果是审核员则获得初审权限
        routes = list.filter(item =>
          item.meta && item.meta.roles && item.meta.roles.indexOf(role) != -1 || item.meta.title === '首页'
        )
        // 过滤掉终审
        routes = routes.map(item => {
          if (item.children) {
            item.children.forEach((it, index) => {
              if (it.meta.title === '终审')
                delete item.children[index]
            })
          }
          return item
        })
      }
      // 接收格式化的菜单
      menuList = routes.map(item => {
        // 如果菜单有children
        if (item.children) {
          item.children.map(it => {
            let path = it.path1
            it.component = () => import(`@/views${path}View.vue`);
          })
        }
        // 菜单没有children
        let url = item.component
        item.component = () => import(`@/layout/${url}.vue`)

        // 把路由添加到路由器
        router.addRoute(item)

        // 格式化菜单，取出path 和 meta
        let { path, meta } = item
        if (item.children) {
          item.children = item.children.map(it => {
            let { meta, path } = it
            return { path, title: meta.title }
          })
          return { path, title: meta.title, children: item.children }
        }
        return { path, title: meta.title }
      })

      commit('GETMENULIST', menuList)
    }
  },
  modules: {
  }
})
