import { IUser } from '@/domain/User'

export interface IUpdateUser {
    execute(id: string, data: Partial<IUser>): Promise<IUser>
}
