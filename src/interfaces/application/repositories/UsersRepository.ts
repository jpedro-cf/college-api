import { IBaseRepository } from './BaseRepository'
import { IUser } from '@/domain/User'

export interface IUsersRepository extends IBaseRepository<IUser> {}
