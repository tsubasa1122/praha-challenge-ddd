import { ValueObject } from '../../../domain/shared/ValueObject'

interface PairNameAttributes {
  name: string
}

export default class PairName extends ValueObject<PairNameAttributes> {
  private static MAX_LENGTH = 1
  private static FORMAT_REGEXP = /^[A-Za-z0-9]/

  public static create(params: PairNameAttributes): PairName {
    const name = params.name.trim()

    if (!name) throw new Error('ペア名が設定されていません。')
    if (this.MAX_LENGTH < name.length)
      throw new Error('ペア名は一文字でなければいけません。')
    if (!this.FORMAT_REGEXP.exec(name))
      throw new Error('ペア名は半角英数字でなければいけません。')

    return new PairName({ name: name })
  }

  private constructor(props: PairNameAttributes) {
    super(props)
  }
}
