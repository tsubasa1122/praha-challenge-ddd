import { Identifier } from 'src/domain/shared/Identifier'

export default class EnrollmentStatusId extends Identifier {
  public static create(params: number): EnrollmentStatusId {
    return new EnrollmentStatusId(params)
  }

  private constructor(props: number) {
    super(props)
  }
}
