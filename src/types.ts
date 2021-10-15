import type { ProjectInfo } from '@thesemetrics/core/src/rest/dto/ProjectInfo'
import { InjectionKey } from 'vue'

export interface DashboardContext {
  domain: string
  path: string
  from: Date
  to: Date
  project: null | ProjectInfo
}

export const DASHBOARD_CONTEXT: InjectionKey<DashboardContext> = Symbol(
  'Dashboard~Context',
)

export class HTTPException extends Error {
  constructor(public code: number, message: string, public payload: any) {
    super(message)
  }
}
