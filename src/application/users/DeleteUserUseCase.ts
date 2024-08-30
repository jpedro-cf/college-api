import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IDeleteUser } from '@/interfaces/domain/useCases/users/DeleteUser'
import { NotFoundError } from '@/utils/customErrors'

export class DeleteUserUseCase implements IDeleteUser {
    constructor(private readonly usersRepository: IUsersRepository) {}
    async execute(id: string): Promise<boolean> {
        const exists = await this.usersRepository.queryOne({ id: { _equals: id } })
        if (!exists) {
            throw new NotFoundError('Usuário com esse ID não existe.')
        }

        const deleted = await this.usersRepository.delete(id)
        return deleted ? true : false
    }
}
