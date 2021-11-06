import { Identifier } from './Identifier'
const isEntity = (v: any): v is Entity<any, any> => {
  return v instanceof Entity
}

export abstract class Entity<T, U extends Identifier> {
  protected readonly _id?: U
  public readonly props: T

  constructor(props: T, id?: U) {
    this._id = id
    this.props = props
  }

  get id(): number | undefined {
    if (!this._id) return undefined
    return this._id.toValue()
  }

  public equals(object?: Entity<T, U>): boolean {
    if (object === null || object == undefined) return false
    if (!this._id) return false
    if (!isEntity(object)) return false

    return this._id.equals(object._id)
  }
}
