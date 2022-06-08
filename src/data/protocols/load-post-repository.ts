import { Post } from '@prisma/client'

export interface LoadPostsRepository{
    loadPosts(): Promise<Array<Post>>
}
