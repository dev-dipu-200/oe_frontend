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

export function usePhaseApi(basePath: string = "super-admin") {
  const { call } = useApi();

  const listPhases = async (processType: string = "onboarding") => {
    return await call<any[]>(`${basePath}/phases/${processType}`, {
      params: {
        is_paginate: false,
        page: 1,
        page_size: 10,
      },
    });
  };

  const createPhase = async (payload: PhasePayload) => {
    return await call<any>(`${basePath}/phases`, {
      method: "POST",
      body: payload,
    });
  };

  const updatePhase = async (id: number, payload: PhasePayload) => {
    return await call<any>(`${basePath}/phases`, {
      method: "PUT",
      body: { ...payload, phase_id: id },
    });
  };

  const createTask = async (phaseId: number, payload: TaskPayload) => {
    return await call<any>(`${basePath}/phases/${phaseId}/tasks`, {
      method: "POST",
      body: payload,
    });
  };

  const listTasks = async (phaseId: number) => {
    return await call<any[]>(`${basePath}/phases/${phaseId}/tasks`);
  };

  return {
    listPhases,
    createPhase,
    updatePhase,
    createTask,
    listTasks,
  };
}
