import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IUserSchema } from '@/interfaces/application/schemas/UserSchema'
import { ISignUpDTO } from '@/interfaces/domain/useCases/auth/SignUp'
import { UserModel } from '../models/UserModel'
import { ObjectId } from 'mongodb'
import { IGetUsersDTO, IGetUsersResponse } from '@/interfaces/domain/useCases/users/GetUsers'

export class DbUsersRepository implements IUsersRepository {
    async getAll(data: IGetUsersDTO): Promise<IGetUsersResponse> {
        let query = {}

        if (data && data.search) {
            const searchRegex = { $regex: data.search, $options: 'i' }
            query = {
                $or: [{ name: searchRegex }, { email: searchRegex }, { discord_username: searchRegex }]
            }
        }

        const perPage = data.per_page || 10
        const currentPage = data.current_page || 1

        const totalCount = await UserModel.countDocuments(query)

        const totalPages = Math.ceil(totalCount / perPage)

        const users = await UserModel.find(query)
            .select('-password -access_token -discord_confirmed')
            .limit(perPage)
            .skip((currentPage - 1) * perPage)
            .sort(data?.order === 'desc' ? { created_at: -1 } : { created_at: 1 })
            .exec()

        const usersObjects = users.map((category) => category.toObject())
        return { users: usersObjects, pages: totalPages }
    }
    async getByField(field: string, value: string): Promise<IUserSchema> {
        const query = { [field]: value }

        const user = await UserModel.findOne(query)

        if (user) {
            return user.toObject()
        }
        return null
    }

    async getByToken(token: string): Promise<IUserSchema> {
        const user = await UserModel.findOne({
            access_token: token
        })
        if (user) {
            return user.toObject()
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
                    access_token: data.access_token,
                    discord_confirmed: data.discord_confirmed
                }
            },
            { new: true }
        )
        return updatedUser.toObject()
    }
    async create(userData: ISignUpDTO): Promise<IUserSchema> {
        const user = new UserModel({
            name: userData.name,
            discord_username: userData.discord_username,
            email: userData.email,
            password: userData.password,
            created_at: new Date()
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
        if (!user) {
            return null
        }
        return user.toObject()
    }
}
