import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IUserSchema } from '@/interfaces/application/schemas/UserSchema'
import { makeFakeUserModel } from '@/tests/mocks/models/UserModel.mock'
import { IGetUsersDTO, IGetUsersResponse } from '@/interfaces/domain/useCases/users/GetUsers'
import {
    IPaginatedResult,
    IQuery,
    TFieldQuery,
    TFiltersQuery
} from '@/interfaces/application/repositories/BaseRepository'

export const makeFakeUsersRepository = (): IUsersRepository => {
    class UsersRepositoryStub implements IUsersRepository {
        async queryOne(query: TFiltersQuery<IUserSchema>): Promise<IUserSchema> {
            return Promise.resolve(makeFakeUserModel())
        }
        async queryMany(query: IQuery<IUserSchema>): Promise<IPaginatedResult<IUserSchema>> {
            const data = {
                items: [makeFakeUserModel()],
                total_items: 1,
                total_pages: 1
            }
            return Promise.resolve(data)
        }
        async create(data: Partial<IUserSchema>): Promise<IUserSchema> {
            return Promise.resolve(makeFakeUserModel())
        }
        async delete(id: string): Promise<boolean> {
            return Promise.resolve(true)
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
