import { useApi } from '@/composables/useApi'

interface Task {
  is_paginated: boolean;
  title: string;
  employee: string;
  day: string;
  assignedTo: string;
  workflow: string;
  date: string;
  keyword: 'overdue' | 'in-progress' | 'pending' | 'completed';
  // my-tasks?is_paginate=true&page=1&page_size=10&keyword=inprogress
  /* "pagination": {
      "is_paginate": true,
      "page": 1,
      "page_size": 10,
      "total_records": 5,
      "total_pages": 1
    }*/
}
export function useTasksApi() {
  const { call } = useApi()
  const fetchTasks = async (params?: Record<string, any>): Promise<Task[] | null> => {
    const response = await call<{ tasks: Task[] }>('hr/my-tasks', { params })
    return response ? response.tasks : null
  }
  return {
    fetchTasks,
  }
}
