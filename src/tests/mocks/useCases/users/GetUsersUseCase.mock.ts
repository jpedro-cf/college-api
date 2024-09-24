import { IGetUsers, IGetUsersDTO, IGetUsersResponse } from '@/interfaces/domain/useCases/users/GetUsers'
import { makeFakeUserModel } from '../../models/UserModel.mock'
import { IUser } from '@/domain/User'

export const makeFakeGetUsers = (): IGetUsers => {
    class GetUsersStub implements IGetUsers {
        async getByID(id: string): Promise<IUser> {
            return Promise.resolve(makeFakeUserModel())
        }
        async execute(data: IGetUsersDTO): Promise<IGetUsersResponse> {
            return Promise.resolve({
                users: [makeFakeUserModel()],
                pages: 1
            })
        }
    }
    return new GetUsersStub()
}
