import * as Vue from 'vue'
import { router } from './src/router'

import 'virtual:windi.css'
import './src/style.css'

export const createApp: typeof Vue.createApp = (component, data) => {
  const app = Vue.createApp(component, data)

  app.use(router)

  return app
}
