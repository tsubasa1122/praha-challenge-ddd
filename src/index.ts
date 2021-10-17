// import { PrismaClient } from '@prisma/client';
import express from 'express'
import * as Routes from './routes'

// const prisma = new PrismaClient();
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

// routers
app.use('/api/participants', Routes.participantsRouter)
app.use('/api/tasks', Routes.tasksRouter)

// helth check
app.get('/api/hc', (_req, res) => res.send('ok!!'))

// start up server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
