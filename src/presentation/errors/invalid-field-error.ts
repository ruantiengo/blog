export class TitleAlreadyExistsError extends Error {
  constructor (label: string) {
    super('A post with this title already exists')
    this.name = 'Title already exists'
  }
}
