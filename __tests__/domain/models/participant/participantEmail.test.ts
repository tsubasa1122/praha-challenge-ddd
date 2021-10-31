import ParticipantEmail from 'src/domain/models/participant/participantEmail'

describe('function create()', () => {
  describe('emailの値が設定されていない時', () => {
    it('例外を投げること', () => {
      const participantEmail = {
        email: '',
      }
      expect(() => ParticipantEmail.create(participantEmail)).toThrow(
        new Error('メールアドレスが設定されていません。'),
      )
    })
  })

  describe('emailの値が不正な値の時', () => {
    it('例外を投げること', () => {
      const participantEmail = {
        email: 'skskks@kskksks',
      }
      expect(() => ParticipantEmail.create(participantEmail)).toThrow(
        new Error('不正なメールアドレスです。'),
      )
    })
  })

  describe('emailの値が正しい値の時', () => {
    it('ParticipantEmailインスタンスが生成されること', () => {
      const participantEmail = {
        email: 'test@example.com',
      }
      expect(ParticipantEmail.create(participantEmail)).toEqual({
        props: { email: 'test@example.com' },
      })
    })
  })
})
