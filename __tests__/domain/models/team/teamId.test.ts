import TeamId from 'src/domain/models/team/teamId'

describe('function create()', () => {
  describe('idが設定されている時', () => {
    it('teamIdインスタンスが生成されること', () => {
      const teamId = 2
      expect(TeamId.create(teamId)).toEqual(
        expect.objectContaining({ value: 2 }),
      )
    })
  })
})
