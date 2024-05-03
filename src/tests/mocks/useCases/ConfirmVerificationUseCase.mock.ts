import { IUser } from '@/domain/User'
import { IConfirmVerification } from '@/interfaces/domain/useCases/discord/verification/ConfirmVerification'
import { makeFakeUserModel } from '../models/UserModel.mock'

export const makeConfirmVerification = (): IConfirmVerification => {
    class ConfirmVerificationStub implements IConfirmVerification {
        async confirm(discord_username: string): Promise<IUser> {
            const user = makeFakeUserModel()
            user.discord_confirmed = true
            user.discord_username = discord_username
            const { password, ...data } = user
            return Promise.resolve(data)
        }
    }
    return new ConfirmVerificationStub()
}
