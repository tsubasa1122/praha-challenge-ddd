import { AggregateRoot } from 'src/domain/shared/AggregateRoot'
import { Identifier } from 'src/domain/shared/Identifier'
import EnrollmentStatus from './enrollmentStatus'

interface ParticipantAttributes {
  name: string
  email: string
  enrollmentStatus: EnrollmentStatus
}

export class Participant extends AggregateRoot<ParticipantAttributes> {
  private constructor(props: ParticipantAttributes, id?: Identifier) {
    super(props, id)
  }

  private static validate(props: ParticipantAttributes): void | never {
    if (!props.name) throw new Error('名前が設定されていません。')
    if (!props.email) throw new Error('メールアドレスが設定されていません。')
  }

  public static create(props: ParticipantAttributes): Participant {
    this.validate(props)
    return new Participant(props)
  }

  public static recreate(
    props: ParticipantAttributes,
    id: Identifier,
  ): Participant {
    return new Participant(props, id)
  }
}
