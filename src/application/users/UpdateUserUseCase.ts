import { IUser } from '@/domain/User'
import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IUserSchema } from '@/interfaces/application/schemas/UserSchema'
import { IUpdateUser } from '@/interfaces/domain/useCases/users/UpdateUser'
import { NotFoundError } from '@/utils/customErrors'

export class UpdateUserUseCase implements IUpdateUser {
    constructor(private readonly usersRepository: IUsersRepository) {}
    async update(data: Partial<IUserSchema>): Promise<IUser> {
        const user = await this.usersRepository.getByField('_id', data._id.toString())

        if (!user) {
            throw new NotFoundError('Usuário com esse ID não encontrado.')
        }
        const query: IUserSchema = {
            _id: user._id,
            name: data.name ?? user.name,
            email: data.email ?? user.email,
            points: data.points ?? user.points,
            roles: data.roles ?? user.roles,
            access_token: user.access_token,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }

        const updated = await this.usersRepository.updateUser(query)
        return updated
    }
}
