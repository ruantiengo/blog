import { AddPost, AddPostNamespace } from '../../domain/usecases/add-post'
import { CheckIfTitleAlreadyExists } from '../../domain/usecases/check-if-title-exists'
import { TitleAlreadyExistsError } from '../errors/title-alreayd-exists-error'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest, created, serverError } from '../helpers/http-helpers'
import { Controller } from '../protocols/controller'
import { HttpResponse } from '../protocols/http-methods'

export namespace AddPostControllerNamespace {
   export type Request = {
        body: AddPostNamespace.Params | any
   }
   export type Response = HttpResponse
}

export class AddPostController implements Controller {
  constructor (private readonly addAccount: AddPost, private readonly checkIfTitleAlreadyExists: CheckIfTitleAlreadyExists) {
    this.addAccount = addAccount
    this.checkIfTitleAlreadyExists = checkIfTitleAlreadyExists
  }

  async handle (httpRequest: AddPostControllerNamespace.Request): Promise<AddPostControllerNamespace.Response> {
    try {
      const postRequest = httpRequest.body

      const requiredFields = ['type', 'body', 'title']
      for (const field of requiredFields) {
        if (postRequest[field] === undefined) return badRequest(new MissingParamError(field))
      }
      const verifyIfTitleAlreadyExists = await this.checkIfTitleAlreadyExists.checkTitle(postRequest.title)
      if (verifyIfTitleAlreadyExists === true) {
        return badRequest(new TitleAlreadyExistsError())
      }
      const post = await this.addAccount.add(httpRequest.body)

      return created(post)
    } catch (error) {
      return serverError()
    }
  }
}
