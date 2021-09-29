import { STATUS_NAME } from 'src/domain/models/participant/enrollmentStatus'

export class ParticipantDTO {
  public readonly id: number
  public readonly name: string
  public readonly email: string
  public readonly _enrollmentStatusName: string
  public constructor(props: {
    id: number
    name: string
    email: string
    enrollmentStatusName: string
  }) {
    const { id, name, email, enrollmentStatusName } = props
    this.id = id
    this.name = name
    this.email = email
    this._enrollmentStatusName = this.enrollmentStatusName(enrollmentStatusName)
  }

  private enrollmentStatusName(name: string): string {
    switch (name) {
      case STATUS_NAME.ACTIVE:
        return '在籍中'
      case STATUS_NAME.INACTIVE:
        return '休会中'
      case STATUS_NAME.WITHDRAWN:
        return '退会済'
      default:
        return '在籍中'
    }
  }
}

export interface IParticipantQS {
  getAll(page?: number): Promise<ParticipantDTO[]>
}
