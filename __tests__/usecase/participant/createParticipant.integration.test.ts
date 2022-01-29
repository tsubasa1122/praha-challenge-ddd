import { PrismaClient } from '@prisma/client'
import ParticipantRepository from 'src/infrastructure/db/repository/participantRepository'
import TaskRepository from 'src/infrastructure/db/repository/taskRepository'
import CreateParticipantUseCase from 'src/usecase/participant/createParticipantUseCase'

const prisma = new PrismaClient()

// beforeAll(async () => {
//   // TODO:idはランダムに指定できるようにする
//   const tasks = [
//     {
//       id: 1,
//       title: 'よく使うHTTPヘッダを理解する',
//       content: 'HTTPヘッダーに関するクイズを3問、作成してください',
//     },
//     {
//       id: 2,
//       title: 'curlとpostmanに慣れる',
//       content: 'curlに関するクイズを3問、作成してください',
//     },
//     {
//       id: 3,
//       title: 'リクエストをパースするWEBサーバを作ってみる',
//       content: 'Webサーバにに関するクイズを3問、作成してください',
//     },
//   ]

//   const enrollmentStatus = [
//     {
//       id: 1,
//       name: 'active',
//     },
//     {
//       id: 2,
//       name: 'inactive',
//     },
//     {
//       id: 3,
//       name: 'withdrawn',
//     },
//   ]

//   await prisma.task.createMany({
//     data: tasks,
//     skipDuplicates: true,
//   })
//   await prisma.enrollmentStatus.createMany({
//     data: enrollmentStatus,
//     skipDuplicates: true,
//   })
// })

afterEach(async () => {
  const deleteAssignTaks = prisma.assignTaskToParticipants.deleteMany()
  const deleteTasks = prisma.task.deleteMany()
  const deleteParticipant = prisma.participant.deleteMany()
  const deleteEnrollmentStatus = prisma.enrollmentStatus.deleteMany()

  await prisma.$transaction([
    deleteAssignTaks,
    deleteTasks,
    deleteParticipant,
    deleteEnrollmentStatus,
  ])
  await prisma.$disconnect()
})
describe('function execute()', () => {
  const params = {
    name: 'nakano',
    email: 'test@example.com',
  }

  beforeEach(async () => {
    const participantRepository = new ParticipantRepository({
      prisma: prisma,
    })
    const taskRepository = new TaskRepository({
      prisma: prisma,
    })

    const createParticipantUseCase = new CreateParticipantUseCase(
      participantRepository,
      taskRepository,
    )

    await createParticipantUseCase.execute(params)
  })

  it('participantが作成されること', async () => {
    const newParticipant = await prisma.participant.findUnique({
      where: {
        email: params.email,
      },
      include: {
        enrollmentStatus: true,
      },
    })

    const tasks = await prisma.task.findMany({
      where: {
        assignTaskToParticipants: {
          every: {
            participantId: newParticipant?.id,
          },
        },
      },
    })

    expect(newParticipant).toHaveProperty('name', 'nakano')
    expect(newParticipant).toHaveProperty('enrollmentStatus.name', 'active')
    expect(tasks.length).toBe(3)
  })
})
