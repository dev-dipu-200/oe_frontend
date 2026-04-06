import { useApi } from '@/composables/useApi'

export type EmployeePayload = {
  employee_code: string
  first_name: string
  last_name: string
  email: string
  department: string
  designation: string
  mobile_number: string
  gender: string
  date_of_birth: string
  date_of_joining: string
  reporting_time: string
  work_location: string
  employee_type: string
  reporting_manager_id: number | null
  remarks: string
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

function normalizeEmployees(payload: any) {
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

  if (Array.isArray(data?.employees)) {
    return data.employees
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

export function useEmployeesApi() {
  const { call } = useApi()

  const listEmployees = async (basePath: string, params?: Record<string, any>) => {
    let errorMessage = 'Failed to load employees'

    const response = await call(basePath, {
      method: 'GET',
      params,
      onError: (error) => {
        errorMessage = getMessage(error?.data, errorMessage)
      }
    })

    return {
      ok: !!response,
      data: normalizeEmployees(response),
      message: response ? getMessage(response, 'Employees loaded successfully') : errorMessage
    }
  }

  const createEmployee = async (basePath: string, payload: EmployeePayload) => {
    let errorMessage = 'Failed to create employee'

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
      message: response ? getMessage(response, 'Employee created successfully') : errorMessage
    }
  }

  const updateEmployee = async (basePath: string, employeeId: number | string, payload: EmployeePayload) => {
    let errorMessage = 'Failed to update employee'

    const response = await call(`${basePath}/${employeeId}`, {
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

  const getEmployee = async (basePath: string, employeeId: number | string) => {
    let errorMessage = 'Failed to load employee details'

    const response = await call(`${basePath}/${employeeId}`, {
      method: 'GET',
      onError: (error) => {
        errorMessage = getMessage(error?.data, errorMessage)
      }
    })

    return {
      ok: !!response,
      data: unwrapApiData(response),
      message: response ? getMessage(response, 'Employee details loaded successfully') : errorMessage
    }
  }

  return {
    listEmployees,
    getEmployee,
    createEmployee,
    updateEmployee
  }
}
