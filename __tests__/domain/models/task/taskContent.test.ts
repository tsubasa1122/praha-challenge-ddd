import TaskContent from 'src/domain/models/task/taskContent'

describe('function create()', () => {
  describe('contentが設定されていない時', () => {
    it('例外を投げること', () => {
      const taskContent = { content: '' }
      expect(() => TaskContent.create(taskContent)).toThrow(
        new Error('内容が設定されていません。'),
      )
    })
  })

  describe('contentが設定されている時', () => {
    it('TaskContentインスタンスが生成されること', () => {
      const taskContent = { content: 'テスト' }
      expect(TaskContent.create(taskContent)).toEqual(
        expect.objectContaining({ props: { content: 'テスト' } }),
      )
    })
  })
})
