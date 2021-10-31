import TaskStatus, { TASK_STATUS_NAME } from 'src/domain/models/task/taskStatus'
import Task from 'src/domain/models/task/task'
import { Identifier } from 'src/domain/shared/Identifier'
import EnrollmentStatus, {
  ENROLLMENT_STATUS_NAME,
} from 'src/domain/models/participant/enrollmentStatus'
import Participant from 'src/domain/models/participant/participant'

describe('function create()', () => {
  describe('各パラメータの値が設定されているとき', () => {
    it('taskインスタンスを生成すること', () => {
      const task = {
        title: 'テスト',
        content: 'テストを始めてみよう。',
        taskStatus: { name: TASK_STATUS_NAME.NOT_STARTED },
      }

      expect(Task.create(task)).toEqual(
        expect.objectContaining({
          _id: undefined,
          props: {
            content: {
              _id: undefined,
              props: { content: 'テストを始めてみよう。' },
            },
            taskStatus: { _id: undefined, props: { name: 'not_started' } },
            title: { _id: undefined, props: { title: 'テスト' } },
          },
        }),
      )
    })
  })
})

describe('function recreate()', () => {
  describe('各パラメータの値が設定されているとき', () => {
    it('taskインスタンスを生成すること', () => {
      const task = {
        title: 'テスト',
        content: 'テストを始めてみよう。',
        taskStatus: TaskStatus.recreate(
          { name: TASK_STATUS_NAME.NOT_STARTED },
          new Identifier(1),
        ),
      }
      expect(Task.recreate({ ...task }, new Identifier(1))).toEqual(
        expect.objectContaining({
          _id: { value: 1 },
          props: {
            content: {
              _id: undefined,
              props: { content: 'テストを始めてみよう。' },
            },
            taskStatus: { _id: { value: 1 }, props: { name: 'not_started' } },
            title: { _id: undefined, props: { title: 'テスト' } },
          },
        }),
      )
    })
  })
})

describe('function newAssign()', () => {
  it('participantに未着手のタスクが設定されること', () => {
    const taskParams = {
      title: 'テスト',
      content: 'テストを始めてみよう。',
      taskStatus: TaskStatus.recreate(
        { name: TASK_STATUS_NAME.NOT_STARTED },
        new Identifier(1),
      ),
    }
    const task = Task.recreate({ ...taskParams }, new Identifier(1))

    const participantParams = {
      name: 'テスト名',
      email: 'test@example.com',
      enrollmentStatus: EnrollmentStatus.recreate(
        { name: ENROLLMENT_STATUS_NAME.ACTIVE },
        new Identifier(2),
      ),
    }

    const participant = Participant.recreate(
      participantParams,
      new Identifier(2),
    )

    expect(task.props.participantId).toEqual(undefined)
    task.newAssign(participant)
    expect(task.props.participantId).toEqual(2)
    expect(task.props.taskStatus.props.name).toEqual(
      TASK_STATUS_NAME.NOT_STARTED,
    )
  })
})

describe('function changeStatus', () => {
  it('taskのステータスが変更されること', () => {
    const taskParams = {
      title: 'テスト',
      content: 'テストを始めてみよう。',
      taskStatus: TaskStatus.recreate(
        { name: TASK_STATUS_NAME.NOT_STARTED },
        new Identifier(1),
      ),
    }
    const task = Task.recreate({ ...taskParams }, new Identifier(1))
    task.changeStatus('done')
    expect(task.props.taskStatus.props.name).toEqual(TASK_STATUS_NAME.DONE)
  })
})
