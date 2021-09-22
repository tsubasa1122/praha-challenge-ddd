import { IParticipantRepository } from 'src/domain/models/participant/IParticipantRepository'
import Participant from 'src/domain/models/participant/participant'

export default class checkEmailAlreadyExistsService {
  public static async execute(
    participant: Participant,
    participantRepository: IParticipantRepository,
  ): Promise<false | never> {
    const data = await participantRepository.findByEmail(participant)
    if (data) {
      throw new Error('参加者は既に登録されています。')
    } else {
      return false
    }
  }
}
