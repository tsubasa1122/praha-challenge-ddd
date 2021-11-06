import { AggregateRoot } from 'src/domain/shared/AggregateRoot'
import Participant from '../participant/participant'
import TaskContent from './taskContent'
import TaskId from './taskId'
import TaskStatus, { TaskStatusAttribute } from './taskStatus'
import TaskTitle from './taskTitle'

interface TaskAttributes {
  title: TaskTitle
  content: TaskContent
  taskStatus: TaskStatus
  participantId?: number
}

export default class Task extends AggregateRoot<TaskAttributes, TaskId> {
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
    id: number,
  ): Task {
    return new Task(
      {
        ...params,
        title: TaskTitle.create({ title: params.title }),
        content: TaskContent.create({ content: params.content }),
      },
      TaskId.create(id),
    )
  }

  public newAssign(participant: Participant): void {
    this.props.taskStatus.assingNewTask()
    this.props.participantId = participant.id
  }

  public changeStatus(statusName: string): void {
    this.props.taskStatus.changeStatus(statusName)
  }

  private constructor(props: TaskAttributes, id?: TaskId) {
    super(props, id)
  }
}
