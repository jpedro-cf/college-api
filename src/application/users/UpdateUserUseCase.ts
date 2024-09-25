import { IUser } from '@/domain/User'
import { IHasher } from '@/interfaces/application/cryptography/Hasher'
import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IUpdateUser } from '@/interfaces/domain/useCases/users/UpdateUser'
import { AlreadyInUseError, NotFoundError } from '@/utils/customErrors'

export class UpdateUserUseCase implements IUpdateUser {
    constructor(private readonly usersRepository: IUsersRepository, private readonly hasher: IHasher) {}
    async execute(id: string, data: Partial<IUser>): Promise<IUser> {
        const user = await this.usersRepository.queryOne({ id: { _equals: id } })

        if (!user) {
            throw new NotFoundError('Usuário com esse ID não encontrado.')
        }

        if (data.email) {
            if (await this.usersRepository.queryOne({ email: { _equals: data.email } })) {
                throw new AlreadyInUseError('Email já cadastrado.')
            }
        }
        if (data.password) {
            const hashedPassword = await this.hasher.hash(data.password)
            data.password = hashedPassword
        }

        const updated = await this.usersRepository.update(id, data)
        return updated
    }
}
