import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: '首頁',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/tourlist',
    name: '旅遊清單頁面',
    component: () => import('../views/TourList.vue')
  },
  {
    path: '/tourdetail',
    name: 'detail',
    component: () => import('../views/TourDetail.vue')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('../views/MapView.vue')
  },
  {
    // 404
    path: '/:pathMatch(.*)*',
    component: () => import('../views/PageError.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to) {
    if (to.fullPath.match('tourlist')) {
      return {
        top: 0
      }
    } else if (to.fullPath.match('tourdetail')) {
      return {
        top: 0
      }
    }
  }
})

export default router
