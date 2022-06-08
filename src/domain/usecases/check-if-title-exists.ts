export interface CheckIfTitleAlreadyExists{
    checkTitle(title: string): Promise<boolean>
}
