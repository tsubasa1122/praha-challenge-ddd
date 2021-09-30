import TaskStatus, { TASK_STATUS_NAME } from 'src/domain/models/task/taskStatus'
import { Identifier } from 'src/domain/shared/Identifier'

describe('function recreate()', () => {
  describe('各パラメータの値が設定されているとき', () => {
    it('taskStatusインスタンスを生成すること', () => {
      const taskStatus = {
        name: TASK_STATUS_NAME.DONE,
      }

      expect(TaskStatus.recreate({ ...taskStatus }, new Identifier(1))).toEqual(
        expect.objectContaining({
          _id: { value: 1 },
          props: {
            name: 'done',
          },
        }),
      )
    })
  })
})

describe('function assingNewTask()', () => {
  it('nameをNOT_STARTEDに変更すること', () => {
    const taskStatus = TaskStatus.recreate(
      {
        name: TASK_STATUS_NAME.DONE,
      },
      new Identifier(1),
    )

    expect(taskStatus.props.name).toEqual('done')
    taskStatus.assingNewTask()
    expect(taskStatus.props.name).toEqual('not_started')
  })
})
