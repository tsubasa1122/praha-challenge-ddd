import Participant from 'src/domain/models/participant/participant'
import EnrollmentStatus, {
  STATUS_NAME,
} from 'src/domain/models/participant/enrollmentStatus'
import { Identifier } from 'src/domain/shared/Identifier'

describe('function create()', () => {
  describe('emailの値が設定されていないとき', () => {
    it('例外を投げること', () => {
      const participant = {
        name: 'テスト名',
        email: '',
      }
      expect(() => Participant.create(participant)).toThrow(
        new Error('メールアドレスが設定されていません。'),
      )
    })
  })
  describe('nameの値が設定されていないとき', () => {
    it('例外を投げること', () => {
      const participant = {
        name: '',
        email: 'test@example.com',
      }

      expect(() => Participant.create(participant)).toThrow(
        new Error('名前が設定されていません。'),
      )
    })
  })
  describe('各パラメータの値が設定されているとき', () => {
    it('participantインスタンスが生成されること', () => {
      const participant = {
        name: 'テスト名',
        email: 'test@example.com',
      }
      expect(Participant.create(participant)).toEqual(
        expect.objectContaining({
          props: {
            name: 'テスト名',
            email: 'test@example.com',
            enrollmentStatus: EnrollmentStatus.create(),
          },
        }),
      )
    })
  })
})

describe('function recreate()', () => {
  describe('emailの値が設定されていないとき', () => {
    it('例外を投げること', () => {
      const identifier = new Identifier(1)
      const participant = {
        name: 'テスト名',
        email: '',
        enrollmentStatus: EnrollmentStatus.recreate(
          { name: 'active' },
          identifier,
        ),
      }

      expect(() => Participant.recreate(participant, identifier)).toThrow(
        new Error('メールアドレスが設定されていません。'),
      )
    })
  })
  describe('nameの値が設定されていないとき', () => {
    it('例外を投げること', () => {
      const identifier = new Identifier(1)
      const participant = {
        name: '',
        email: 'test@example.com',
        enrollmentStatus: EnrollmentStatus.recreate(
          { name: 'active' },
          identifier,
        ),
      }

      expect(() => Participant.recreate(participant, identifier)).toThrow(
        new Error('名前が設定されていません。'),
      )
    })
  })
  describe('各パラメータの値が設定されているとき', () => {
    it('participantインスタンスが生成されること', () => {
      const identifier = new Identifier(1)
      const participant = {
        name: 'テスト名',
        email: 'test@example.com',
        enrollmentStatus: EnrollmentStatus.recreate(
          { name: 'inactive' },
          identifier,
        ),
      }
      expect(Participant.recreate(participant, identifier)).toEqual(
        expect.objectContaining({
          _id: { value: 1 },
          props: {
            name: 'テスト名',
            email: 'test@example.com',
            enrollmentStatus: {
              _id: { value: 1 },
              props: { name: 'inactive' },
            },
          },
        }),
      )
    })
  })
})
