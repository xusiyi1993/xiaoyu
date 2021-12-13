import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../pages/login/login')
const Index = () => import('../layout/index')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  //控制台
  {
    path: '/console',
    name: 'console',
    component: Index,
    redirect: '/console/home/index',
    //首页
    children: [
      {
        name: 'console.home.index',
        path: '/console/home/index',
        component: () => import('../pages/console/home/Index.vue')
      },
      //搜索管理
      {
        name: 'console.keyword.index',
        path: '/console/keyword/index',
        component: () => import('../pages/console/search/Keyword.vue')
      },
      //课程管理
      {
        name: 'console.coursePublisher.index',
        path: '/console/coursePublisher/index',
        component: () => import('../pages/console/course/press/coursePublisher.vue')
      },
      {
        name: 'console.course.index',
        path: '/console/course/index',
        component: () => import('../pages/console/course/courselist/course.vue')
      },
      {
        name: 'console.category.index',
        path: '/console/category/index',
        component: () => import('../pages/console/course/courseCategory.vue')
      },
      //会员管理
      {
        name: 'console.member.index',
        path: '/console/member/index',
        component: () => import('../pages/console/member/member.vue')
      },
      {
        name: 'console.memberGroup.index',
        path: '/console/memberGroup/index',
        component: () => import('../pages/console/member/memberGroup.vue')
      },
      {
        name: 'console.memberSocial.index',
        path: '/console/memberSocial/index',
        component: () => import('../pages/console/member/memberSocial.vue')
      },
      //微信管理
      {
        name: 'console.weixinMenu.index',
        path: '/console/weixinMenu/index',
        component: () => import('../pages/console/weixin/weixinMenu.vue')
      },
      { 
        name: 'console.weixinMaterial.index',
        path: '/console/weixinMaterial/index',
        component: () => import('../pages/console/weixin/weixinMaterial.vue')
      },
      {
        name: 'console.weixinReply.index',
        path: '/console/weixinReply/index',
        component: () => import('../pages/console/weixin/weixinReply.vue')
      },
    ]
  },
  //营销管理
  {
    path: '/market',
    name: 'market',
    component: Index,
    redirect: '/market/advert/index',
    children: [
      {
        name: 'market.advert.index',
        path: '/market/advert/index',
        component: () => import('../pages/market/advert/Index.vue')
      },
      {
        name: 'market.advertGroup.index',
        path: '/market/advertGroup/index',
        component: () => import('../pages/market/advert/advertGroup.vue')
      },
    ]
  },
  //系统管理
  {
    path: '/system',
    name: 'system',
    component: Index,
    redirect: '/system/setting/index',
    children: [
      //网站配置
      {
        name: 'system.setting.index',
        path: '/system/setting/index',
        component: () => import('../pages/system/setting/setting.vue')
      },
      {
        name: 'system.settingGroup.index',
        path: '/system/settingGroup/index',
        component: () => import('../pages/system/setting/settingGroup.vue')
      },
      //权限管理
      {
        name: 'system.userInfo.index',
        path: '/system/userInfo/index',
        component: () => import('../pages/system/user/userInfo.vue')
      },
      {
        name: 'system.userAuthorition.index',
        path: '/system/userAuthorition/index',
        component: () => import('../pages/system/user/userAuthorition.vue')
      },
      {
        name: 'system.userRole.index',
        path: '/system/userRole/index',
        component: () => import('../pages/system/user/userRole.vue')
      },
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
