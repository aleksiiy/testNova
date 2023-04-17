import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/def',
    name: 'def',
    component: () => import('../components/DefaultFirebase.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../views/orders/ListOfOrders.vue')
  },
  {
    path: '/orders/new',
    name: 'createOrder',
    component: () => import('../views/orders/subPage/CreateOrder.vue')
  },
  {
    path: '/orders/edit/:id',
    name: 'editOrder',
    component: () => import('../views/orders/subPage/EditOrder.vue'),
    meta: {
      title: 'Edit',
      ico: 'edit.ico'
    }
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import('../views/statistic/StatisticsOrder.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.path === "/") {
//    next({name: "orders"});
//   }
//   next();
// })

export default router
