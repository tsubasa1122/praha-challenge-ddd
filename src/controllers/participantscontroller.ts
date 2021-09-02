import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import ParticipantRepository from 'src/infrastructure/db/repositoty/participantRepository'
import CreateParticipant from 'src/usecase/participant/createParticipant'

/* eslint-disable */
export default class ParticipantsController {
  constructor(private prismaClient: PrismaClient) {}

  create = async (req: Request, res: Response) => {
    try {
      const { name, email } = req.body
      const participantRepository = new ParticipantRepository(this.prismaClient)
      const createParticipantUsecase = new CreateParticipant(
        participantRepository,
      )
      await createParticipantUsecase.execute({ name, email })
      res.json({ status: 'ok' })
    } catch (e) {
      res.status(400).send({ messge: e.message })
    }
  }
}
