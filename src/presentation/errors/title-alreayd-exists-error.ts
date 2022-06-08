export class TitleAlreadyExistsError extends Error {
  constructor () {
    super('A post with this title already exists')
    this.name = 'Title already exists'
  }
}
