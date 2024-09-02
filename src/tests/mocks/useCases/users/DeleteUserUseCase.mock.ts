import { IDeleteUser } from '@/interfaces/domain/useCases/users/DeleteUser'

export const makeFakeDeleteUser = (): IDeleteUser => {
    class DeleteUserStub implements IDeleteUser {
        async delete(id: string): Promise<boolean> {
            return Promise.resolve(true)
        }
    }
    return new DeleteUserStub()
}
