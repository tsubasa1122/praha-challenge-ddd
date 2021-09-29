import { PrismaClient } from '@prisma/client'
import PromiseRouter from 'express-promise-router'
import ParticipantsController from '../controllers/participantscontroller'

// 回避策が分からないので一旦後回し
// ref: https://stackoverflow.com/questions/67114152/typescript-eslint-throwing-a-promise-returned-error-on-a-express-router-async https://github.com/express-promise-router/express-promise-router/issues/230

/* eslint-disable */

const participantsRouter = PromiseRouter()
const prismaClient = new PrismaClient()
const participantsController = new ParticipantsController(prismaClient)
participantsRouter.get('/', participantsController.index)
participantsRouter.post('/', participantsController.create)
participantsRouter.get('/:id', participantsController.show)
//  router.post('/', participantsController.create)

export default participantsRouter
