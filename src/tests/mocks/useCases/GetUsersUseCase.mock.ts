import { IGetUsers, IGetUsersDTO, IGetUsersResponse } from '@/interfaces/domain/useCases/users/GetUsers'
import { makeFakeUserModel } from '../models/UserModel.mock'

export const makeFakeGetUsers = (): IGetUsers => {
    class GetUsersStub implements IGetUsers {
        async get(data: IGetUsersDTO): Promise<IGetUsersResponse> {
            return Promise.resolve({
                users: [
                    {
                        name: 'fake_name',
                        discord_username: null,
                        email: 'fake_email@email.com',
                        roles: ['student'],
                        points: 0,
                        _id: '111111111'
                    }
                ],
                pages: 1
            })
        }
    }
    return new GetUsersStub()
}
