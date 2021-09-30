import Task from './task'

export interface ITaskRepository {
  save(task: Task): Promise<void>
  getAll(): Promise<Task[]>
}
