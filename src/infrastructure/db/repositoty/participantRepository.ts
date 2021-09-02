import { PrismaClient } from '@prisma/client'
import { IParticipantRepository } from 'src/domain/models/participant/IParticipantRepository'
import { Participant } from 'src/domain/models/participant/participant'

export default class ParticipantRepository implements IParticipantRepository {
  constructor(private prismaClient: PrismaClient) {}
  // TODO: 更新処理も行えるようにする
  async save(participant: Participant): Promise<void> {
    // Question: participant.props.enrollmentStatus.idがundefinedの場合、どんな挙動する？
    const data = {
      ...participant.props,
      updatedAt: new Date(),
      enrollmentStatus: {
        connect: {
          id: participant.props.enrollmentStatus.id,
        },
      },
    }

    await this.prismaClient.participant.create({
      data: data,
    })
  }
}
