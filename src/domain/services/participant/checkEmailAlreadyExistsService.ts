import { IParticipantRepository } from '../../../domain/models/participant/IParticipantRepository'
import Participant from '../../../domain/models/participant/participant'

export default class checkEmailAlreadyExistsService {
  public static async execute(
    participant: Participant,
    participantRepository: IParticipantRepository,
  ): Promise<false | never> {
    const service = new checkEmailAlreadyExistsService(
      participant,
      participantRepository,
    )

    const data = await service.participantRepository.findByEmail(
      service.participant,
    )

    if (data) {
      throw new Error('参加者は既に登録されています。')
    } else {
      return false
    }
  }

  private constructor(
    private participant: Participant,
    private participantRepository: IParticipantRepository,
  ) {}
}
