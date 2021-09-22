import EnrollmentStatus from 'src/domain/models/participant/enrollmentStatus'
import { Identifier } from 'src/domain/shared/Identifier'

describe('function create()', () => {
  it('ステータス名「active」でインスタンスが生成されること', () => {
    expect(EnrollmentStatus.create()).toEqual(
      expect.objectContaining({
        props: {
          name: 'active',
        },
      }),
    )
  })
})

describe('function recreate()', () => {
  it('ステータス名「active」でインスタンスが生成されること', () => {
    const identifier = new Identifier(1)
    expect(EnrollmentStatus.recreate({ name: 'inactive' }, identifier)).toEqual(
      expect.objectContaining({
        props: {
          name: 'inactive',
        },
      }),
    )
  })
})
