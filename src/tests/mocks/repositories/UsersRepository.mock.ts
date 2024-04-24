import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { ISignUpDTO } from '@/interfaces/domain/useCases/auth/SignUp'
import { IUserSchema } from '@/interfaces/application/schemas/UserSchema'
import { makeFakeUserModel } from '@/tests/mocks/models/UserModel.mock'

export const makeFakeUsersRepository = (): IUsersRepository => {
    class UsersRepositoryStub implements IUsersRepository {
        async create(userData: ISignUpDTO): Promise<IUserSchema> {
            return Promise.resolve(makeFakeUserModel())
        }
        async getByEmail(email: string): Promise<IUserSchema> {
            return Promise.resolve(makeFakeUserModel())
        }
    }
    return new UsersRepositoryStub()
}
