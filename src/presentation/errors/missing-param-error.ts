export class MissingParamError extends Error {
  constructor (message: string) {
    super(`missing param ${message}`)
    this.name = 'Missing Param Error'
  }
}
