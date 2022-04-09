import PairName from 'src/domain/models/pair/pairName'

describe('function create()', () => {
  describe('nameの値が設定されていない時', () => {
    it('例外を投げること', () => {
      const pairName = {
        name: '',
      }

      expect(() => PairName.create(pairName)).toThrow(
        new Error('ペア名が設定されていません。'),
      )
    })
  })

  describe('ペア名が一文字以上の時', () => {
    it('例外を投げること', () => {
      const pairName = {
        name: 'ab',
      }

      expect(() => PairName.create(pairName)).toThrow(
        new Error('ペア名は一文字でなければいけません。'),
      )
    })
  })

  describe('ペア名が半角英数字以外の時', () => {
    it('例外を投げること', () => {
      const pairName1 = {
        name: 'あ',
      }
      const pairName2 = {
        name: '$',
      }

      expect(() => PairName.create(pairName1)).toThrow(
        new Error('ペア名は半角英数字でなければいけません。'),
      )
      expect(() => PairName.create(pairName2)).toThrow(
        new Error('ペア名は半角英数字でなければいけません。'),
      )
    })
  })

  describe('ペア名が正しい値の時', () => {
    it('PairNameインスタンスを生成すること', () => {
      const pairName1 = {
        name: 'a',
      }
      const pairName2 = {
        name: 'A',
      }
      const pairName3 = {
        name: '1',
      }
      const pairName4 = {
        name: ' a　',
      }

      expect(PairName.create(pairName1)).toEqual(
        expect.objectContaining({
          props: { name: 'a' },
        }),
      )
      expect(PairName.create(pairName2)).toEqual(
        expect.objectContaining({
          props: { name: 'A' },
        }),
      )
      expect(PairName.create(pairName3)).toEqual(
        expect.objectContaining({
          props: { name: '1' },
        }),
      )
      expect(PairName.create(pairName4)).toEqual(
        expect.objectContaining({
          props: { name: 'a' },
        }),
      )
    })
  })
})
