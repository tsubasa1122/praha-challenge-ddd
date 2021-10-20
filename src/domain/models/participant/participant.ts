import { AggregateRoot } from 'src/domain/shared/AggregateRoot'
import { Identifier } from 'src/domain/shared/Identifier'
import EnrollmentStatus from './enrollmentStatus'
import ParticipantName from './participantName'
import ParticipantEmail from './participantEmail'

interface ParticipantAttributes {
  name: ParticipantName
  email: ParticipantEmail
  enrollmentStatus: EnrollmentStatus
}

// type ParticipantRecreateParams = Omit<
//   ParticipantAttributes,
//   'enrollmentStatus'
// > & { enrollmentStatus: { name: string; id: Identifier } }

export default class Participant extends AggregateRoot<ParticipantAttributes> {
  public static create(params: { name: string; email: string }): Participant {
    this.validate(params)
    return new Participant({
      ...params,
      name: ParticipantName.create({ name: params.name }),
      email: ParticipantEmail.create({ email: params.email }),
      enrollmentStatus: EnrollmentStatus.create(),
    })
  }

  public static recreate(
    params: { name: string; email: string; enrollmentStatus: EnrollmentStatus },
    id: Identifier,
  ): Participant {
    this.validate(params)
    return new Participant(
      {
        ...params,
        name: ParticipantName.create({ name: params.name }),
        email: ParticipantEmail.create({ email: params.email }),
      },
      id,
    )
  }

  private static validate(params: {
    name: string
    email: string
  }): void | never {
    if (!params.email) throw new Error('メールアドレスが設定されていません。')
  }

  private constructor(props: ParticipantAttributes, id?: Identifier) {
    super(props, id)
  }
}
