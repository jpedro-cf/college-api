import { IUser } from '@/domain/User'
import { IUserSchema } from '@/interfaces/application/schemas/UserSchema'

export interface IUpdateUser {
    update(data: Partial<IUserSchema>): Promise<IUser>
}
