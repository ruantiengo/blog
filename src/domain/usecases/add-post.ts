import { Post } from '../entities/post'

export namespace AddPostNamespace{
    export type Params = Omit<Post, 'id'>
    export type result = Promise<Post>
}
export interface AddPost{
    add(addPostParams: AddPostNamespace.Params): AddPostNamespace.result
}
