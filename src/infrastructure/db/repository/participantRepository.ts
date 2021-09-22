import { Context } from '../shared/context'
import { IParticipantRepository } from 'src/domain/models/participant/IParticipantRepository'
import Participant from 'src/domain/models/participant/participant'
import { Participant as PrismaParticipant } from 'node_modules/.prisma/client'

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

  //  重複チェック用の独自メソッドにする？
  async findByEmail(
    participant: Participant,
  ): Promise<PrismaParticipant | null> {
    // findUniqueはv 2.12.0以降はfindOneにreplaceされたと書かれているが保管されない...
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#model-queries
    const data = await this.ctx.prisma.participant.findUnique({
      where: { email: participant.props.email },
    })

    return data
  }
}
