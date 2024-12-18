

export class LandingPageInformation {
  readonly #title: string
  readonly #description: string
  readonly #imageUrl: string

  constructor(title: string, description: string, imageUrl: string) {
    this.#title = title
    this.#description = description
    this.#imageUrl = imageUrl
  }

  get title(){
    return this.#title
  }

  get description(){
    return this.#description
  }
  get imageUrl(){
    return this.#imageUrl
  }
}