import ParticipantName from 'src/domain/models/participant/participantName'

describe('function create()', () => {
  describe('nameの値が設定されていない時', () => {
    it('例外を投げること', () => {
      const participantName = {
        name: '',
      }

      expect(() => ParticipantName.create(participantName)).toThrow(
        new Error('名前が設定されていません。'),
      )
    })
  })

  describe('nameの値が設定されている時', () => {
    it('ParticipantNameインスタンスが生成されること', () => {
      const participantName = {
        name: '参加者A',
      }

      expect(ParticipantName.create(participantName)).toEqual(
        expect.objectContaining({
          props: { name: '参加者A' },
        }),
      )
    })
  })
})
