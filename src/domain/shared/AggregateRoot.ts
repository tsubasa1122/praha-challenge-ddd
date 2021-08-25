// 集約ルートとエンティティの基底クラスを分けて作ったが、分ける必要ないかも...？

import { Entity } from './Entity'
import { Identifier } from './Identifier'

export abstract class AggregateRoot<T> extends Entity<T> {
  get id(): Identifier<number> | undefined {
    if (!this._id) return undefined
    return this._id
  }
}
