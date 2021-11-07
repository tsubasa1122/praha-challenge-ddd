import { Entity } from 'src/domain/shared/Entity'
import ParticipantId from '../participant/participantId'
import PairId from './pairId'

interface BelongToPairAttributes {
  participantIdList: ParticipantId[]
}

// PairIdではなく、中間テーブルのPKを渡した方がいい？
export default class BelongToPair extends Entity<
  BelongToPairAttributes,
  PairId
> {
  public static create(params: ParticipantId[]): BelongToPair {
    return new BelongToPair({ participantIdList: params })
  }

  private constructor(props: BelongToPairAttributes, id?: PairId) {
    super(props, id)
  }
}
