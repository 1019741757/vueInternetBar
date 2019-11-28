import Vue from 'vue'
import Router from 'vue-router'
import PublicHead from '@/components/PublicHead/index'
import ReceivingExchange from '@/views/ReceivingExchange/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/login',
        component: () =>
            import('@/views/login/index'),
        hidden: true
    },
    {
    path: '/',
    component: PublicHead,
    redirect: '/homepage',
    name: '系统首页公共组件',
    children: [{
        path: 'homepage',
        name: '系统首页',
        component: () =>
          import('@/views/homepage/index'),
        meta: {
          title: '系统首页',
          icon: 'table'
        }
      }, {
        path: 'ReceivingExchange',
        name: '领取兑换管理',
        component: () =>
          import('@/views/ReceivingExchange/index'),
        meta: {
          title: '领取兑换管理',
          icon: 'table'
        }
      }, {
        path: 'ActivityStatistics',
        name: '活动统计',
        component: () =>
          import('@/views/ActivityStatistics/index'),
        meta: {
          title: '活动统计',
          icon: 'table'
        }
      },
      {
        path: 'Exchangebill',
        name: '每日兑换账单',
        component: () =>
          import('@/views/financialManagement/Exchangebill'),
        meta: {
          title: '每日兑换账单',
          icon: 'table'
        }
      },
      {
        path: 'PaymentRecord',
        name: '平台支付记录',
        component: () =>
          import('@/views/financialManagement/PaymentRecord'),
        meta: {
          title: '平台支付记录',
          icon: 'table'
        }
      },
      {
        path: 'ModifyInformation',
        name: '个人中心',
        component: () =>
          import('@/views/ModifyInformation/index'),
        meta: {
          title: '个人中心',
          icon: 'table'
        }
      },
    ]

  }]
})
