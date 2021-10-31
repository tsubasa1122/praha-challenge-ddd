import { ValueObject } from 'src/domain/shared/ValueObject'

interface TaskContentAttributes {
  content: string
}

export default class TaskContent extends ValueObject<TaskContentAttributes> {
  public static create(params: TaskContentAttributes): TaskContent {
    if (!params.content) throw new Error('内容が設定されていません。')
    return new TaskContent({ content: params.content })
  }
  private constructor(props: TaskContentAttributes) {
    super(props)
  }
}
