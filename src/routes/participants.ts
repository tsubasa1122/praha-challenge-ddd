import { PrismaClient } from '@prisma/client'
import PromiseRouter from 'express-promise-router'
import ParticipantsController from '../controllers/participantscontroller'

/* eslint-disable */
const participantsRouter = PromiseRouter()
const prismaClient = new PrismaClient()
const participantsController = new ParticipantsController(prismaClient)
participantsRouter.get('/', participantsController.create)
//  router.post('/', participantsController.create)

export default participantsRouter
