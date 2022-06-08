import { CheckIfTitleAlreadyExists } from '../../domain/usecases/check-if-title-exists'
import { CheckIfTitleAlreadyExistsRepository } from '../protocols/check-title-already-exist-repository'
export class DbCheckTitleAlreadyExists implements CheckIfTitleAlreadyExists {
  constructor (private readonly checkTitleAlreadyExistsRepository: CheckIfTitleAlreadyExistsRepository) {
    this.checkTitleAlreadyExistsRepository = checkTitleAlreadyExistsRepository
  }

  async checkTitle (title: string): Promise<boolean> {
    const res = await this.checkTitleAlreadyExistsRepository.checkTitle(title)
    return res
  }
}
