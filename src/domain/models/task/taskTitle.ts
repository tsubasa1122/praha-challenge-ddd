import { ValueObject } from 'src/domain/shared/ValueObject'

interface TaskTitleAttributes {
  title: string
}

export default class TaskTitle extends ValueObject<TaskTitleAttributes> {
  public static create(params: TaskTitleAttributes): TaskTitle {
    if (!params.title) throw new Error('タイトルが設定されていません。')
    return new TaskTitle({ title: params.title })
  }
  private constructor(props: TaskTitleAttributes) {
    super(props)
  }
}
