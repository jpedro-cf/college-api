import { IUser } from '@/domain/User'

export interface IUserSchema extends IUser {
    access_token?: string
    password: string
    createdAt: Date
    updatedAt: Date
}
