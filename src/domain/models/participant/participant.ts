import { AggregateRoot } from 'src/domain/shared/AggregateRoot'
import { Identifier } from 'src/domain/shared/Identifier'

interface ParticipantAttributes {
  name: string
  email: string
}

export class Participant extends AggregateRoot<ParticipantAttributes> {
  private constructor(props: ParticipantAttributes, id?: Identifier) {
    super(props, id)
  }

  public static create(props: ParticipantAttributes): Participant {
    return new Participant(props)
  }

  public static recreate(
    props: ParticipantAttributes,
    id: Identifier,
  ): Participant {
    return new Participant(props, id)
  }
}
