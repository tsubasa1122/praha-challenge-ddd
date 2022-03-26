import { AggregateRoot } from '../../../domain/shared/AggregateRoot'
import ParticipantId from '../participant/participantId'
import PairId from './pairId'
import PairName from './pairName'

interface PairAttributes {
  name: PairName
  teamId: number
  participantIdList: ParticipantId[]
}

export default class Pair extends AggregateRoot<PairAttributes, PairId> {
  public static create(params: {
    name: string
    teamId: number
    participantIdList: ParticipantId[]
  }): Pair {
    return new Pair({
      ...params,
      name: PairName.create({ name: params.name }),
    })
  }

  public static recreate(
    params: {
      name: string
      teamId: number
      participantIdList: ParticipantId[]
    },
    id: number,
  ): Pair {
    return new Pair(
      {
        ...params,
        name: PairName.create({ name: params.name }),
      },
      PairId.create(id),
    )
  }

  private constructor(props: PairAttributes, id?: PairId) {
    super(props, id)
  }
}
