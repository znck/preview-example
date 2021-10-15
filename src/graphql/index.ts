import type {
  InputCreateProject,
  InputDowngradeToStarter,
  InputUpdateSubscription,
  InputUpgradeToPro,
  PaymentIntent,
  Project,
  User,
} from '../../../service-api/graphql'
import { fetcher } from '../fetcher'
import { HTTPException } from '../types'
import { AbsoluteURL } from '../utilities'
import CREATE_BILLING_PORTAL_SESSION from './createBillingPortalSession.graphql'
import CREATE_PROJECT_MUTATION from './createProject.graphql'
import DOWNGRADE_TO_STARTER_MUTATION from './downgradeToStarter.graphql'
import ME_QUERY from './me.graphql'
import PROJECTS_QUERY from './projects.graphql'
import UPDATE_SUBSCRIPTION from './updateSubscription.graphql'
import UPGRADE_TO_PRO_MUTATION from './upgradeToPro.graphql'

interface ValidationField {
  property: string
  value: string
  constraints: Record<string, string>
  children: ValidationField[]
}

export class ValidationException extends Error {
  constructor(message: string, public errors: ValidationField[] = []) {
    super(message)
  }
}

export async function me(): Promise<User> {
  return await withErrorHandling(
    async () => await request(ME_QUERY),
    (data) => data.me,
  )
}

export async function createBillingPortalSession(): Promise<{ url: string }> {
  return await withErrorHandling(
    async () => await request(CREATE_BILLING_PORTAL_SESSION),
    (data) => data.createBillingPortalSession,
  )
}

export async function upgradeToPro(
  params: InputUpgradeToPro,
): Promise<PaymentIntent> {
  return await withErrorHandling(
    async () => await request(UPGRADE_TO_PRO_MUTATION, { params }),
    (data) => data.upgradeToPro,
  )
}

export async function updateSubscription(
  params: InputUpdateSubscription,
): Promise<PaymentIntent> {
  return await withErrorHandling(
    async () => await request(UPDATE_SUBSCRIPTION, { params }),
    (data) => data.upgradeToPro,
  )
}

export async function downgradeToStarter(
  params: InputDowngradeToStarter,
): Promise<PaymentIntent> {
  return await withErrorHandling(
    async () => await request(DOWNGRADE_TO_STARTER_MUTATION, { params }),
    (data) => data.downgradeToStarter,
  )
}

export async function projects(): Promise<Project[]> {
  return await withErrorHandling(
    async () => await request(PROJECTS_QUERY),
    (data) => data.projects ?? [],
  )
}

export async function createProject(
  params: InputCreateProject,
): Promise<Project> {
  return await withErrorHandling(
    async () => await request(CREATE_PROJECT_MUTATION, params),
    (data) => data.createProject as Project,
  )
}

async function withErrorHandling<T>(
  query: () => Promise<{ data?: any; errors?: any[] }>,
  fn: (data: any) => T,
): Promise<T> {
  const { data, errors } = await query()

  if (data != null) return fn(data)

  checkForValidationError(errors)

  if (Array.isArray(errors) && errors.length > 0) {
    const error = errors[0]
    const code = error.code ?? 500
    const message = error.message ?? error.response

    throw new HTTPException(code, message, error.response)
  }

  throw new Error('Unknown error occurred. Try refreshing page.')
}

function checkForValidationError(errors: any[] | undefined): void {
  const validation = errors?.find((error) => error.code === 422)

  if (validation != null) {
    throw new ValidationException(validation.message, validation.response)
  }
}

async function request(query: string, variables?: any): Promise<any> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  const response = await fetcher.fn(
    AbsoluteURL`/graphql`, // GraphQL API
    {
      method: 'POST',
      body: JSON.stringify({ query, variables }),
      headers,
      mode: 'cors',
    },
  )

  if (response.ok) {
    return await response.json()
  }

  throw new Error(response.statusText)
}
