import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IUser } from '@/domain/User'
import { makeFakeUserModel } from '@/tests/mocks/models/UserModel.mock'
import {
    IPaginatedResult,
    IQuery,
    TFieldQuery,
    TFiltersQuery
} from '@/interfaces/application/repositories/BaseRepository'

export const makeFakeUsersRepository = (): IUsersRepository => {
    class UsersRepositoryStub implements IUsersRepository {
        async queryOne(query: TFiltersQuery<IUser>): Promise<IUser> {
            return Promise.resolve(makeFakeUserModel())
        }
        async queryMany(query: IQuery<IUser>): Promise<IPaginatedResult<IUser>> {
            const data = {
                items: [makeFakeUserModel()],
                total_items: 1,
                total_pages: 1
            }
            return Promise.resolve(data)
        }
        async create(data: Partial<IUser>): Promise<IUser> {
            return Promise.resolve(makeFakeUserModel())
        }
        async delete(id: string): Promise<boolean> {
            return Promise.resolve(true)
        }

        async update(id: string, data: TFieldQuery<IUser>): Promise<IUser> {
            return Promise.resolve(makeFakeUserModel())
        }
        async getAll(): Promise<IUser[]> {
            return Promise.resolve([makeFakeUserModel()])
        }
    }
    return new UsersRepositoryStub()
}
