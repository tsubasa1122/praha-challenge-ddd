import { Context } from '../shared/context'
import {
  IParticipantQS,
  ParticipantDTO,
} from 'src/usecase/queryService/IParticipantQS'

export default class ParticipantQS implements IParticipantQS {
  private static MAX_TAKE_COUNT = 10

  constructor(private ctx: Context) {}

  async getAll(page?: number): Promise<ParticipantDTO[]> {
    const skipCount = page ? page * ParticipantQS.MAX_TAKE_COUNT : 0
    const allParticipantDatas = await this.ctx.prisma.participant.findMany({
      include: {
        enrollmentStatus: true,
      },
      orderBy: {
        id: 'desc',
      },
      skip: skipCount,
      take: ParticipantQS.MAX_TAKE_COUNT,
    })

    return allParticipantDatas.map(
      (data) =>
        new ParticipantDTO({
          ...data,
          enrollmentStatusName: data.enrollmentStatus.name,
        }),
    )
  }
}
