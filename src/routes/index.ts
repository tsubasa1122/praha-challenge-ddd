import express from 'express'
const router = express.Router()

router.get('/', function (_req: express.Request, res: express.Response) {
  res.status(200).json({ message: 'hello world' })
})

export default router
