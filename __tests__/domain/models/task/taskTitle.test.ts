import TaskTitle from '../../../../src/domain/models/task/taskTitle'

describe('function create()', () => {
  describe('titleが設定されていない時', () => {
    it('例外を投げること', () => {
      const taskTitle = { title: '' }
      expect(() => TaskTitle.create(taskTitle)).toThrow(
        new Error('タイトルが設定されていません。'),
      )
    })
  })

  describe('titleが設定されている時', () => {
    it('TaskTitleインスタンスが生成されること', () => {
      const taskTitle = { title: 'テスト' }
      expect(TaskTitle.create(taskTitle)).toEqual(
        expect.objectContaining({ props: { title: 'テスト' } }),
      )
    })
  })
})
