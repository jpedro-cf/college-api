import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IUserSchema } from '@/interfaces/application/schemas/UserSchema'
import { makeFakeUserModel } from '@/tests/mocks/models/UserModel.mock'
import { IGetUsersDTO, IGetUsersResponse } from '@/interfaces/domain/useCases/users/GetUsers'
import { TFieldQuery } from '@/interfaces/application/repositories/BaseRepository'

export const makeFakeUsersRepository = (): IUsersRepository => {
    class UsersRepositoryStub implements IUsersRepository {
        async getAllWithFilters(data: IGetUsersDTO): Promise<IGetUsersResponse> {
            return Promise.resolve({
                users: [makeFakeUserModel()],
                pages: 1
            })
        }
        async create(data: Partial<IUserSchema>): Promise<IUserSchema> {
            return Promise.resolve(makeFakeUserModel())
        }
        async delete(id: string): Promise<boolean> {
            return Promise.resolve(true)
        }
        async getOneByFields(query: TFieldQuery<IUserSchema>): Promise<IUserSchema> {
            return Promise.resolve(makeFakeUserModel())
        }
        async update(id: string, data: TFieldQuery<IUserSchema>): Promise<IUserSchema> {
            return Promise.resolve(makeFakeUserModel())
        }
        async getAll(): Promise<IUserSchema[]> {
            return Promise.resolve([makeFakeUserModel()])
        }
    }
    return new UsersRepositoryStub()
}
