import { PrismaClient } from '@prisma/client'
import Participant from 'src/domain/models/participant/participant'
import checkEmailAlreadyExistsService from 'src/domain/services/participant/checkEmailAlreadyExistsService'
import ParticipantRepository from 'src/infrastructure/db/repository/participantRepository'

describe('function execute()', () => {
  describe('emailの参加者が既に登録済みのとき', () => {
    const participant = {
      name: 'テスト名',
      email: 'test@example.com',
    }
    const mockParticipantRepository = new ParticipantRepository({
      prisma: new PrismaClient(),
    })
    mockParticipantRepository.findByEmail = jest
      .fn()
      .mockResolvedValue(participant)

    it('例外が発生すること', async () => {
      await expect(
        checkEmailAlreadyExistsService.execute(
          Participant.create(participant),
          mockParticipantRepository,
        ),
      ).rejects.toThrow('参加者は既に登録されています。')
    })
  })

  describe('emailの参加者がまだ登録されていないとき', () => {
    const participant = {
      name: 'テスト名',
      email: 'test@example.com',
    }
    const mockParticipantRepository = new ParticipantRepository({
      prisma: new PrismaClient(),
    })
    mockParticipantRepository.findByEmail = jest.fn().mockResolvedValue(null)

    it('falseを返すこと', async () => {
      await expect(
        checkEmailAlreadyExistsService.execute(
          Participant.create(participant),
          mockParticipantRepository,
        ),
      ).resolves.toEqual(false)
    })
  })
})
