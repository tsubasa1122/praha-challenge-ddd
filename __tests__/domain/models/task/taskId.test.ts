import TaskId from 'src/domain/models/task/taskId'

describe('function create()', () => {
  describe('idが設定されている時', () => {
    it('TaskIdインスタンスが生成されること', () => {
      const taskId = 2
      expect(TaskId.create(taskId)).toEqual(
        expect.objectContaining({ value: 2 }),
      )
    })
  })
})
