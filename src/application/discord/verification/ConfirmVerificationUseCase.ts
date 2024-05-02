import { IUser } from '@/domain/User'
import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IConfirmVerification } from '@/interfaces/domain/useCases/discord/verification/ConfirmVerification'

export class ConfirmVerificationUseCase implements IConfirmVerification {
    constructor(private readonly usersRepository: IUsersRepository) {}
    async confirm(discord_username: string): Promise<IUser> {
        const user = await this.usersRepository.getByDiscord(discord_username)

        if (!user) {
            throw new Error('Nome do discord não encontrado.')
        }
        user.discord_confirmed = true
        user.discord_username = discord_username

        const updateUser = await this.usersRepository.updateUser(user)

        const { password, discord_confirmed, ...data } = updateUser
        return data
    }
}
