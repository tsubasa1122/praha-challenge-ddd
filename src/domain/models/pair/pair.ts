import { AggregateRoot } from 'src/domain/shared/AggregateRoot'
import { Identifier } from 'src/domain/shared/Identifier'
import PairName from './pairName'

// TODO: idに型を定義する
interface PairAttributes {
  name: PairName
  teamId: number
  participantIdList: number[]
}

export default class Pair extends AggregateRoot<PairAttributes> {
  public static create(params: {
    name: string
    teamId: number
    participantIdList: number[]
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
      participantIdList: number[]
    },
    id: Identifier,
  ): Pair {
    return new Pair(
      {
        ...params,
        name: PairName.create({ name: params.name }),
      },
      id,
    )
  }

  private constructor(props: PairAttributes, id?: Identifier) {
    super(props, id)
  }
}
