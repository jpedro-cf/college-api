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
            .sort(data?.order === 'desc' ? { createdAt: -1 } : { createdAt: 1 })
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

    async deleteUser(id: string): Promise<boolean> {
        const deleted = await UserModel.deleteOne({
            _id: new ObjectId(id)
        })
        if (deleted) {
            return true
        }
        return false
    }
    async updateUser(data: IUserSchema): Promise<IUserSchema> {
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: data._id.toString() },
            {
                $set: {
                    name: data.name,
                    email: data.email,
                    roles: data.roles,
                    points: data.points,
                    access_token: data.access_token
                }
            },
            { new: true }
        )
        return updatedUser ? updatedUser.toObject() : null
    }
    async create(userData: ISignUpDTO): Promise<IUserSchema> {
        const user = new UserModel({
            name: userData.name,
            email: userData.email,
            password: userData.password
        })
        const userCreated = await user.save()
        if (userCreated) {
            const userObject = userCreated.toObject()
            return userObject
        }
        return null
    }
}
