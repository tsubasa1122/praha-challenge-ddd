export class UpdatedAt {
  constructor(private value?: Date) {
    this.value = value
  }

  equals(date?: UpdatedAt): boolean {
    if (date === null || date === undefined) return false
    if (!(date instanceof this.constructor)) return false
    if (!this.value) return false

    return date.toValue() === this.value
  }

  toValue(): Date | undefined {
    if (!this.value) return undefined

    return this.value
  }
}
