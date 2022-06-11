import ParticipantId from '../../../../src/domain/models/participant/participantId'

describe('function create()', () => {
  describe('idが設定されている時', () => {
    it('ParticipantIdインスタンスが生成されること', () => {
      const participantId = 2
      expect(ParticipantId.create(participantId)).toEqual(
        expect.objectContaining({ value: 2 }),
      )
    })
  })
})
