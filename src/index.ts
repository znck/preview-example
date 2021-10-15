import * as Sentry from '@sentry/browser'
import { createApp } from 'vue'

import 'virtual:windi.css'

import App from './App.vue'
import { getAccessToken } from './auth'
import { fetcher } from './fetcher'
import { router } from './router'

declare var __VERSION__: string // Defined in vite.config.ts
if (import.meta.env.PROD) {
  Sentry.init({
    dsn:
      'https://cfe32af78b1a45b8b01930684aafb964@o425642.ingest.sentry.io/5363724',
    release: `v${__VERSION__}`,
    environment: location.hostname,
  })
}

fetcher.use(async (request, next) => {
  try {
    const token = await getAccessToken()

    if (token != null) {
      request.headers.set('Authorization', `Bearer ${token}`)
    }

    const response = await next(request)

    if (response.status === 401) {
      router.push({ name: 'login' })
    } else if (response.status > 500) {
      console.log('Server Error')
    }

    return response
  } catch (error) {
    console.error(error)
    throw error
  }
})

const app = createApp(App)

app.config.errorHandler = (error, instance, info) => {
  if (import.meta.env.PROD) {
    Sentry.captureException(error, (scope) => {
      scope.setExtra('vue:info', info)
      if (instance) {
        scope.setExtra('vue:component', instance.$.type.name)
        scope.setExtra('vue:props', instance.$props)
      }
      return scope
    })
  } else {
    console.error(error, instance, info)
  }
}

console.log(`TheseMetrics v${__VERSION__}`)
app.use(router).use(fetcher).mount('#app')
