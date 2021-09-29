import { IParticipantRepository } from 'src/domain/models/participant/IParticipantRepository'
import Participant from 'src/domain/models/participant/participant'
import checkEmailAlreadyExistsService from 'src/domain/services/participant/checkEmailAlreadyExistsService'

export default class CreateParticipant {
  constructor(private participantRepository: IParticipantRepository) {}

  // paramsの型は独自に定義する？
  async execute(params: { name: string; email: string }): Promise<void> {
    const participant = Participant.create(params)
    await checkEmailAlreadyExistsService.execute(
      participant,
      this.participantRepository,
    )
    await this.participantRepository.save(participant)
  }
}
