import { ValueObject } from 'src/domain/shared/ValueObject'

interface ParticipantNameAttributes {
  name: string
}

export default class ParticipantName extends ValueObject<ParticipantNameAttributes> {
  public static create(params: ParticipantNameAttributes): ParticipantName {
    if (!params.name) throw new Error('名前が設定されていません。')
    return new ParticipantName(params)
  }
  private constructor(props: ParticipantNameAttributes) {
    super(props)
  }
}
