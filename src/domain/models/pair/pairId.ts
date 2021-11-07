import { Identifier } from '../../..//domain/shared/Identifier'

export default class PairId extends Identifier {
  public static create(params: number): PairId {
    return new PairId(params)
  }
  private constructor(props: number) {
    super(props)
  }
}
