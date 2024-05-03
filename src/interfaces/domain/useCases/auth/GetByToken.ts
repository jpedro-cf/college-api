import { IUser } from '@/domain/User'

export interface IGetByToken {
    get(token: string): Promise<IUser>
}
