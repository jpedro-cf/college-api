import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IUserSchema } from '@/interfaces/application/schemas/UserSchema'
import { ISignUpDTO } from '@/interfaces/domain/useCases/auth/SignUp'
import { UserModel } from '../models/UserModel'
import { ObjectId } from 'mongodb'
import { IGetUsersDTO, IGetUsersResponse } from '@/interfaces/domain/useCases/users/GetUsers'
import { DbBaseRepository } from './DbBaseRepository'

export class DbUsersRepository extends DbBaseRepository<IUserSchema> implements IUsersRepository {
    async getAllWithFilters(data: IGetUsersDTO): Promise<IGetUsersResponse> {
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
}
