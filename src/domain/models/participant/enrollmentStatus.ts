import { Entity } from 'src/domain/shared/Entity'
import { Identifier } from 'src/domain/shared/Identifier'
import { valueOf } from 'src/utils/utilityTypes'

// TODO: namespaceを定義する
export const ENROLLMENT_STATUS_NAME = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  WITHDRAWN: 'withdrawn',
} as const

export interface EnrollmentStatusAttribute {
  name: valueOf<typeof ENROLLMENT_STATUS_NAME>
}

// インスタンス参照にするとidを持たせないといけなくなるので、ValueObjectにしても良いかも？
export default class EnrollmentStatus extends Entity<EnrollmentStatusAttribute> {
  // createは命名微妙？
  public static create(): EnrollmentStatus {
    const name = ENROLLMENT_STATUS_NAME.ACTIVE
    return new EnrollmentStatus({ name })
  }

  public static recreate(
    params: EnrollmentStatusAttribute,
    id: Identifier,
  ): EnrollmentStatus {
    return new EnrollmentStatus({ ...params }, id)
  }

  private constructor(props: EnrollmentStatusAttribute, id?: Identifier) {
    super(props, id)
  }

  // PKに役割を持たせたくなかったので、nameでstatusを検索するようにした
  // private static setEnrollmentId(name: valueOf<typeof STATUS_NAME>): number {
  //   switch (name) {
  //     case STATUS_NAME.ACTIVE:
  //       return 1
  //     case STATUS_NAME.INACTIVE:
  //       return 2
  //     case STATUS_NAME.WITHDRAWN:
  //       return 3
  //     default:
  //       return 1
  //   }
  // }
}
