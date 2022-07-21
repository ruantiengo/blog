import { DbAddPost } from '../../../../src/data/usecases/db-add-post'
import { AddPost, AddPostNamespace } from '../../../../src/domain/usecases/add-post'
import { faker } from '@faker-js/faker'

const makeDbAddRepository = () => {
  class AddPostRepositoryStub implements AddPost {
    async add (addPostParams: AddPostNamespace.Params): AddPostNamespace.result {
      return {
        id: 1,
        body: faker.lorem.paragraph(),
        title: faker.lorem.sentence(4),
        type: faker.word.noun()
      }
    }
  }
  return new AddPostRepositoryStub()
}
const makeSut = () => {
  const postRepoStub = makeDbAddRepository()
  const sut = new DbAddPost(postRepoStub)
  return { sut, postRepoStub }
}
const makeHttpRequest = {
  body: faker.lorem.paragraph(),
  title: faker.lorem.sentence(4),
  type: faker.word.noun()
}
describe('Add post 2', () => {
  it('should return an account if repository works', async () => {
    const { sut } = makeSut()
    const request = makeHttpRequest
    const httpResponse = sut.add(request)
    expect(httpResponse).resolves.not.toThrow()
  })
  it('should throw if repository throws', async () => {
    const { sut, postRepoStub } = makeSut()
    jest.spyOn(postRepoStub, 'add').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const request = makeHttpRequest
    const promise = sut.add(request)
    expect(promise).rejects.toThrow()
  })
})
