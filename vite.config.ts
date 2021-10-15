import vue from '@vitejs/plugin-vue'
import { defineConfig, HtmlTagDescriptor, Plugin, ResolvedConfig } from 'vite'
import windi from 'vite-plugin-windicss'
import Path from 'path'
import FS from 'fs'

function getNextVersion(): string {
  return new Date().toISOString().split('T').shift()
}

function TheseMetricsCDNClient(): Plugin {
  let config!: ResolvedConfig
  return {
    name: 'thesemetrics-client',
    configResolved(_config) {
      config = _config
    },
    transformIndexHtml() {
      const isDev = config.mode === 'development'
      const result: HtmlTagDescriptor[] = isDev
        ? []
        : [
            {
              tag: 'script',
              injectTo: 'head',
              attrs: {
                async: true,
                src: 'https://unpkg.com/thesemetrics@latest', // FIXME: Serve from pixel domain?
                'data-base': config.env['VITE_PIXEL_BASE_URL'],
              },
            },
          ]

      return result
    },
  }
}

function TheseMetricsLocalClient(): Plugin {
  let config!: ResolvedConfig
  const CLIENT_JS_BUNDLE = Path.resolve(
    __dirname,
    '../client-browser/dist/browser.js',
  )

  return {
    name: 'thesemetrics-local-client',
    configResolved(_config) {
      config = _config
    },
    transformIndexHtml: {
      enforce: 'pre',
      transform(_, { path }) {
        const isDev = config.mode === 'development'
        const result: HtmlTagDescriptor[] = isDev
          ? [
              {
                tag: 'script',
                injectTo: 'head',
                attrs: {
                  async: true,
                  src: `/@fs${CLIENT_JS_BUNDLE}`,
                  'data-base': config.env['VITE_PIXEL_BASE_URL'],
                  'data-ignore-dnt': 'true',
                  'data-debug': 'true',
                },
              },
            ]
          : []

        return result
      },
    },
  }
}

function graphql(): Plugin {
  return {
    name: 'graphql',
    transform(code, id) {
      if (/\.(gql|graphql)$/.test(id)) {
        return {
          code: `export default ${JSON.stringify(code)}`,
          map: {
            mappings: '',
          },
        }
      }
    },
  }
}

export default defineConfig(() => {
  return {
    define: {
      __VERSION__: JSON.stringify(getNextVersion()),
      __VUE_PROD_DEVTOOLS__: 'true',
    },
    plugins: [
      {
        name: 'interceptor',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (
              req.url != null &&
              !/\.(ts|tsx|vue|mjs|js|css|json|html|graphql|map|png|jpg|svg)(\?.*)?$/.test(
                req.url,
              ) &&
              req.url.includes('.')
            ) {
              req.url = '/index.html'
            }

            next()
          })
        },
      },
      vue(),
      windi(),
      graphql(),
      TheseMetricsLocalClient(),
      TheseMetricsCDNClient(),
    ],
    server: {
      port: 3002,
      strictPort: true,
      hmr: {
        protocol: 'ws',
        host: 'localhost',
      },
    },
    optimizeDeps: {
      exclude: ['@thesemetrics/composable-swr'],
    },
  }
})
