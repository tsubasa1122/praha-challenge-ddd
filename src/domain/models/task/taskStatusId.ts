import { Identifier } from 'src/domain/shared/Identifier'

export default class TaskStatusId extends Identifier {
  public static create(params: number): TaskStatusId {
    return new TaskStatusId(params)
  }
  private constructor(props: number) {
    super(props)
  }
}
