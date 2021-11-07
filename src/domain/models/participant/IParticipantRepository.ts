import Participant from './participant'
export interface IParticipantRepository {
  save(participant: Participant): Promise<void>
  update(participant: Participant): Promise<void>
  findByEmail(participant: Participant): Promise<Participant | null>
  findById(id: number): Promise<Participant | null>
  getAll(): Promise<Participant[]>
}
