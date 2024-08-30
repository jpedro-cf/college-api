import { IUser } from '@/domain/User'
import { IHashComparer } from '@/interfaces/application/cryptography/Hasher'
import { IToken } from '@/interfaces/application/cryptography/Token'
import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IAuthentication, IAuthenticationDTO } from '@/interfaces/domain/useCases/auth/Authentication'
import { AuthenticationError } from '@/utils/customErrors'

export class AuthenticationUseCase implements IAuthentication {
    constructor(
        private readonly usersRepository: IUsersRepository,
        private readonly hashComparer: IHashComparer,
        private readonly token: IToken
    ) {}

    async auth(authentication: IAuthenticationDTO): Promise<IUser> {
        const account = await this.usersRepository.queryOne({ email: { _equals: authentication.email } })

        if (!account) {
            return null
        }

        const isValid = await this.hashComparer.compare(authentication.password, account.password)

        if (!isValid) {
            return null
        }

        const accessToken = await this.token.encrypt(account.id)
        const with_token = await this.usersRepository.update(account.id, { access_token: accessToken })

        return with_token
    }

    async verifySession(token: string): Promise<IUser> {
        const account = await this.usersRepository.queryOne({ access_token: { _equals: token } })

        if (!account) {
            throw new AuthenticationError('Token inválido.')
        }

        const valid = await this.token.decrypt(token)

        if (!valid) {
            throw new AuthenticationError('Token inválido.')
        }

        return account
    }

    async logout(token: string): Promise<boolean> {
        const account = await this.verifySession(token)

        const updated = await this.usersRepository.update(account.id, { access_token: null })
        return updated ? true : false
    }
}
