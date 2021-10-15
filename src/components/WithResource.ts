import { SWRState } from '@thesemetrics/composable-swr'
import { unref, VNode } from 'vue'

export function WithResource<T, E>(
  { resource }: { resource: SWRState<T, E> },
  {
    slots,
  }: {
    slots: {
      default: (props: {
        data: T | null
        error: E | null
        isValidating: boolean
        isReady: boolean
      }) => VNode[]
    }
  },
) {
  return slots.default?.({
    data: unref(resource.data),
    error: unref(resource.error),
    isValidating: unref(resource.isValidating),
    isReady: unref(resource.isReady),
  })
}
