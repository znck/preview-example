import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from './auth'
import NotFound from './routes/not-found.vue'
import DashboardPage from './routes/dashboard.vue'
import HomePage from './routes/index.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: HomePage,
      meta: {
        auth: true,
      },
    },
    {
      name: 'dashboard',
      path: '/dashboard/:domain',
      component: DashboardPage,
      props: true,
      meta: {
        mayBeAuth: true,
      },
    },
    {
      name: 'create',
      path: '/create',
      component: () => import('./routes/create.vue'),
      meta: {
        auth: true,
      },
    },
    {
      name: 'settings',
      path: '/settings',
      component: () => import('./routes/settings.vue'),
      meta: {
        auth: true,
      },
    },
    {
      name: 'upgrade',
      path: '/settings/subscription',
      component: () => import('./routes/upgrade.vue'),
      meta: {
        auth: true,
      },
    },
    {
      name: 'downgrade',
      path: '/settings/subscription/cancel',
      component: () => import('./routes/downgrade.vue'),
      meta: {
        auth: true,
      },
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('./routes/login.vue'),
      meta: {
        auth: false,
      },
    },
    {
      path: '/:catchAll(.*)',
      component: NotFound,
    },
  ],
})

router.beforeEach(async (to, _, next) => {
  try {
    if (to.meta == null) return next()
    if (to.meta.mayBeAuth) await isAuthenticated()

    if (to.meta.auth === true) {
      if (!(await isAuthenticated())) {
        return next({ name: 'login', query: { from: to.fullPath } })
      } else {
        return next()
      }
    } else if (to.meta.auth === false) {
      if (await isAuthenticated()) {
        return next({ name: 'home' })
      } else {
        return next()
      }
    } else {
      return next()
    }
  } catch (error) {
    console.error(error)
    return next('/500')
  }
})
