import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IUserSchema } from '@/interfaces/application/schemas/UserSchema'
import { ISignUpDTO } from '@/interfaces/domain/useCases/auth/SignUp'
import { UserModel } from '../models/UserModel'

export class DbUsersRepository implements IUsersRepository {
    async getByDiscord(discord_username: string): Promise<IUserSchema> {
        const user = await UserModel.findOne({
            discord_username: discord_username
        })
        return user
    }
    async updateUser(data: IUserSchema): Promise<IUserSchema> {
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: data.id }, // Critério de pesquisa: ID do usuário
            {
                $set: {
                    name: data.name,
                    discord_username: data.discord_username,
                    email: data.email,
                    roles: data.roles,
                    points: data.points,
                    ranking: data.ranking,
                    discord_confirmed: data.discord_confirmed
                }
            },
            { new: true } // Opção para retornar o documento atualizado
        )

        return updatedUser
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
