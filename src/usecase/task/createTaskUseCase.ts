import { IParticipantRepository } from 'src/domain/models/participant/IParticipantRepository'
import { ITaskRepository } from 'src/domain/models/task/ITaksRepository'
import Task from 'src/domain/models/task/task'
import TaskStatus, {
  TaskStatusAttribute,
} from 'src/domain/models/task/taskStatus'

export default class CreateTaskUseCase {
  constructor(
    private participantRepository: IParticipantRepository,
    private taskRepository: ITaskRepository,
  ) {}

  // async execute(params: {
  //   title: string
  //   content: string
  //   taskStatus: { name: string }
  // }): Promise<void> {
  // const taskStatus = TaskStatus.create(name: params.taskStatus.name as TaskStatusAttribute)
  // const taskParams = {
  //   title: params.title,
  //   content: params.content,
  //   taskStatus: taskStatus,
  // }
  // const task = Task.create({ ...taskParams })
  // }
}
