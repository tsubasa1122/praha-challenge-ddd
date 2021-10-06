import { PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import CreateTaskUseCase from 'src/usecase/task/createTaskUseCase'

// type CreateTaskParams = {}

export default class TasksController {
  constructor(private prismaClient: PrismaClient) {}

  // create = async(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     // const createTaskUsecase = new CreateTaskUseCase()
  //   } catch(e) {
  //     if (e instanceof Error) {
  //       res.status(400).send({ message: e.message} )
  //     } else {
  //       res.status(500)
  //     }
  //   } finally {
  //     next()
  //   }
  // }

  // // TODO
  // update = async(req: Request, res: Response, next: NextFunction): Promise<void> {

  // }
}
