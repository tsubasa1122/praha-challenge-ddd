import { ValueObject } from '../../../domain/shared/ValueObject'

interface ParticipantEmailAttributes {
  email: string
}

export default class ParticipantEmail extends ValueObject<ParticipantEmailAttributes> {
  private static EMAIL_REGEXP = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

  public static create(params: ParticipantEmailAttributes): ParticipantEmail {
    if (!params.email) throw new Error('メールアドレスが設定されていません。')
    const formattedEmail = this.format(params.email)
    this.isValidEmail(formattedEmail)
    return new ParticipantEmail({ email: formattedEmail })
  }

  private static isValidEmail(email: string): void {
    if (this.EMAIL_REGEXP.test(email)) return
    throw new Error('不正なメールアドレスです。')
  }

  private static format(email: string): string {
    return email.trim().toLowerCase()
  }
  private constructor(props: ParticipantEmailAttributes) {
    super(props)
  }
}
