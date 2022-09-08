import { Entity } from '../../../domain/shared/Entity'
import { valueOf } from '../../../utils/utilityTypes'
import EnrollmentStatusId from './enrollmentStatusId'

export const ENROLLMENT_STATUS_NAME = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  WITHDRAWN: 'withdrawn',
} as const

// MEMO: attributeが増えたら各プロパティをvalue objectに変えても良さそう
export interface EnrollmentStatusAttribute {
  name: valueOf<typeof ENROLLMENT_STATUS_NAME>
}

// インスタンス参照にするとidを持たせないといけなくなるので、ValueObjectにしても良いかも？
export default class EnrollmentStatus extends Entity<
  EnrollmentStatusAttribute,
  EnrollmentStatusId
> {
  // createは命名微妙？
  public static create(): EnrollmentStatus {
    const name = ENROLLMENT_STATUS_NAME.ACTIVE
    return new EnrollmentStatus({ name })
  }

  public static recreate(
    params: EnrollmentStatusAttribute,
    id: number,
  ): EnrollmentStatus {
    return new EnrollmentStatus({ ...params }, EnrollmentStatusId.create(id))
  }

  public changeStatus(statusName: string): void {
    this.validateStatusName(statusName)

    this.props.name = statusName as EnrollmentStatusAttribute['name']
  }

  private validateStatusName(statusName: string): void | never {
    if (
      Object.values(ENROLLMENT_STATUS_NAME).includes(
        statusName as EnrollmentStatusAttribute['name'],
      )
    )
      return

    throw new Error('不正なステータスです。')
  }

  private constructor(
    props: EnrollmentStatusAttribute,
    id?: EnrollmentStatusId,
  ) {
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
