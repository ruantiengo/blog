import { Post } from '../../domain/entities/post'
import { LoadPosts } from '../../domain/usecases/load-posts'
import { LoadPostsRepository } from '../protocols/load-post-repository'

export class DbLoadPosts implements LoadPosts {
  constructor (private readonly loadPostsRepository: LoadPostsRepository) {
    this.loadPostsRepository = loadPostsRepository
  }

  async loadPosts (): Promise<Post[]> {
    const posts = await this.loadPostsRepository.loadPosts()
    return posts
  }
}
