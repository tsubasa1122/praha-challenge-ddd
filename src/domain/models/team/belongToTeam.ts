import { Entity } from 'src/domain/shared/Entity'
import PairId from '../pair/pairId'
import TeamId from './teamId'

interface BelongToTeamAttributes {
  pairIdList: PairId[]
}

// TeamIdではなく、中間テーブルのPKを渡した方がいい？
export default class BelongToTeam extends Entity<
  BelongToTeamAttributes,
  TeamId
> {
  public static create(params: PairId[]): BelongToTeam {
    return new BelongToTeam({ pairIdList: params })
  }

  private constructor(props: BelongToTeamAttributes, id?: TeamId) {
    super(props, id)
  }
}
