import { ITaskRepository } from 'src/domain/models/task/ITaksRepository'
import Task from 'src/domain/models/task/task'
import TaskStatus, {
  TaskStatusAttribute,
  TASK_STATUS_NAME,
} from 'src/domain/models/task/taskStatus'
import { Identifier } from 'src/domain/shared/Identifier'
import { Context } from '../shared/context'

export default class TaskRepository implements ITaskRepository {
  constructor(private ctx: Context) {}

  async save(task: Task): Promise<void> {
    if (!task.props.participantId || !task.id || !task.props.taskStatus.id)
      throw new Error('不正な値です。')

    await this.ctx.prisma.assignTaskToParticipants.create({
      data: {
        taskId: task.id,
        taskStatusId: task.props.taskStatus.id,
        participantId: task.props.participantId,
        updatedAt: new Date(),
      },
    })
  }

  async getAll(): Promise<Task[]> {
    const taskDatas = await this.ctx.prisma.task.findMany()
    // ステータス名をuniqueにした方が良かったかも？
    const newTaskStatusData = await this.ctx.prisma.taskStatus.findFirst({
      where: {
        name: TASK_STATUS_NAME.NOT_STARTED,
      },
    })
    if (!newTaskStatusData) return []

    return taskDatas.map((data) =>
      Task.recreate(
        {
          title: data.title,
          content: data.content,
          taskStatus: TaskStatus.recreate(
            {
              name: newTaskStatusData.name,
            } as TaskStatusAttribute,
            new Identifier(newTaskStatusData.id),
          ),
        },
        new Identifier(data.id),
      ),
    )
  }
}
