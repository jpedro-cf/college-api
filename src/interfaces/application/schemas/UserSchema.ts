import { IUser } from '@/domain/User'

export interface IUserSchema extends IUser {
    access_token?: string
    password: string
    discord_confirmed: boolean
    created_at: Date
}
