import { AggregateRoot } from 'src/domain/shared/AggregateRoot'

interface TaskContentAttributes {
  content: string
}

export default class TaskContent extends AggregateRoot<TaskContentAttributes> {
  public static create(params: TaskContentAttributes): TaskContent {
    if (!params.content) throw new Error('titleが設定されていません。')
    return new TaskContent({ content: params.content })
  }
  private constructor(props: TaskContentAttributes) {
    super(props)
  }
}
