import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { UserModel } from '../models/UserModel'
import { DbBaseRepository } from './DbBaseRepository'
import { IUser } from '@/domain/User'

export class DbUsersRepository extends DbBaseRepository<IUser> implements IUsersRepository {
    constructor() {
        super(UserModel)
    }
}
