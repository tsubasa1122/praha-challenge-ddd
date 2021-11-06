import { ValueObject } from 'src/domain/shared/ValueObject'

interface TeamNameAttributes {
  name: string
}

export default class TeamName extends ValueObject<TeamNameAttributes> {
  private static MAX_LENGTH = 3
  private static INVALID_FORMAT_REGEXP = /\D/
  public static create(params: TeamNameAttributes): TeamName {
    const name = params.name.trim()
    if (!name) throw new Error('チーム名が設定されていません。')
    if (this.MAX_LENGTH <= name.length)
      throw new Error('チーム名は3文字以内でなければいけません。')
    if (this.INVALID_FORMAT_REGEXP.exec(name))
      throw new Error('チーム名は数字でなければいけません。')

    return new TeamName({ name: name })
  }

  private constructor(props: TeamNameAttributes) {
    super(props)
  }
}
