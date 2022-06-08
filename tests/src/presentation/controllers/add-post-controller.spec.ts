import { AddPost, AddPostNamespace } from '../../../../src/domain/usecases/add-post'
import { AddPostController } from '../../../../src/presentation/controllers/add-post-controller'
import { faker } from '@faker-js/faker'
import { MissingParamError } from '../../../../src/presentation/errors/missing-param-error'
import { ServerError } from '../../../../src/presentation/errors/server-error'
import { CheckIfTitleAlreadyExists } from '../../../../src/domain/usecases/check-if-title-exists'
import { TitleAlreadyExistsError } from '../../../../src/presentation/errors/invalid-field-error'

const makeAddPost = () => {
  class AddPostStub implements AddPost {
    async add (addPostParams: AddPostNamespace.Params): AddPostNamespace.result {
      return {
        id: 1,
        title: 'ola',
        type: 'teste',
        body: 'teste'
      }
    }
  }
  return new AddPostStub()
}
const makeCheckTitle = () => {
  class CheckIfTitleAlreadyExistsStub implements CheckIfTitleAlreadyExists {
    async checkTitle (title: string): Promise<boolean> {
      return new Promise(resolve => resolve(false))
    }
  }
  return new CheckIfTitleAlreadyExistsStub()
}
const makeSut = () => {
  const addPostStub = makeAddPost()
  const checkTitleStub = makeCheckTitle()
  const sut = new AddPostController(addPostStub, checkTitleStub)
  return { sut, addPostStub, checkTitleStub }
}
const makeHttpRequest = () => {
  return {
    body: {
      title: faker.lorem.paragraph,
      type: faker.word.noun(),
      body: faker.lorem.paragraphs(),
      image: faker.image.animals()
    }
  }
}

describe('ADD POST CONTROLLER', () => {
  it('Should return 400 if no type is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeHttpRequest()
    delete httpRequest.body.type
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('type'))
  })
  it('Should return 400 if no body is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeHttpRequest()
    delete httpRequest.body.body
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('body'))
  })
  it('Should return 400 if no title is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = makeHttpRequest()
    delete httpRequest.body.title
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('title'))
  })
  it('Should return 500 if addAccount throws', async () => {
    const { sut, addPostStub } = makeSut()
    jest.spyOn(addPostStub, 'add').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = makeHttpRequest()
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new ServerError())
  })

  it('Should return 500 if checkTitle throws', async () => {
    const { sut, checkTitleStub } = makeSut()

    jest.spyOn(checkTitleStub, 'checkTitle').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = makeHttpRequest()
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new ServerError())
  })
  it('Should return 400 if checkTitle returns false', async () => {
    const { sut, checkTitleStub } = makeSut()

    jest.spyOn(checkTitleStub, 'checkTitle').mockImplementationOnce(() => {
      return new Promise((resolve) => resolve(true))
    })
    const httpRequest = makeHttpRequest()
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new TitleAlreadyExistsError())
  })
  it('Should return 200 if success', async () => {
    const { sut } = makeSut()
    const httpRequest = makeHttpRequest()
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(201)
  })
})
