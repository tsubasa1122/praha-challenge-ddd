import Participant from './participant'
import { Participant as PrismaParticipant } from 'node_modules/.prisma/client'
export interface IParticipantRepository {
  save(participant: Participant): Promise<void>
  findByEmail(participant: Participant): Promise<PrismaParticipant | null>
}
