import { Pair } from '@prisma/client'
import { AggregateRoot } from 'src/domain/shared/AggregateRoot'
import TeamId from './teamId'
import TeamName from './teamName'

interface TeamAttributes {
  name: TeamName
  pairList: Pair[]
}

export default class Team extends AggregateRoot<TeamAttributes, TeamId> {
  public static create(params: { name: string; pairList: Pair[] }): Team {
    return new Team({
      ...params,
      name: TeamName.create({ name: params.name }),
    })
  }

  public static recreate(
    params: { name: string; pairList: Pair[] },
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
