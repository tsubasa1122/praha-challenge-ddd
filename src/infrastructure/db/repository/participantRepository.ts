import { Context } from '../shared/context'
import { IParticipantRepository } from '../../../domain/models/participant/IParticipantRepository'
import Participant from '../../../domain/models/participant/participant'
import EnrollmentStatus, {
  EnrollmentStatusAttribute,
} from '../../../domain/models/participant/enrollmentStatus'

export default class ParticipantRepository implements IParticipantRepository {
  constructor(private ctx: Context) {}
  // TODO: 更新処理も行えるようにする
  // TOOD: insertやupdateなどのメソッドに命名を変更する
  async save(participant: Participant): Promise<void> {
    // Question: participant.props.enrollmentStatus.idがundefinedの場合、どんな挙動する？

    // TODO: findUniqを使用するために、name属性にはuniq制約を追加する
    const enrollmentStatus = await this.ctx.prisma.enrollmentStatus.findFirst({
      where: {
        name: participant.props.enrollmentStatus.props.name,
      },
    })

    if (!enrollmentStatus) return

    const data = {
      name: participant.props.name.props.name,
      email: participant.props.email.props.email,
      enrollmentStatusId: enrollmentStatus.id,
      updatedAt: new Date(),
    }

    await this.ctx.prisma.participant.create({
      data: data,
    })
  }

  async update(participant: Participant): Promise<void> {
    const data = {
      name: participant.props.name.props.name,
      email: participant.props.email.props.email,
      updatedAt: new Date(),
    }

    await this.ctx.prisma.participant.update({
      where: {
        id: participant.id,
      },
      data: data,
    })
  }

  //  重複チェック用の独自メソッドにする？
  async findByEmail(participant: Participant): Promise<Participant | null> {
    // findUniqueはv 2.12.0以降はfindOneにreplaceされたと書かれているが保管されない...
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#model-queries
    const data = await this.ctx.prisma.participant.findUnique({
      where: { email: participant.props.email.props.email },
      include: {
        enrollmentStatus: true,
      },
    })
    if (!data) return null

    const enrollmentStatus = EnrollmentStatus.recreate(
      { name: data.enrollmentStatus.name } as EnrollmentStatusAttribute,
      data.enrollmentStatusId,
    )

    const participantParams = {
      name: data.name,
      email: data.email,
      enrollmentStatus: enrollmentStatus,
    }
    return Participant.recreate(participantParams, data.id)
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
      data.enrollmentStatusId,
    )

    const participantParams = {
      name: data.name,
      email: data.email,
      enrollmentStatus: enrollmentStatusInstance,
    }
    return Participant.recreate(participantParams, data.id)
  }

  async getAll(): Promise<Participant[]> {
    const participantDatas = await this.ctx.prisma.participant.findMany({
      include: {
        enrollmentStatus: true,
      },
    })
    if (!participantDatas) return []

    return participantDatas.map((data) => {
      const enrollmentStatus = EnrollmentStatus.recreate(
        { name: data.enrollmentStatus.name } as EnrollmentStatusAttribute,
        data.enrollmentStatus.id,
      )

      const participantParams = {
        name: data.name,
        email: data.email,
        enrollmentStatus: enrollmentStatus,
      }

      return Participant.recreate(participantParams, data.id)
    })
  }
}
