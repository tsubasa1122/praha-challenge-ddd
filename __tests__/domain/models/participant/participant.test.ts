import Participant from 'src/domain/models/participant/participant'
import EnrollmentStatus, {
  ENROLLMENT_STATUS_NAME,
} from 'src/domain/models/participant/enrollmentStatus'
import { Identifier } from 'src/domain/shared/Identifier'

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
      const identifier = new Identifier(1)
      const participant = {
        name: 'テスト名',
        email: 'test@example.com',
        enrollmentStatus: EnrollmentStatus.recreate(
          { name: ENROLLMENT_STATUS_NAME.INACTIVE },
          identifier,
        ),
      }
      expect(Participant.recreate(participant, identifier)).toEqual(
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
