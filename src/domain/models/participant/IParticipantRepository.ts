import { Participant } from './participant'
export interface IParticipantRepository {
  save(partipant: Participant): Promise<void>
}
