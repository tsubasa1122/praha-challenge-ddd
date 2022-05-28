import { AggregateRoot } from '../../shared/AggregateRoot'
import BelongToTeam from './belongToTeam'
import TeamId from './teamId'
import TeamName from './teamName'

interface TeamAttributes {
  name: TeamName
  belongToTeam: BelongToTeam
}

export default class Team extends AggregateRoot<TeamAttributes, TeamId> {
  public static create(params: {
    name: string
    belongToTeam: BelongToTeam
  }): Team {
    return new Team({
      ...params,
      name: TeamName.create({ name: params.name }),
    })
  }

  public static recreate(
    params: { name: string; belongToTeam: BelongToTeam },
    id: number,
  ): Team {
    return new Team(
      {
        ...params,
        name: TeamName.create({ name: params.name }),
      },
      TeamId.create(id),
    )
  }

  private constructor(props: TeamAttributes, id?: TeamId) {
    super(props, id)
  }
}
