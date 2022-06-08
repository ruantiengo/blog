
import { Post } from '@prisma/client'
import { AddPostRepository, CheckIfTitleAlreadyExistsRepository, LoadPostsRepository } from '../data/protocols'

import { AddPostNamespace } from '../domain/usecases/add-post'
import { prisma } from './prisma/prisma'

export class PostgresRepository implements AddPostRepository, LoadPostsRepository, CheckIfTitleAlreadyExistsRepository {
  async checkTitle (title: string): Promise<boolean> {
    const check = await prisma.post.findUnique({
      where: {
        title
      }
    })

    return check !== undefined
  }

  async loadPosts (): Promise<Post[]> {
    const posts = await prisma.post.findMany()
    return posts
  }

  async add (addPostParams: AddPostNamespace.Params): AddPostNamespace.result {
    const post = await prisma.post.create({
      data: {
        body: addPostParams.body,
        image: addPostParams.image,
        title: addPostParams.title,
        type: addPostParams.type
      }
    })
    return post
  }
}
