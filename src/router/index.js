import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/LoginView'
import store from '@/store';

Vue.use(VueRouter)
if (localStorage.getItem('token')) {
  store.dispatch('getMenuList')
}

const routes = [
  {
    path: '/',
    redirect: '/login',
    component: LoginView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/layout/layout.vue'),
    children: [{
      meta: { title: '首页' },
      path: '/home',
      component: () => import('@/views/HomeView.vue')

    }]
  },
  // // 贷款申请路由
  // {
  //   path: '/loan-input',
  //   component: () => import('@/layout/Layout.vue'),
  //   redirect: '/loan-input/index',
  //   meta: {
  //     title: '贷款guanli'
  //   },
  //   children: [
  //     {
  //       name: 'loan-input',
  //       path: '/loan-input/index',
  //       component: () => import('@/views/loan-input/index.vue'),
  //       meta: {
  //         title: '贷款申请'
  //       }
  //     }
  //   ]
  // },
  // // 申请管理路由
  // {
  //   path: "/application-manage",
  //   component: () => import('@/layout/Layout.vue'),
  //   redirect: "/application-manage/index",
  //   meta: {
  //     roles: [
  //       'input'
  //     ],
  //     title: '申请管理'
  //   },
  //   children: [
  //     {
  //       path: '/application-manage/index',
  //       component: () => import("@/views/input-manager/index.vue"),
  //       name: '/application-manage',
  //       meta: {
  //         title: '申请列表'
  //       }
  //     }
  //   ]
  // },
  // // 贷款审批路由
  // {
  //   path: '/loan-approve',
  //   component: () => import('@/layout/Layout.vue'),
  //   redirect: '/loan-approve/first',
  //   meta: {
  //     roles: [
  //       'approve'
  //     ],
  //     title: '贷款审批'
  //   },
  //   children: [
  //     {
  //       path: '/loan-approve/first',
  //       component: () => import('@/views/loan-approve/first.vue'),
  //       name: 'first',
  //       meta: {
  //         title: '初审'
  //       }
  //     },
  //     {
  //       path: '/loan-approve/end',
  //       component: () => import('@/views/loan-approve/end.vue'),
  //       name: 'end',
  //       meta: {
  //         title: '终审'
  //       }
  //     }
  //   ]
  // },
  // // 合同管理路由
  // {
  //   path: '/contract-manage',
  //   redirect: '/contract-manage/index',
  //   meta: {
  //     title: '合同管理'
  //   },
  //   component: () => import('@/layout/Layout.vue'),
  //   children: [
  //     {
  //       path: '/contract-manage/index',
  //       name: 'contract-manage',
  //       meta: {
  //         title: '合同列表'
  //       },
  //       component: () => import('@/views/contract-manage/index.vue'),
  //     }
  //   ]
  // },
  // // 权限管理路由
  // {
  //   path: "/permission",
  //   component: () => import('@/layout/Layout.vue'),
  //   redirect: "/permission/create",
  //   meta: {
  //     title: "权限管理"
  //   },
  //   children: [
  //     {
  //       path: "/permission/create",
  //       component: () => import("@/views/permission/create.vue"),
  //       name: "create",
  //       meta: {
  //         title: "创建管理员"
  //       }
  //     },
  //     {
  //       path: "/permission/list",
  //       component: () => import("@/views/permission/list.vue"),
  //       name: "list",
  //       meta: {
  //         title: "列表展示"
  //       }
  //     }
  //   ]
  // }
]

const router = new VueRouter({

  routes,

})

export default router
