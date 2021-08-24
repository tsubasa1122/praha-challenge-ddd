import PromiseRouter from 'express-promise-router'
import ParticipantsController from '../controllers/participantscontroller'

/* eslint-disable */
const participantsRouter = PromiseRouter()
const participantsController = new ParticipantsController()
participantsRouter.get('/', participantsController.index)
//  router.post('/', participantsController.create)

export default participantsRouter
