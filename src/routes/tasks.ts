import { PrismaClient } from '@prisma/client'
import PromiseRouter from 'express-promise-router'
import TasksController from '../controllers/tasksController'

const tasksRouter = PromiseRouter()
const prismaClient = new PrismaClient()
const tasksController = new TasksController(prismaClient)
tasksRouter.post('/', tasksController.create)

export default tasksRouter
