import { PrismaClient } from '@prisma/client'
import util from 'util'

// integrationテストで使用
// DBのデータを利用出来るようにする
export const prisma = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL },
  },
})

// DBのデータをテスト毎に削除する
// ref: https://zenn.dev/5t111111/scraps/f9002ee51a588a#comment-c53c39889f17b4
// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-member-access
const exec = util.promisify(require('child_process').exec)

export const resetDatabase = async (): Promise<void> => {
  const prismaBinary = './node_modules/.bin/prisma'
  await exec(`${prismaBinary} migrate reset --force`)
}
