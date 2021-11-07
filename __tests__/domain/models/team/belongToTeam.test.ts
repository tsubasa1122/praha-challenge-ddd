import PairId from 'src/domain/models/pair/pairId'
import BelongToTeam from 'src/domain/models/team/belongToTeam'

describe('function create()', () => {
  it('BelongToPairインスタンスが生成されること', () => {
    const pairIds = [PairId.create(1), PairId.create(3)]

    expect(BelongToTeam.create(pairIds)).toEqual(
      expect.objectContaining({
        props: {
          pairIdList: [{ value: 1 }, { value: 3 }],
        },
      }),
    )
  })
})
