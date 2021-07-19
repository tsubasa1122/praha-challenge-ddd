// import { PrismaClient } from '@prisma/client';
import express from 'express'
import indexRouter from './routes'

// const prisma = new PrismaClient();
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use('/', indexRouter)

// helth check
app.get('/api/hc', (_req, res) => res.send('ok!!'))
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
