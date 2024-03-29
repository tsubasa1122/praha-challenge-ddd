import { PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import ParticipantQS from '../infrastructure/db/queryService/participantQS'
import ParticipantRepository from '../infrastructure/db/repository/participantRepository'
import TaskRepository from '../infrastructure/db/repository/taskRepository'
import CreateParticipantUseCase from '../usecase/participant/createParticipantUseCase'

type CreateParticipantParams = {
  name: string
  email: string
}
export default class ParticipantsController {
  constructor(private prismaClient: PrismaClient) {}

  create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      // Question request.bodyに肩を付けられないか調べる
      const { name, email } = req.body as CreateParticipantParams
      const participantRepository = new ParticipantRepository({
        prisma: this.prismaClient,
      })
      const taskRepository = new TaskRepository({
        prisma: this.prismaClient,
      })

      const createParticipantUsecase = new CreateParticipantUseCase(
        participantRepository,
        taskRepository,
      )
      await createParticipantUsecase.execute({ name, email })
      res.status(200).send('Hello World')
    } catch (e) {
      // eが暗黙的にany型になるため、ESlintに怒られないようにガード節を用いている

      if (e instanceof Error) {
        res.status(400).send({ messge: e.message })
      } else {
        res.status(500)
      }
    } finally {
      next()
    }
  }

  show = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = req.params.id
      const participantRepository = new ParticipantRepository({
        prisma: this.prismaClient,
      })
      const data = await participantRepository.findById(Number(id))
      if (!data) throw new Error('参加者が見つかりません。')
      res.status(200).send({
        name: data.props.name,
        email: data.props.email,
      })
    } catch (e) {
      if (e instanceof Error) {
        res.status(404).send({ message: e.message })
      } else {
        res.status(500)
      }
    } finally {
      next()
    }
  }

  index = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const page = req.query?.page

      const participantQS = new ParticipantQS({
        prisma: this.prismaClient,
      })

      const participants = await participantQS.getAll(Number(page))
      res.status(200).send(participants)
    } catch (e) {
      if (e instanceof Error) {
        res.status(404).send({ message: e.message })
      } else {
        res.status(500)
      }
    } finally {
      next()
    }
  }
}
