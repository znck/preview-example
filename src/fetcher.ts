import { App, inject } from 'vue'
import { callWithMiddlewares, Middleware } from '@thesemetrics/fetch-middleware'
import { setDefaultFetcher, toStringURI } from '@thesemetrics/composable-swr'

export class HTTPException extends Error {
  constructor(public readonly response: Response) {
    super(response.statusText)
  }
}

const id = Symbol.for('app:fetch')

export function useFetch(): typeof fetch {
  return inject(id, fetch)
}

function createFetcherFn() {
  const middlewares: Middleware<Request, Response>[] = []
  const customFetch: typeof fetch = (url, init) => {
    const request = new Request(url, init)
    return callWithMiddlewares(request, fetch, middlewares)
  }

  return {
    fn: customFetch,
    use(middleware: Middleware<Request, Response>) {
      middlewares.push(middleware)
    },
    install(app: App) {
      setDefaultFetcher(async (key) => {
        const response = await fetcher.fn(toStringURI(key))

        if (response.ok) {
          if (
            response.headers.get('content-type')?.includes('application/json')
          ) {
            return response.json()
          }
        }

        throw new HTTPException(response)
      })
      app.provide(id, customFetch)
    },
  }
}

export const fetcher = createFetcherFn()
