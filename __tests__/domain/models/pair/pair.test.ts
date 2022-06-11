import BelongToPair from '../../../../src/domain/models/pair/belongToPair'
import Pair from '../../../../src/domain/models/pair/pair'
import ParticipantId from '../../../../src/domain/models/participant/participantId'

describe('function create()', () => {
  describe('各パラメータの値が設定されているとき', () => {
    it('pairインスタンスが生成されること', () => {
      const pair = {
        name: 'A',
        belongToPair: BelongToPair.create([ParticipantId.create(3)]),
      }

      expect(Pair.create(pair)).toEqual(
        expect.objectContaining({
          _id: undefined,
          props: {
            belongToPair: {
              _id: undefined,
              props: { participantIdList: [{ value: 3 }] },
            },
            name: { props: { name: 'A' } },
          },
        }),
      )
    })
  })
})

describe('function recreate()', () => {
  describe('各パラメータの値が設定されているとき', () => {
    it('pairインスタンスが生成されること', () => {
      const pair = {
        name: 'A',
        belongToPair: BelongToPair.create([ParticipantId.create(3)]),
      }

      expect(Pair.recreate(pair, 1)).toEqual(
        expect.objectContaining({
          _id: { value: 1 },
          props: {
            belongToPair: {
              _id: undefined,
              props: { participantIdList: [{ value: 3 }] },
            },
            name: { props: { name: 'A' } },
          },
        }),
      )
    })
  })
})
