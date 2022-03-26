import { AggregateRoot } from '../../../domain/shared/AggregateRoot'
import EnrollmentStatus from './enrollmentStatus'
import ParticipantName from './participantName'
import ParticipantEmail from './participantEmail'
import ParticipantId from './participantId'

interface ParticipantAttributes {
  name: ParticipantName
  email: ParticipantEmail
  enrollmentStatus: EnrollmentStatus
}

// type ParticipantRecreateParams = Omit<
//   ParticipantAttributes,
//   'enrollmentStatus'
// > & { enrollmentStatus: { name: string; id: Identifier } }

export default class Participant extends AggregateRoot<
  ParticipantAttributes,
  ParticipantId
> {
  public static create(params: { name: string; email: string }): Participant {
    return new Participant({
      ...params,
      name: ParticipantName.create({ name: params.name }),
      email: ParticipantEmail.create({ email: params.email }),
      enrollmentStatus: EnrollmentStatus.create(),
    })
  }

  public static recreate(
    params: { name: string; email: string; enrollmentStatus: EnrollmentStatus },
    id: number,
  ): Participant {
    return new Participant(
      {
        ...params,
        name: ParticipantName.create({ name: params.name }),
        email: ParticipantEmail.create({ email: params.email }),
      },
      ParticipantId.create(id),
    )
  }

  private constructor(props: ParticipantAttributes, id?: ParticipantId) {
    super(props, id)
  }
}
