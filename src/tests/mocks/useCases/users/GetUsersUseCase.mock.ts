import { IGetUsers, IGetUsersDTO, IGetUsersResponse } from '@/interfaces/domain/useCases/users/GetUsers'
import { makeFakeUserModel } from '../../models/UserModel.mock'

export const makeFakeGetUsers = (): IGetUsers => {
    class GetUsersStub implements IGetUsers {
        async execute(data: IGetUsersDTO): Promise<IGetUsersResponse> {
            return Promise.resolve({
                users: [makeFakeUserModel()],
                pages: 1
            })
        }
    }
    return new GetUsersStub()
}
