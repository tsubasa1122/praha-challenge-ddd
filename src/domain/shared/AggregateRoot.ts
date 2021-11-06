// 集約ルートとエンティティの基底クラスを分けて作ったが、分ける必要ないかも...？

import { Entity } from './Entity'
import { Identifier } from './Identifier'

export abstract class AggregateRoot<T, U extends Identifier> extends Entity<
  T,
  U
> {}
