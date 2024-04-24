import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IUserSchema } from '@/interfaces/application/schemas/UserSchema'
import { ISignUpDTO } from '@/interfaces/domain/useCases/auth/SignUp'
import { UserModel } from '../models/UserModel'

export class DbUsersRepository implements IUsersRepository {
    async create(userData: ISignUpDTO): Promise<IUserSchema> {
        const user = new UserModel({
            name: userData.name,
            email: userData.email,
            password: userData.password
        })
        const userCreated = await user.save()
        if (userCreated) {
            return userCreated
        }
    }
}
