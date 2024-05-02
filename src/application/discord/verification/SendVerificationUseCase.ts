import { ISendVerification } from '@/interfaces/domain/useCases/discord/verification/SendVerification'

export class SendVerificationUseCase implements ISendVerification {
    async send(discord_user_id: string): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
}
