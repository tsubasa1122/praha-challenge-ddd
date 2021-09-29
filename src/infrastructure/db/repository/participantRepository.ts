import { Context } from '../shared/context'
import { IParticipantRepository } from 'src/domain/models/participant/IParticipantRepository'
import Participant from 'src/domain/models/participant/participant'
import EnrollmentStatus, {
  EnrollmentStatusAttribute,
} from 'src/domain/models/participant/enrollmentStatus'
import { Identifier } from 'src/domain/shared/Identifier'

export default class ParticipantRepository implements IParticipantRepository {
  constructor(private ctx: Context) {}
  // TODO: 更新処理も行えるようにする
  // TOOD: insertやupdateなどのメソッドに命名を変更する
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
  async findByEmail(participant: Participant): Promise<Participant | null> {
    // findUniqueはv 2.12.0以降はfindOneにreplaceされたと書かれているが保管されない...
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#model-queries
    const data = await this.ctx.prisma.participant.findUnique({
      where: { email: participant.props.email },
      include: {
        enrollmentStatus: true,
      },
    })
    if (!data) return null

    const enrollmentStatusInstance = EnrollmentStatus.recreate(
      { name: data.enrollmentStatus.name } as EnrollmentStatusAttribute,
      new Identifier(data.enrollmentStatusId),
    )

    const participantParams = {
      name: data.name,
      email: data.email,
      enrollmentStatus: enrollmentStatusInstance,
    }
    return Participant.recreate(participantParams, new Identifier(data.id))
  }

  // 例外発生するメソッドの命名規則を作る
  // idがNaNの場合どうなるのか調べる
  async findById(id: number): Promise<Participant | null> {
    const data = await this.ctx.prisma.participant.findUnique({
      where: { id },
      include: {
        enrollmentStatus: true,
      },
    })

    if (!data) return null

    const enrollmentStatusInstance = EnrollmentStatus.recreate(
      { name: data.enrollmentStatus.name } as EnrollmentStatusAttribute,
      new Identifier(data.enrollmentStatusId),
    )

    const participantParams = {
      name: data.name,
      email: data.email,
      enrollmentStatus: enrollmentStatusInstance,
    }
    return Participant.recreate(participantParams, new Identifier(data.id))
  }
}
