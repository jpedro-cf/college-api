import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IUserSchema } from '@/interfaces/application/schemas/UserSchema'
import { UserModel } from '../models/UserModel'
import { DbBaseRepository } from './DbBaseRepository'

export class DbUsersRepository extends DbBaseRepository<IUserSchema> implements IUsersRepository {
    constructor() {
        super(UserModel)
    }
}
