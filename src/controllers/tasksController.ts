import { PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import ParticipantRepository from 'src/infrastructure/db/repository/participantRepository'
import TaskRepository from 'src/infrastructure/db/repository/taskRepository'
import CreateTaskUseCase from 'src/usecase/task/createTaskUseCase'

interface CreateTaskParams {
  title: string
  content: string
  taskStatus: { name: string }
}
export default class TasksController {
  constructor(private prismaClient: PrismaClient) {}

  create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { title, content, taskStatus } = req.body as CreateTaskParams
      const participantRepository = new ParticipantRepository({
        prisma: this.prismaClient,
      })
      const taskRepository = new TaskRepository({ prisma: this.prismaClient })
      const createTaskUsecase = new CreateTaskUseCase(
        participantRepository,
        taskRepository,
      )
      await createTaskUsecase.execute({ title, content, taskStatus })
      res.status(200).send('Hello World')
    } catch (e) {
      if (e instanceof Error) {
        res.status(400).send({ message: e.message })
      } else {
        res.status(500)
      }
    } finally {
      next()
    }
  }
}
