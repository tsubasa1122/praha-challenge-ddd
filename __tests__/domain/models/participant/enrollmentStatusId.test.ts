import EnrollmentStatusId from 'src/domain/models/participant/enrollmentStatusId'

describe('function create()', () => {
  describe('idが設定されている時', () => {
    it('EnrollmentStatusIdインスタンスが生成されること', () => {
      const enrollmentStatusId = 2
      expect(EnrollmentStatusId.create(enrollmentStatusId)).toEqual(
        expect.objectContaining({ value: 2 }),
      )
    })
  })
})
