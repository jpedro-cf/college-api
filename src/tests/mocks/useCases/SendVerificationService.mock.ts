import { ISendVerification } from '@/interfaces/domain/useCases/discord/verification/SendVerification'

export const makeSendVerificationService = (): ISendVerification => {
    class SendVerificationServiceStub implements ISendVerification {
        async send(discord_user_id: string): Promise<boolean> {
            return Promise.resolve(true)
        }
    }
    return new SendVerificationServiceStub()
}
