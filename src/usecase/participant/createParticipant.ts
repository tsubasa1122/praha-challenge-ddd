import { IParticipantRepository } from 'src/domain/models/participant/IParticipantRepository'
import Participant from 'src/domain/models/participant/participant'
import { ITaskRepository } from 'src/domain/models/task/ITaksRepository'
import checkEmailAlreadyExistsService from 'src/domain/services/participant/checkEmailAlreadyExistsService'

// TODO: 複数集約間の整合性を保つためにトランザクションを貼る
export default class CreateParticipant {
  constructor(
    private participantRepository: IParticipantRepository,
    private taskRepository: ITaskRepository,
  ) {}

  // paramsの型は独自に定義する？
  async execute(params: { name: string; email: string }): Promise<void> {
    const participant = Participant.create(params)

    // constructorで渡した方がいいかも？
    await checkEmailAlreadyExistsService.execute(
      participant,
      this.participantRepository,
    )
    await this.participantRepository.save(participant)

    const tasks = await this.taskRepository.getAll()
    tasks.map(async (task) => {
      task.newAssign(participant)
      await this.taskRepository.save(task)
    })
  }
}
