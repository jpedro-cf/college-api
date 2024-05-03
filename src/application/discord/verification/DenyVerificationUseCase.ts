import { IUser } from '@/domain/User'
import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IDenyVerification } from '@/interfaces/domain/useCases/discord/verification/DenyVerification'

export class DenyVerificationUseCase implements IDenyVerification {
    constructor(private readonly usersRepository: IUsersRepository) {}
    async deny(discord_username: string): Promise<boolean> {
        const user = await this.usersRepository.getByDiscord(discord_username)

        if (!user) {
            throw new Error('Nome do discord não encontrado para deleção do usuário.')
        }
        console.log(user.id)
        const deleted = await this.usersRepository.deleteUser(user.id)
        return deleted
    }
}
