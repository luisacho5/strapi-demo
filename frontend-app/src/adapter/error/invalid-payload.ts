export class InvalidPayload extends Error {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, InvalidPayload.prototype)
  }
}
