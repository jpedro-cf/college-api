import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { ISignUpDTO } from '@/interfaces/domain/useCases/auth/SignUp'
import { IUserSchema } from '@/interfaces/application/schemas/UserSchema'
import { makeFakeUserModel } from '@/tests/mocks/models/UserModel.mock'
import { IGetUsersDTO, IGetUsersResponse } from '@/interfaces/domain/useCases/users/GetUsers'

export const makeFakeUsersRepository = (): IUsersRepository => {
    class UsersRepositoryStub implements IUsersRepository {
        async getAll(data: IGetUsersDTO): Promise<IGetUsersResponse> {
            return Promise.resolve({
                users: [makeFakeUserModel()],
                pages: 1
            })
        }
        async getByField(field: string, value: string): Promise<IUserSchema> {
            return Promise.resolve(makeFakeUserModel())
        }
        async getByToken(token: string): Promise<IUserSchema> {
            return Promise.resolve(makeFakeUserModel())
        }
        async deleteUser(id: string): Promise<boolean> {
            return Promise.resolve(true)
        }
        async updateUser(data: IUserSchema): Promise<IUserSchema> {
            return data
        }
        async getByDiscord(discord_username: string): Promise<IUserSchema> {
            const user = makeFakeUserModel()
            user.discord_confirmed = true
            user.discord_username = discord_username
            return Promise.resolve(user)
        }
        async create(userData: ISignUpDTO): Promise<IUserSchema> {
            return Promise.resolve(makeFakeUserModel())
        }
        async getByEmail(email: string): Promise<IUserSchema> {
            return Promise.resolve(makeFakeUserModel())
        }
    }
    return new UsersRepositoryStub()
}
