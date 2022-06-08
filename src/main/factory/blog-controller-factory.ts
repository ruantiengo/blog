import { DbAddPost } from '../../data/usecases/db-add-post'
import { DbCheckTitleAlreadyExists } from '../../data/usecases/db-check-title-exist'
import { PostgresRepository } from '../../infra/postgres-post-repository'
import { AddPostController } from '../../presentation/controllers/add-post-controller'

export const makeBlogController = () => {
  const repository = new PostgresRepository()
  const addPost = new DbAddPost(repository)
  const checkTitle = new DbCheckTitleAlreadyExists(repository)
  const blogController = new AddPostController(addPost, checkTitle)
  return blogController
}
