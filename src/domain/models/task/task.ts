import { AggregateRoot } from 'src/domain/shared/AggregateRoot'
import { Identifier } from 'src/domain/shared/Identifier'
import Participant from '../participant/participant'
import TaskStatus from './taskStatus'

interface TaskAttributes {
  title: string
  content: string
  taskStatus: TaskStatus
  participantId?: number
}

export default class Task extends AggregateRoot<TaskAttributes> {
  public static recreate(params: TaskAttributes, id: Identifier): Task {
    return new Task(params, id)
  }

  newAssign(participant: Participant): void {
    this.props.taskStatus.assingNewTask()
    this.props.participantId = participant.id
  }

  private constructor(props: TaskAttributes, id: Identifier) {
    super(props, id)
  }
}
