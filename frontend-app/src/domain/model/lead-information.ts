export class LeadInformation {
  readonly #id:number
  readonly #email: string

  constructor(id:number,email: string) {
    this.#id=id
    this.#email = email
  }
  get email(){
    return this.#email
  }
  get id(){
    return this.#id
  }
}