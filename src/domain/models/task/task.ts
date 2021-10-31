import { AggregateRoot } from 'src/domain/shared/AggregateRoot'
import { Identifier } from 'src/domain/shared/Identifier'
import Participant from '../participant/participant'
import TaskContent from './taskContent'
import TaskStatus, { TaskStatusAttribute } from './taskStatus'
import TaskTitle from './taskTitle'

interface TaskAttributes {
  title: TaskTitle
  content: TaskContent
  taskStatus: TaskStatus
  participantId?: number
}

export default class Task extends AggregateRoot<TaskAttributes> {
  public static create(params: {
    title: string
    content: string
    taskStatus: { name: string }
  }): Task {
    return new Task({
      title: TaskTitle.create({ title: params.title }),
      content: TaskContent.create({ content: params.content }),
      taskStatus: TaskStatus.create(params.taskStatus as TaskStatusAttribute),
    })
  }

  public static recreate(
    params: {
      title: string
      content: string
      taskStatus: TaskStatus
    },
    id: Identifier,
  ): Task {
    return new Task(
      {
        ...params,
        title: TaskTitle.create({ title: params.title }),
        content: TaskContent.create({ content: params.content }),
      },
      id,
    )
  }

  public newAssign(participant: Participant): void {
    this.props.taskStatus.assingNewTask()
    this.props.participantId = participant.id
  }

  public changeStatus(statusName: string): void {
    this.props.taskStatus.changeStatus(statusName)
  }

  private constructor(props: TaskAttributes, id?: Identifier) {
    super(props, id)
  }
}
