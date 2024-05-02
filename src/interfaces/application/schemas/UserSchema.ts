import { IUser } from '@/domain/User'

export interface IUserSchema extends IUser {
    password: string
    discord_confirmed: boolean
}
