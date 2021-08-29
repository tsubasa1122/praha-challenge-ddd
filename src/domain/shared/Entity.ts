import { Identifier } from './Identifier'
const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity
}

export abstract class Entity<T> {
  protected readonly _id?: Identifier<number>
  public readonly props: T

  constructor(props: T, id?: Identifier<number>) {
    this._id = id
    this.props = props
  }

  public equals(object?: Entity<T>): boolean {
    if (object === null || object == undefined) return false
    if (!this._id) return false
    if (!isEntity(object)) return false

    return this._id.equals(object._id)
  }
}
