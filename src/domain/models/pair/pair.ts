import { Entity } from '../../shared/Entity'
import BelongToPair from './belongToPair'
import PairId from './pairId'
import PairName from './pairName'

interface PairAttributes {
  name: PairName
  belongToPair: BelongToPair
}

export default class Pair extends Entity<PairAttributes, PairId> {
  public static create(params: {
    name: string
    belongToPair: BelongToPair
  }): Pair {
    return new Pair({
      ...params,
      name: PairName.create({ name: params.name }),
    })
  }

  public static recreate(
    params: {
      name: string
      belongToPair: BelongToPair
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
