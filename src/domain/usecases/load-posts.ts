import { Post } from '../entities/post'

export interface LoadPosts{
    loadPosts(): Promise<Array<Post>>
}
