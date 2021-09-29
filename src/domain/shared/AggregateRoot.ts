// 集約ルートとエンティティの基底クラスを分けて作ったが、分ける必要ないかも...？

import { Entity } from './Entity'

export abstract class AggregateRoot<T> extends Entity<T> {}
