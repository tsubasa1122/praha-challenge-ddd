import { Identifier } from '../../shared/Identifier'

export default class TeamId extends Identifier {
  public static create(params: number): TeamId {
    return new TeamId(params)
  }

  private constructor(props: number) {
    super(props)
  }
}
