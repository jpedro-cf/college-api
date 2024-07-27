import { IUser } from '@/domain/User'
import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IUserSchema } from '@/interfaces/application/schemas/UserSchema'
import { IUpdateUser } from '@/interfaces/domain/useCases/users/UpdateUser'
import { AlreadyInUseError, NotFoundError } from '@/utils/customErrors'

export class UpdateUserUseCase implements IUpdateUser {
    constructor(private readonly usersRepository: IUsersRepository) {}
    async execute(id: string, data: Partial<IUserSchema>): Promise<IUser> {
        console.log(data)
        const user = await this.usersRepository.getOneByFields({ _id: id })

        if (!user) {
            throw new NotFoundError('Usuário com esse ID não encontrado.')
        }

        if (data.email) {
            if (await this.usersRepository.getOneByFields({ email: data.email })) {
                throw new AlreadyInUseError('Email já cadastrado.')
            }
        }

        const updated = await this.usersRepository.update(id, data)
        return updated
    }
}
