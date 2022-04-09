import BelongToPair from 'src/domain/models/pair/belongToPair'
import ParticipantId from 'src/domain/models/participant/participantId'

describe('function create()', () => {
  it('BelongToPairインスタンスが生成されること', () => {
    const participantIds = [ParticipantId.create(1), ParticipantId.create(3)]

    expect(BelongToPair.create(participantIds)).toEqual(
      expect.objectContaining({
        props: {
          participantIdList: [{ value: 1 }, { value: 3 }],
        },
      }),
    )
  })
})
