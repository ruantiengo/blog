import { CheckIfTitleAlreadyExistsRepository } from '../../../../src/data/protocols/check-title-already-exist-repository'
import { DbCheckTitleAlreadyExists } from '../../../../src/data/usecases/db-check-title-exist'
import { faker } from '@faker-js/faker'

const makeDbCheckTitle = () => {
  class CheckTitleRepositoryStub implements CheckIfTitleAlreadyExistsRepository {
    checkTitle (title: string): Promise<boolean> {
      return new Promise(resolve => resolve(false))
    }
  }
  return new CheckTitleRepositoryStub()
}
const makeSut = () => {
  const checkTitleStub = makeDbCheckTitle()
  const sut = new DbCheckTitleAlreadyExists(checkTitleStub)
  return { sut, checkTitleStub }
}

describe('Check email', () => {
  it('should return false if succes', async () => {
    const { sut } = makeSut()

    const res = await sut.checkTitle(faker.lorem.paragraph())
    expect(res).toBe(false)
  })
  it('should return true if title already exists', async () => {
    const { sut, checkTitleStub } = makeSut()
    jest.spyOn(checkTitleStub, 'checkTitle').mockImplementationOnce(() => {
      return new Promise((resolve) => resolve(true))
    })
    const res = await sut.checkTitle(faker.lorem.paragraph())
    expect(res).toBe(true)
  })
  it('should throws if repository throws', async () => {
    const { sut, checkTitleStub } = makeSut()
    jest.spyOn(checkTitleStub, 'checkTitle').mockImplementationOnce(() => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const promise = sut.checkTitle(faker.lorem.paragraph())
    expect(promise).rejects.toThrow()
  })
})
