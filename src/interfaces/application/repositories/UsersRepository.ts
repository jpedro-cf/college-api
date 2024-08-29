import { IUserSchema } from '../schemas/UserSchema'
import { IGetUsersDTO, IGetUsersResponse } from '@/interfaces/domain/useCases/users/GetUsers'
import { IBaseRepository } from './BaseRepository'

export interface IUsersRepository extends IBaseRepository<IUserSchema> {}
