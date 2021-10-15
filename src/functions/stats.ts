import { SWRState, useSWR } from '@thesemetrics/composable-swr'
import type {
  ProjectLiveStats,
  ProjectStats,
} from '@thesemetrics/service-api/rest'
import { DashboardContext, HTTPException } from '../types'
import { toDateString, AbsoluteURL } from '../utilities'

export function useStats(
  options: Omit<DashboardContext, 'project'>,
): Readonly<SWRState<ProjectStats, HTTPException>> {
  return useSWR<ProjectStats, HTTPException>(
    () =>
      AbsoluteURL`/api/project/${options.domain}/stats?path=${
        options.path
      }&from=${toDateString(options.from)}&to=${toDateString(
        normalize(options.to),
      )}`,
  )
}

export function useLiveStats(
  options: Pick<DashboardContext, 'domain' | 'path'>,
): Readonly<SWRState<ProjectLiveStats, HTTPException>> {
  return useSWR<ProjectLiveStats, HTTPException>(
    () =>
      AbsoluteURL`/api/project/${options.domain}/live-stats?path=${options.path}`,
    { refreshInterval: 15000 },
  )
}

function normalize(date: Date): Date {
  if (toDateString(date) === toDateString(new Date())) {
    return new Date(date.getTime() - 24 * 3600 * 1000)
  }

  return date
}
