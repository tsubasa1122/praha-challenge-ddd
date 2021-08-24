export class Identifier<T> {
  constructor(private value?: T) {
    this.value = value
  }

  equals(id?: Identifier<T>): boolean {
    if (id === null || id === undefined) return false
    if (!(id instanceof this.constructor)) return false
    if (!this.value) return false

    return id.toValue() === this.value
  }

  toValue(): T | undefined {
    if (!this.value) return undefined

    return this.value
  }
}
