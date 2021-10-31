import { Entity } from 'src/domain/shared/Entity'
import { Identifier } from 'src/domain/shared/Identifier'
import { valueOf } from 'src/utils/utilityTypes'

export const TASK_STATUS_NAME = {
  NOT_STARTED: 'not_started',
  WAITING_FOR_REVIEW: 'waiting_for_review',
  DONE: 'done',
} as const

export interface TaskStatusAttribute {
  name: valueOf<typeof TASK_STATUS_NAME>
}

export default class TaskStatus extends Entity<TaskStatusAttribute> {
  public static create(params: TaskStatusAttribute): TaskStatus {
    return new TaskStatus({ ...params })
  }

  public static recreate(
    params: TaskStatusAttribute,
    id: Identifier,
  ): TaskStatus {
    return new TaskStatus({ ...params }, id)
  }

  public assingNewTask(): void {
    this.props.name = TASK_STATUS_NAME.NOT_STARTED
  }

  public changeStatus(statusName: string): void {
    if (this.props.name === TASK_STATUS_NAME.DONE)
      throw new Error('完了済みのステータスは変更出来ません。')

    this.validateStatusName(statusName)

    this.props.name = statusName as TaskStatusAttribute['name']
  }

  private validateStatusName(statusName: string): void | never {
    if (
      Object.values(TASK_STATUS_NAME).includes(
        statusName as TaskStatusAttribute['name'],
      )
    )
      return

    throw new Error('不正なステータスです。')
  }

  private constructor(props: TaskStatusAttribute, id?: Identifier) {
    super(props, id)
  }
}
