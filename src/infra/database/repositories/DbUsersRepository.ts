import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IUserSchema } from '@/interfaces/application/schemas/UserSchema'
import { ISignUpDTO } from '@/interfaces/domain/useCases/auth/SignUp'
import { UserModel } from '../models/UserModel'

export class DbUsersRepository implements IUsersRepository {
    async getByDiscord(discord_username: string): Promise<IUserSchema> {
        throw new Error('Method not implemented.')
    }
    async updateUser(data: IUserSchema): Promise<IUserSchema> {
        throw new Error('Method not implemented.')
    }
    async create(userData: ISignUpDTO): Promise<IUserSchema> {
        const user = new UserModel({
            name: userData.name,
            email: userData.email,
            password: userData.password
        })
        const userCreated = await user.save()
        if (userCreated) {
            return userCreated.toObject()
        }
    }
    async getByEmail(email: string): Promise<IUserSchema> {
        const user = await UserModel.findOne({
            email: email
        })
        return user
    }
}
