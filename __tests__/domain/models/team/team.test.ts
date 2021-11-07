import PairId from 'src/domain/models/pair/pairId'
import BelongToTeam from 'src/domain/models/team/belongToTeam'
import Team from 'src/domain/models/team/team'

describe('function create()', () => {
  describe('各パラメータの値が設定されているとき', () => {
    it('teamインスタンスが生成されること', () => {
      const team = {
        name: '1',
        belongToTeam: BelongToTeam.create([PairId.create(3)]),
      }

      expect(Team.create(team)).toEqual(
        expect.objectContaining({
          _id: undefined,
          props: {
            belongToTeam: {
              _id: undefined,
              props: { pairIdList: [{ value: 3 }] },
            },
            name: { props: { name: '1' } },
          },
        }),
      )
    })
  })
})

describe('function recreate()', () => {
  describe('各パラメータの値が設定されているとき', () => {
    it('teamインスタンスが生成されること', () => {
      const team = {
        name: '1',
        belongToTeam: BelongToTeam.create([PairId.create(3)]),
      }

      expect(Team.recreate(team, 1)).toEqual(
        expect.objectContaining({
          _id: { value: 1 },
          props: {
            belongToTeam: {
              _id: undefined,
              props: { pairIdList: [{ value: 3 }] },
            },
            name: { props: { name: '1' } },
          },
        }),
      )
    })
  })
})
