import EnrollmentStatus, {
  ENROLLMENT_STATUS_NAME,
} from '../../../../src/domain/models/participant/enrollmentStatus'
import Participant from '../../../../src/domain/models/participant/participant'

describe('function create()', () => {
  describe('各パラメータの値が設定されているとき', () => {
    it('participantインスタンスが生成されること', () => {
      const participant = {
        name: 'テスト名',
        email: 'test@example.com',
      }
      expect(Participant.create(participant)).toEqual(
        expect.objectContaining({
          _id: undefined,
          props: {
            email: { props: { email: 'test@example.com' } },
            enrollmentStatus: { _id: undefined, props: { name: 'active' } },
            name: { props: { name: 'テスト名' } },
          },
        }),
      )
    })
  })
})

describe('function recreate()', () => {
  describe('各パラメータの値が設定されているとき', () => {
    it('participantインスタンスが生成されること', () => {
      const participant = {
        name: 'テスト名',
        email: 'test@example.com',
        enrollmentStatus: EnrollmentStatus.recreate(
          { name: ENROLLMENT_STATUS_NAME.INACTIVE },
          1,
        ),
      }
      expect(Participant.recreate(participant, 1)).toEqual(
        expect.objectContaining({
          _id: { value: 1 },
          props: {
            email: { props: { email: 'test@example.com' } },
            enrollmentStatus: {
              _id: { value: 1 },
              props: { name: 'inactive' },
            },
            name: { props: { name: 'テスト名' } },
          },
        }),
      )
    })
  })
})
