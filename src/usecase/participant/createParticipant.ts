import { IParticipantRepository } from 'src/domain/models/participant/IParticipantRepository'
import { Participant } from 'src/domain/models/participant/participant'

export default class CreateParticipant {
  constructor(private participantRepository: IParticipantRepository) {}

  // paramsの型は独自に定義する？
  async execute(params: { name: string; email: string }): Promise<void> {
    const participant = Participant.create(params)
    await this.participantRepository.save(participant)
  }
}
