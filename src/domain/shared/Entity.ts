import { CreatedAt } from './CreatedAt'
import { Identifier } from './Identifier'
import { UpdatedAt } from './UpdatedAt'
const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity
}

export abstract class Entity<T> {
  protected readonly _id?: Identifier<number>
  protected readonly _createdAt?: CreatedAt
  protected readonly _updatedAt?: UpdatedAt
  public readonly props: T

  constructor(
    props: T,
    id?: Identifier<number>,
    createdAt?: CreatedAt,
    updatedAt?: UpdatedAt,
  ) {
    this._id = id
    this._createdAt = createdAt
    this._updatedAt = updatedAt
    this.props = props
  }

  public equals(object?: Entity<T>): boolean {
    if (object === null || object == undefined) return false
    if (!this._id) return false
    if (!isEntity(object)) return false

    return this._id.equals(object._id)
  }
}
