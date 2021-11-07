import PairId from 'src/domain/models/pair/pairId'

describe('function create()', () => {
  describe('idが設定されている時', () => {
    it('pairIdインスタンスが生成されること', () => {
      const pairId = 2
      expect(PairId.create(pairId)).toEqual(
        expect.objectContaining({ value: 2 }),
      )
    })
  })
})
