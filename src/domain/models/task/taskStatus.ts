import { Entity } from '../../../domain/shared/Entity'
import { valueOf } from '../../../utils/utilityTypes'
import TaskStatusId from './taskStatusId'

export const TASK_STATUS_NAME = {
  NOT_STARTED: 'not_started',
  WAITING_FOR_REVIEW: 'waiting_for_review',
  DONE: 'done',
} as const

export interface TaskStatusAttribute {
  name: valueOf<typeof TASK_STATUS_NAME>
}

export default class TaskStatus extends Entity<
  TaskStatusAttribute,
  TaskStatusId
> {
  public static create(params: TaskStatusAttribute): TaskStatus {
    return new TaskStatus({ ...params })
  }

  public static recreate(params: TaskStatusAttribute, id: number): TaskStatus {
    return new TaskStatus({ ...params }, TaskStatusId.create(id))
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

  private constructor(props: TaskStatusAttribute, id?: TaskStatusId) {
    super(props, id)
  }
}
