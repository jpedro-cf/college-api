import { IUser } from '@/domain/User'
import { IGetByToken } from '@/interfaces/domain/useCases/auth/GetByToken'
import { makeFakeUserModel } from '../models/UserModel.mock'

export const makeFakeGetByToken = (): IGetByToken => {
    class GetByTokenStub implements IGetByToken {
        async get(token: string): Promise<IUser> {
            return Promise.resolve(makeFakeUserModel())
        }
    }
    return new GetByTokenStub()
}
