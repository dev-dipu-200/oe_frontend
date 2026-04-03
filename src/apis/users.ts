import { useApi } from '@/composables/useApi'

export type UserPayload = {
  email: string
  first_name: string
  last_name: string
  role: string
}

function unwrapApiData(payload: any) {
  if (!payload || typeof payload !== 'object') {
    return payload
  }

  if ('data' in payload) {
    return payload.data
  }

  return payload
}

function normalizeUsers(payload: any) {
  const data = unwrapApiData(payload)

  if (Array.isArray(data)) {
    return data
  }

  if (Array.isArray(data?.items)) {
    return data.items
  }

  if (Array.isArray(data?.results)) {
    return data.results
  }

  if (Array.isArray(data?.users)) {
    return data.users
  }

  return []
}

function getMessage(payload: any, fallback: string) {
  if (payload?.message && typeof payload.message === 'string') {
    return payload.message
  }

  if (payload?.data?.message && typeof payload.data.message === 'string') {
    return payload.data.message
  }

  return fallback
}

export function useUsersApi() {
  const { call } = useApi()

  const listUsers = async (basePath: string) => {
    let errorMessage = 'Failed to load users'

    const response = await call(basePath, {
      method: 'GET',
      onError: (error) => {
        errorMessage = getMessage(error?.data, errorMessage)
      }
    })

    return {
      ok: !!response,
      data: normalizeUsers(response),
      message: response ? getMessage(response, 'Users loaded successfully') : errorMessage
    }
  }

  const createUser = async (basePath: string, payload: UserPayload) => {
    let errorMessage = 'Failed to create user'

    const response = await call(basePath, {
      method: 'POST',
      body: payload,
      onError: (error) => {
        errorMessage = getMessage(error?.data, errorMessage)
      }
    })

    return {
      ok: !!response,
      data: unwrapApiData(response),
      message: response ? getMessage(response, 'User created successfully') : errorMessage
    }
  }

  const updateUser = async (basePath: string, userId: number | string, payload: UserPayload) => {
    let errorMessage = 'Failed to update user'

    const response = await call(`${basePath}/${userId}`, {
      method: 'PUT',
      body: payload,
      onError: (error) => {
        errorMessage = getMessage(error?.data, errorMessage)
      }
    })

    return {
      ok: !!response,
      data: unwrapApiData(response),
      message: response ? getMessage(response, 'Employee updated successfully') : errorMessage
    }
  }

  return {
    listUsers,
    createUser,
    updateUser
  }
}
