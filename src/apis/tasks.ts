import { useApi } from '@/composables/useApi'

interface Task {
  id: number;
  task_name: string;
  status: string;
  description?: string;
  assigned_role?: string;
  created_at: string;
  updated_at?: string;
  phase?: {
    id: number;
    phase_name: string;
    phase_number: number;
    process?: {
      employee?: {
        first_name: string;
        last_name: string;
        employee_code?: string;
      };
    };
  };
}

interface TasksResponse {
  message: string;
  data: {
    tasks: Task[];
    pagination: {
      is_paginate: boolean;
      page: number;
      page_size: number;
      total_records: number;
      total_pages: number;
    };
  };
  status_code: number;
  status: string;
}

export function useTasksApi() {
  const { call } = useApi();

  const fetchTasks = async (params?: Record<string, any>): Promise<TasksResponse | null> => {
    try {
      const response = await call<TasksResponse>('hr/my-tasks', {
        method: 'GET',
        params,
      });

      console.log("My Tasks API Response:", response);
      
      return response;
    } catch (error) {
      console.error("Error fetching my tasks:", error);
      return null;
    }
  };

  return {
    fetchTasks,
  };
}