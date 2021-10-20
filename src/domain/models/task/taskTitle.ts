import { AggregateRoot } from 'src/domain/shared/AggregateRoot'

interface TaskTitleAttributes {
  title: string
}

export default class TaskTitle extends AggregateRoot<TaskTitleAttributes> {
  public static create(params: TaskTitleAttributes): TaskTitle {
    if (!params.title) throw new Error('titleが設定されていません。')
    return new TaskTitle({ title: params.title })
  }
  private constructor(props: TaskTitleAttributes) {
    super(props)
  }
}
