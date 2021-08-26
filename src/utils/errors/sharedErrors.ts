import { BaseError } from './BaseError'

export class RecordNotFound extends BaseError {
  constructor(record_name: string) {
    super(record_name)
    this.message = `${record_name}は見つかりません`
  }
}

export class InvalidValue extends BaseError {
  constructor(attribute_name: string) {
    super(attribute_name)
    this.message = `${attribute_name}は不正な値です`
  }
}
