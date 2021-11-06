import TaskStatus, { TASK_STATUS_NAME } from 'src/domain/models/task/taskStatus'

describe('function recreate()', () => {
  describe('各パラメータの値が設定されている時', () => {
    it('taskStatusインスタンスを生成すること', () => {
      const taskStatus = {
        name: TASK_STATUS_NAME.DONE,
      }

      expect(TaskStatus.recreate({ ...taskStatus }, 1)).toEqual(
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
        name: TASK_STATUS_NAME.WAITING_FOR_REVIEW,
      },
      1,
    )

    expect(taskStatus.props.name).toEqual('waiting_for_review')
    taskStatus.assingNewTask()
    expect(taskStatus.props.name).toEqual('not_started')
  })
})

describe('function changeStatus()', () => {
  describe('taskが完了済み時', () => {
    it('例外を発生すること', () => {
      const taskStatus = TaskStatus.recreate(
        {
          name: TASK_STATUS_NAME.DONE,
        },
        1,
      )

      expect(() => taskStatus.changeStatus('not_started')).toThrow(
        new Error('完了済みのステータスは変更出来ません。'),
      )
    })
  })

  describe('ステータス名に定義されていないステータスに変更しようとした時', () => {
    it('例外を発生すること', () => {
      const taskStatus = TaskStatus.recreate(
        {
          name: TASK_STATUS_NAME.NOT_STARTED,
        },
        1,
      )

      expect(() => taskStatus.changeStatus('started')).toThrow(
        new Error('不正なステータスです。'),
      )
    })
  })

  describe('完了前のステータスの時', () => {
    it('指定したステータスに変更出来ること', () => {
      const taskStatus = TaskStatus.recreate(
        {
          name: TASK_STATUS_NAME.NOT_STARTED,
        },
        1,
      )

      taskStatus.changeStatus('waiting_for_review')
      expect(taskStatus.props.name).toEqual('waiting_for_review')
      taskStatus.changeStatus('not_started')
      expect(taskStatus.props.name).toEqual('not_started')
      taskStatus.changeStatus('done')
      expect(taskStatus.props.name).toEqual('done')
    })
  })
})
