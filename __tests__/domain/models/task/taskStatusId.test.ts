import TaskStatusId from 'src/domain/models/task/taskStatusId'

describe('function create()', () => {
  describe('idが設定されている時', () => {
    it('TaskStatusIdインスタンスが生成されること', () => {
      const taskStatusId = 2
      expect(TaskStatusId.create(taskStatusId)).toEqual(
        expect.objectContaining({ value: 2 }),
      )
    })
  })
})
