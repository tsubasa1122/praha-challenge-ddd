// import { PrismaClient } from '@prisma/client';
import express, { RequestHandler } from 'express'
import cors from 'cors'
import * as Routes from './routes'
import admin from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth'

// const prisma = new PrismaClient();
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

// CORSを許可する 今回は雑に全てのオリジンを許可する
app.use(cors())

const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS

if (serviceAccount) {
  const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: 'https://clean-bindery-220507.firebaseio.com',
  })
  firebase.auth()

  // routers
  app.use('/api/participants', Routes.participantsRouter)
  app.use('/api/tasks', Routes.tasksRouter)

  // helth check
  app.get('/api/hc', (async (req, res) => {
    // 愚直に認可処理を入れたけど、共通化したい
    const idToken = req.header('Authorization')

    if (idToken) {
      const currentUser = await getAuth().verifyIdToken(idToken)

      // ユーザーがいたらユーザー名を返す
      if (currentUser.name) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        res.status(200).json({ name: currentUser.name })
        return
      }

      res.status(401).json({ message: '不正なリクエストです。' })
      return
    }

    res.status(401).json({ message: '不正なリクエストです。' })
  }) as RequestHandler)

  // start up server
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
}
