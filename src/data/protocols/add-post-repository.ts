import { AddPostNamespace } from '../../domain/usecases/add-post'

export interface AddPostRepository{
    add(addPostParams: AddPostNamespace.Params): AddPostNamespace.result
}
