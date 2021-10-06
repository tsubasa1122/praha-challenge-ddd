import { PrismaClient } from '@prisma/client'
import PromiseRouter from 'express-promise-router'
import TasksController from 'src/controllers/tasksController'

/* eslint-disable */

const tasksRouter = PromiseRouter()
const prismaClient = new PrismaClient()
const tasksController = new TasksController(prismaClient)
// tasksRouter.post('/', tasksController.create)
// tasksRouter.put('/:id', tasksController.update)

export default tasksRouter
