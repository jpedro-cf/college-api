import { IUser } from '@/domain/User'

export interface IUserSchema extends IUser {
    password: string
    email_confirmed: boolean
}
