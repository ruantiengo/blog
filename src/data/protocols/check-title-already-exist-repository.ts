export interface CheckIfTitleAlreadyExistsRepository{
    checkTitle(title: string): Promise<boolean>
}
