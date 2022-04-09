import { IParticipantRepository } from '../../domain/models/participant/IParticipantRepository'

export default class UpdateParticipantUseCase {
  constructor(private participantRepository: IParticipantRepository) {}

  async execute(params: {
    participantId: number
    name: string
    email: string
    statusName: string
  }) {
    // コントローラーでチェックした方がいい？
    const participant = await this.participantRepository.findById(
      params.participantId,
    )
    if (!participant) throw new Error('参加者が見つかりません。')
    const participantParams = {
      name: params.name,
      email: params.email,
      statusName: params.statusName,
    }
    participant.changeAttributes(participantParams)
    await this.participantRepository.update(participant)
  }
}
