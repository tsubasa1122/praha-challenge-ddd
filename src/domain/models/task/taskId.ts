import { Identifier } from 'src/domain/shared/Identifier'

export default class TaskId extends Identifier {
  public static create(params: number): TaskId {
    return new TaskId(params)
  }
  private constructor(props: number) {
    super(props)
  }
}
