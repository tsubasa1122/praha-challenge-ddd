export class Identifier {
  constructor(private value?: number) {
    this.value = value
  }

  equals(id?: Identifier): boolean {
    if (id === null || id === undefined) return false
    if (!(id instanceof this.constructor)) return false
    if (!this.value) return false

    return id.toValue() === this.value
  }

  toValue(): number | undefined {
    if (!this.value) return undefined

    return this.value
  }
}
