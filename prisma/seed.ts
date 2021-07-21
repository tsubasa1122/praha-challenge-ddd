// TODO: disableを無くす
/* eslint-disable */
import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// TODO: 正確な型を指定する
const tasks: Prisma.TaskCreateManyInput[] = [
  {
    id: 1,
    title: 'よく使うHTTPヘッダを理解する',
    content: 'HTTPヘッダーに関するクイズを3問、作成してください',
  },
  {
    id: 2,
    title: 'curlとpostmanに慣れる',
    content: 'curlに関するクイズを3問、作成してください',
  },
  {
    id: 3,
    title: 'リクエストをパースするWEBサーバを作ってみる',
    content: 'Webサーバにに関するクイズを3問、作成してください',
  },
]

// TODO: 複数upsert出来る方法を探す
async function main() {
  const created_task = await prisma.task.createMany({
    data: tasks,
    skipDuplicates: true,
  })

  console.log(created_task)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
/* eslint-enable */
