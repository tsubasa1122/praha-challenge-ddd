import { IParticipantRepository } from 'src/domain/models/participant/IParticipantRepository'
import { ITaskRepository } from 'src/domain/models/task/ITaksRepository'
import Task from 'src/domain/models/task/task'

export default class CreateTaskUseCase {
  constructor(
    private participantRepository: IParticipantRepository,
    private taskRepository: ITaskRepository,
  ) {}

  async execute(params: {
    title: string
    content: string
    taskStatus: { name: string }
  }): Promise<void> {
    const task = Task.create(params)
    const participants = await this.participantRepository.getAll()

    participants.map(async (participant) => {
      task.newAssign(participant)
      await this.taskRepository.save(task)
    })
  }
}
