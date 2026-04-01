import { useApi } from '@/composables/useApi'

interface Task {
  title: string;
  employee: string;
  day: string;
  assignedTo: string;
  workflow: string;
  date: string;
  status: 'overdue' | 'in-progress' | 'pending' | 'completed';
}
export function useTasksApi() {
  const { call } = useApi()
  const fetchTasks = async (params?: Record<string, any>): Promise<Task[] | null> => {
    const response = await call<{ tasks: Task[] }>('tasks', { params })
    return response ? response.tasks : null
  }
  return {
    fetchTasks,
  }
}
