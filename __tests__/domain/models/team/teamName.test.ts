import TeamName from 'src/domain/models/team/teamName'

describe('function create()', () => {
  describe('nameの値が設定されていない時', () => {
    it('例外を投げること', () => {
      const teamName = {
        name: '',
      }

      expect(() => TeamName.create(teamName)).toThrow(
        new Error('チーム名が設定されていません。'),
      )
    })
  })

  describe('チーム名が４文字以上の時', () => {
    it('例外を投げること', () => {
      const teamName = {
        name: '1111',
      }

      expect(() => TeamName.create(teamName)).toThrow(
        new Error('チーム名は3文字以内でなければいけません。'),
      )
    })
  })

  describe('ペア名が数字以外の時', () => {
    it('例外を投げること', () => {
      const teamName1 = {
        name: 'aaa',
      }
      const teamName2 = {
        name: '$%',
      }
      const teamName3 = {
        name: 'ああ',
      }

      expect(() => TeamName.create(teamName1)).toThrow(
        new Error('チーム名は数字でなければいけません。'),
      )
      expect(() => TeamName.create(teamName2)).toThrow(
        new Error('チーム名は数字でなければいけません。'),
      )
      expect(() => TeamName.create(teamName3)).toThrow(
        new Error('チーム名は数字でなければいけません。'),
      )
    })
  })

  describe('ペア名が正しい値の時', () => {
    it('TeamNameインスタンスを生成すること', () => {
      const teamName1 = {
        name: '111',
      }

      expect(TeamName.create(teamName1)).toEqual(
        expect.objectContaining({
          props: { name: '111' },
        }),
      )
    })
  })
})
