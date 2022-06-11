import { PrismaClient } from '@prisma/client'
import PromiseRouter from 'express-promise-router'
import ParticipantsController from '../controllers/participantsController'

const participantsRouter = PromiseRouter()
const prismaClient = new PrismaClient()
const participantsController = new ParticipantsController(prismaClient)
participantsRouter.get('/', participantsController.index)
participantsRouter.post('/', participantsController.create)
participantsRouter.get('/:id', participantsController.show)
//  router.post('/', participantsController.create)

export default participantsRouter
