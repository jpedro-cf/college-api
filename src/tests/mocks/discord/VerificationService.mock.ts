import { IDiscordVerificationService } from '@/interfaces/application/discord/DiscordVerificationService'

export const makeFakeSendVerification = (): IDiscordVerificationService => {
    class SendVerificationStub implements IDiscordVerificationService {
        async sendVerificationMessage(user_id: string): Promise<boolean> {
            return Promise.resolve(true)
        }
    }
    return new SendVerificationStub()
}
