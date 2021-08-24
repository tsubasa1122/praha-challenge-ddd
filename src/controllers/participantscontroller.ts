import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

/* eslint-disable */
export default class ParticipantsController {
  index = async (req: Request, res: Response) => {
    // if (!isValid) {
    //   res.sendStatus(400)
    //   return
    // }

    res.send('yes!!')
  }
}
