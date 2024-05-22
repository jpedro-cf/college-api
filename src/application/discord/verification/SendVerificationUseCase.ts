import { IDiscordUsersService } from '@/interfaces/application/discord/DiscordUsersService'
import { IDiscordVerificationService } from '@/interfaces/application/discord/DiscordVerificationService'
import { ISendVerification } from '@/interfaces/domain/useCases/discord/verification/SendVerification'
import { NotFoundError } from '@/utils/customErrors'

export class SendVerificationUseCase implements ISendVerification {
    constructor(
        private readonly discordVerification: IDiscordVerificationService,
        private readonly discordUsersService: IDiscordUsersService
    ) {}
    async send(username: string): Promise<boolean> {
        const discordUser = await this.discordUsersService.getByUsername(username)
        if (!discordUser) {
            throw new NotFoundError('Usuário do discord não existe em nenhum de nossos servidores.')
        }
        const sent = await this.discordVerification.sendVerificationMessage(discordUser.id)
        return sent
    }
}
