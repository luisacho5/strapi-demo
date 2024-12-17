export class StrapiError extends Error {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, StrapiError.prototype)
  }
}
