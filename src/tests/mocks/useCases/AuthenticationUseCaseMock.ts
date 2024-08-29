import {
    IAuthentication,
    IAuthenticationDTO,
    IAuthenticationResponse
} from '@/interfaces/domain/useCases/auth/Authentication'
import { makeFakeUserModel } from '../models/UserModel.mock'
import { IUser } from '@/domain/User'

export const makeFakeAuthentication = (): IAuthentication => {
    class AuthenticationStub implements IAuthentication {
        async verifySession(token: string): Promise<IUser> {
            return Promise.resolve(makeFakeUserModel())
        }
        async logout(token: string): Promise<boolean> {
            return Promise.resolve(true)
        }
        async auth(authentication: IAuthenticationDTO): Promise<IAuthenticationResponse> {
            const user = makeFakeUserModel()
            user.access_token = 'e28ujieuduy789'
            return Promise.resolve({
                user,
                token: 'any_token'
            })
        }
    }
    return new AuthenticationStub()
}
