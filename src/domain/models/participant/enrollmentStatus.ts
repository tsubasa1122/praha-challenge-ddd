import { Entity } from 'src/domain/shared/Entity'
import { Identifier } from 'src/domain/shared/Identifier'

// TODO: 型のutils系に移動させる
type valueOf<T> = T[keyof T]

const STATUS_NAME = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  WITHDRAWN: 'withdrawn',
} as const

interface EnrollmentStatusAttribute {
  name: valueOf<typeof STATUS_NAME>
}

export default class EnrollmentStatus extends Entity<EnrollmentStatusAttribute> {
  // createは命名微妙？
  public static create(): EnrollmentStatus {
    const name = STATUS_NAME.ACTIVE
    const id = this.setEnrollmentId(name)
    return new EnrollmentStatus({ name }, new Identifier(id))
  }

  private constructor(props: EnrollmentStatusAttribute, id?: Identifier) {
    super(props, id)
  }

  private static setEnrollmentId(name: valueOf<typeof STATUS_NAME>): number {
    switch (name) {
      case STATUS_NAME.ACTIVE:
        return 1
      case STATUS_NAME.INACTIVE:
        return 2
      case STATUS_NAME.WITHDRAWN:
        return 3
      default:
        return 1
    }
  }
}
