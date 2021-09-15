import { PrismaClient } from '@prisma/client'
import { mockDeep, MockProxy } from 'jest-mock-extended'

// domainやusecaseのテストではテストデータを作成する必要はないがschemaの型を利用したいのでPrismaClientのモックを作った
export type Context = {
  prisma: PrismaClient
}

export type MockContext = {
  prisma: MockProxy<PrismaClient>
}

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
  }
}
