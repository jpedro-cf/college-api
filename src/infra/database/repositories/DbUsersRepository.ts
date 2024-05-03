import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IUserSchema } from '@/interfaces/application/schemas/UserSchema'
import { ISignUpDTO } from '@/interfaces/domain/useCases/auth/SignUp'
import { UserModel } from '../models/UserModel'
import { ObjectId } from 'mongodb'

export class DbUsersRepository implements IUsersRepository {
    async getByToken(token: string): Promise<IUserSchema> {
        const user = await UserModel.findOne({
            access_token: token
        })
        if (user) {
            return {
                id: user.id.toString(),
                name: user.name,
                discord_username: user.discord_username,
                email: user.email,
                roles: user.roles,
                password: user.password,
                points: user.points,
                discord_confirmed: user.discord_confirmed
            }
        }
        return null
    }
    async deleteUser(id: string): Promise<boolean> {
        const deleted = await UserModel.deleteOne({
            _id: new ObjectId(id)
        })
        if (deleted) {
            return true
        }
        return false
    }
    async getByDiscord(discord_username: string): Promise<IUserSchema> {
        const user = await UserModel.findOne({
            discord_username: discord_username
        })
        return user
    }
    async updateUser(data: IUserSchema): Promise<IUserSchema> {
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: data.id },
            {
                $set: {
                    name: data.name,
                    discord_username: data.discord_username,
                    email: data.email,
                    roles: data.roles,
                    points: data.points,
                    discord_confirmed: data.discord_confirmed
                }
            },
            { new: true }
        )
        return {
            id: updatedUser._id.toString(),
            name: updatedUser.name,
            discord_username: updatedUser.discord_username,
            email: updatedUser.email,
            roles: updatedUser.roles,
            password: updatedUser.password,
            points: updatedUser.points,
            discord_confirmed: updatedUser.discord_confirmed
        }
    }
    async create(userData: ISignUpDTO): Promise<IUserSchema> {
        const user = new UserModel({
            name: userData.name,
            discord_username: userData.discord_username,
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
        return {
            id: user._id.toString(),
            name: user.name,
            discord_username: user.discord_username,
            email: user.email,
            roles: user.roles,
            password: user.password,
            points: user.points,
            discord_confirmed: user.discord_confirmed
        }
    }
}
