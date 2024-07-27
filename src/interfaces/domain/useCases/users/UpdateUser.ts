import { IUser } from '@/domain/User'
import { IUserSchema } from '@/interfaces/application/schemas/UserSchema'

export interface IUpdateUser {
    execute(id: string, data: Partial<IUserSchema>): Promise<IUser>
}
