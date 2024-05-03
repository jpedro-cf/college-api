import {
    IAuthentication,
    IAuthenticationDTO,
    IAuthenticationResponse
} from '@/interfaces/domain/useCases/auth/Authentication'
import { makeFakeUserModel } from '../models/UserModel.mock'

export const makeFakeAuthentication = (): IAuthentication => {
    class AuthenticationStub implements IAuthentication {
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
