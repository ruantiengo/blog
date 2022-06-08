import { AddPost, AddPostNamespace } from '../../domain/usecases/add-post'
import { AddPostRepository } from '../protocols/add-post-repository'

export class DbAddPost implements AddPost {
  constructor (private readonly addPostRepository: AddPostRepository) {
    this.addPostRepository = addPostRepository
  }

  async add (addPostParams: AddPostNamespace.Params): AddPostNamespace.result {
    const post = await this.addPostRepository.add(addPostParams)

    return post
  }
}
