import { useApi } from "@/composables/useApi";

export interface PhasePayload {
  process_type: string;
  phase_number: number;
  phase_name: string;
  description: string;
}

export interface TaskPayload {
  task_order: number;
  task_name: string;
  description: string;
  assigned_role: string;
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

function getMessage(payload: any, fallback: string) {
  if (payload?.message && typeof payload.message === 'string') {
    return payload.message
  }

  if (payload?.data?.message && typeof payload.data.message === 'string') {
    return payload.data.message
  }

  return fallback
}

export function usePhaseApi(basePath: string = "super-admin") {
  const { call } = useApi();

  const listPhases = async (processType: string = "onboarding") => {
    let errorMessage = 'Failed to load phases'
    const response = await call<any>(`${basePath}/phases/${processType}`, {
      params: {
        is_paginate: false,
        page: 1,
        page_size: 10,
      },
      onError: (error) => {
        errorMessage = getMessage(error?.data, errorMessage)
      }
    });

    return {
      ok: !!response,
      data: unwrapApiData(response),
      message: response ? getMessage(response, 'Phases loaded successfully') : errorMessage,
      status_code: response?.status_code
    }
  };

  const createPhase = async (payload: PhasePayload) => {
    let errorMessage = 'Failed to create phase'
    const response = await call<any>(`${basePath}/phases`, {
      method: "POST",
      body: payload,
      onError: (error) => {
        errorMessage = getMessage(error?.data, errorMessage)
      }
    });

    return {
      ok: !!response,
      data: unwrapApiData(response),
      message: response ? getMessage(response, 'Phase created successfully') : errorMessage,
      status_code: response?.status_code
    }
  };

  const updatePhase = async (id: number, payload: PhasePayload) => {
    let errorMessage = 'Failed to update phase'
    const response = await call<any>(`${basePath}/phases`, {
      method: "PUT",
      body: { ...payload, phase_id: id },
      onError: (error) => {
        errorMessage = getMessage(error?.data, errorMessage)
      }
    });

    return {
      ok: !!response,
      data: unwrapApiData(response),
      message: response ? getMessage(response, 'Phase updated successfully') : errorMessage,
      status_code: response?.status_code
    }
  };

  const createTask = async (phaseId: number, payload: TaskPayload) => {
    let errorMessage = 'Failed to create task'
    const response = await call<any>(`${basePath}/phases/${phaseId}/tasks`, {
      method: "POST",
      body: payload,
      onError: (error) => {
        errorMessage = getMessage(error?.data, errorMessage)
      }
    });

    return {
      ok: !!response,
      data: unwrapApiData(response),
      message: response ? getMessage(response, 'Task created successfully') : errorMessage,
      status_code: response?.status_code
    }
  };

  const listTasks = async (phaseId: number) => {
    let errorMessage = 'Failed to load tasks'
    const response = await call<any>(`${basePath}/phases/${phaseId}/tasks`, {
      onError: (error) => {
        errorMessage = getMessage(error?.data, errorMessage)
      }
    });

    return {
      ok: !!response,
      data: unwrapApiData(response),
      message: response ? getMessage(response, 'Tasks loaded successfully') : errorMessage,
      status_code: response?.status_code
    }
  };

  return {
    listPhases,
    createPhase,
    updatePhase,
    createTask,
    listTasks,
  };
}
