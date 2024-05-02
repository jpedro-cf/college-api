import { IUser } from '@/domain/User'

export interface IConfirmVerification {
    confirm(discord_username: string): Promise<IUser>
}
