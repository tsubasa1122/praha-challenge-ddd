// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from '@prisma/client'
import express from 'express'
import * as Routes from './routes'

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

const prisma = new PrismaClient()

// routers
app.use('/api/participants', Routes.participantsRouter(prisma))
// app.use('/api/tasks', Routes.tasksRouter)

// health check
app.get('/api/hc', (_req, res) => res.send('ok!!'))

// start up server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
