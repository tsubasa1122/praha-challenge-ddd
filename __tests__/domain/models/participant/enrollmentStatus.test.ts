import EnrollmentStatus, {
  ENROLLMENT_STATUS_NAME,
} from 'src/domain/models/participant/enrollmentStatus'

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
    expect(
      EnrollmentStatus.recreate({ name: ENROLLMENT_STATUS_NAME.INACTIVE }, 1),
    ).toEqual(
      expect.objectContaining({
        props: {
          name: ENROLLMENT_STATUS_NAME.INACTIVE,
        },
      }),
    )
  })
})
