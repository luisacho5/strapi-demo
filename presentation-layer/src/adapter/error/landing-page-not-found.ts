export class LandingPageNotFound extends Error {
  constructor( message: string) {
    super(message)
    Object.setPrototypeOf(this, LandingPageNotFound.prototype)
  }
}
