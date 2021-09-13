import { PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import ParticipantRepository from 'src/infrastructure/db/repositoty/participantRepository'
import CreateParticipant from 'src/usecase/participant/createParticipant'

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
      const participantRepository = new ParticipantRepository(this.prismaClient)
      const createParticipantUsecase = new CreateParticipant(
        participantRepository,
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
}
