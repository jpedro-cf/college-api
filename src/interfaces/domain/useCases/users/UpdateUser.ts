import { IUser } from '@/domain/User'
import { IUserSchema } from '@/interfaces/application/schemas/UserSchema'

export interface IUpdateUser {
    update(current_user_id: string, data: Partial<IUserSchema>): Promise<IUser>
}
