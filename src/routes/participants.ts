import { PrismaClient } from '@prisma/client'
import PromiseRouter from 'express-promise-router'
import ParticipantsController from '../controllers/participantsController'

// 本来はprismaClientではなく、もっと抽象化されたDBClient的なものを用意して使いたい。
const participantsRouter = (prismaClient: PrismaClient) => {
  const router = PromiseRouter()
  const participantsController = new ParticipantsController(prismaClient)

  router.get('/', participantsController.index)
  router.post('/', participantsController.create)
  router.get('/:id', participantsController.show)

  return router
}

export default participantsRouter
