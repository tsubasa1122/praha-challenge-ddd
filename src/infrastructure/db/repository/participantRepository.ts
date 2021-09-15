import { Context } from '../shared/context'
import { IParticipantRepository } from 'src/domain/models/participant/IParticipantRepository'
import { Participant } from 'src/domain/models/participant/participant'

export default class ParticipantRepository implements IParticipantRepository {
  constructor(private ctx: Context) {}
  // TODO: 更新処理も行えるようにする
  async save(participant: Participant): Promise<void> {
    // Question: participant.props.enrollmentStatus.idがundefinedの場合、どんな挙動する？
    const data = {
      ...participant.props,
      updatedAt: new Date(),
      enrollmentStatus: {
        connect: {
          name: participant.props.enrollmentStatus.props.name,
        },
      },
    }

    await this.ctx.prisma.participant.create({
      data: data,
    })
  }
}
