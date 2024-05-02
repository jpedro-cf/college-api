import { IDiscordVerificationService } from '@/interfaces/application/discord/DiscordVerificationService'
import { ISendVerification } from '@/interfaces/domain/useCases/discord/verification/SendVerification'

export class SendVerificationUseCase implements ISendVerification {
    constructor(private readonly discordVerification: IDiscordVerificationService) {}
    async send(discord_user_id: string): Promise<boolean> {
        const sent = await this.discordVerification.sendVerificationMessage(discord_user_id)
        return sent
    }
}
