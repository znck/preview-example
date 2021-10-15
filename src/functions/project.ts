import { SWRState, useSWR } from '@thesemetrics/composable-swr'
import type { Project } from '@thesemetrics/service-api/graphql'
import type { ProjectInfo } from '@thesemetrics/service-api/rest'
import {
  computed,
  ComputedRef,
  readonly,
  ref,
  Ref,
  shallowReadonly,
  unref,
  watchEffect,
} from 'vue'
import { isAuthenticated } from '../auth'
import { projects } from '../graphql'
import { HTTPException } from '../types'
import { AbsoluteURL } from '../utilities'

export function useProject(
  domain: Ref<string>,
): SWRState<ProjectInfo, HTTPException> {
  return useSWR<ProjectInfo, HTTPException>(
    () => AbsoluteURL`/api/project/${domain.value}/dashboard/default`,
  )
}

interface AsyncComputedRef<T> {
  data: ComputedRef<T | null>
  error: ComputedRef<HTTPException | null>
}

function asyncComputed<T>(getter: () => Promise<T>): AsyncComputedRef<T> {
  const data = ref(null) as Ref<T | null>
  const error = ref<HTTPException | null>(null)

  watchEffect(() => {
    async function fn(): Promise<void> {
      try {
        setRef(data, await getter())
        setRef(error, null)
      } catch (e) {
        if (e instanceof HTTPException) {
          setRef(error, e)
        } else {
          throw e
        }
      }
    }

    // eslint-disable-next-line no-void
    void fn()
  })

  return {
    data: computed(() => unref(data)),
    error: computed(() => unref(error)),
  }
}

export function useUserProjects(): AsyncComputedRef<Project[]> {
  return asyncComputed(async () => {
    if (await isAuthenticated()) {
      return await projects()
    } else {
      return []
    }
  })
}

function setRef<T>(ref: Ref<T>, value: T): void {
  ref.value = value
}
