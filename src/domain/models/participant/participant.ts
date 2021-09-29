import { AggregateRoot } from 'src/domain/shared/AggregateRoot'
import { Identifier } from 'src/domain/shared/Identifier'
import EnrollmentStatus from './enrollmentStatus'

interface ParticipantAttributes {
  name: string
  email: string
  enrollmentStatus: EnrollmentStatus
}

// type ParticipantRecreateParams = Omit<
//   ParticipantAttributes,
//   'enrollmentStatus'
// > & { enrollmentStatus: { name: string; id: Identifier } }

export default class Participant extends AggregateRoot<ParticipantAttributes> {
  private constructor(props: ParticipantAttributes, id?: Identifier) {
    super(props, id)
  }

  private static validate(params: {
    name: string
    email: string
  }): void | never {
    if (!params.name) throw new Error('名前が設定されていません。')
    if (!params.email) throw new Error('メールアドレスが設定されていません。')
  }

  public static create(params: { name: string; email: string }): Participant {
    this.validate(params)
    return new Participant({
      ...params,
      enrollmentStatus: EnrollmentStatus.create(),
    })
  }

  public static recreate(
    params: ParticipantAttributes,
    id: Identifier,
  ): Participant {
    this.validate(params)
    return new Participant(params, id)
  }
}
