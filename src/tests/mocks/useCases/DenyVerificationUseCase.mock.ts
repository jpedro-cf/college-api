import { IDenyVerification } from '@/interfaces/domain/useCases/discord/verification/DenyVerification'

export const makeDenyVerification = (): IDenyVerification => {
    class DenyVerificationStub implements IDenyVerification {
        async deny(discord_username: string): Promise<boolean> {
            return Promise.resolve(true)
        }
    }
    return new DenyVerificationStub()
}
