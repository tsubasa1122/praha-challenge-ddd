import { Identifier } from 'src/domain/shared/Identifier'

export default class ParticipantId extends Identifier {
  public static create(params: number): ParticipantId {
    return new ParticipantId(params)
  }

  private constructor(props: number) {
    super(props)
  }
}
