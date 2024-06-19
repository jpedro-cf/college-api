import { IHashComparer } from '@/interfaces/application/cryptography/Hasher'
import { IToken } from '@/interfaces/application/cryptography/Token'
import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import {
    IAuthentication,
    IAuthenticationDTO,
    IAuthenticationResponse
} from '@/interfaces/domain/useCases/auth/Authentication'

export class AuthenticationUseCase implements IAuthentication {
    constructor(
        private readonly usersRepository: IUsersRepository,
        private readonly hashComparer: IHashComparer,
        private readonly token: IToken
    ) {}
    async auth(authentication: IAuthenticationDTO): Promise<IAuthenticationResponse> {
        const account = await this.usersRepository.getByField('email', authentication.email)

        if (!account) {
            return null
        }

        const isValid = await this.hashComparer.compare(authentication.password, account.password)

        if (!isValid) {
            return null
        }

        const accessToken = await this.token.encrypt(account._id)
        account.access_token = accessToken
        await this.usersRepository.updateUser(account)

        const { password, access_token, ...user } = account
        return {
            user,
            token: accessToken
        }
    }
}
