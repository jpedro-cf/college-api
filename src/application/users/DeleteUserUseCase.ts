import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IDeleteUser } from '@/interfaces/domain/useCases/users/DeleteUser'
import { NotFoundError } from '@/utils/customErrors'

export class DeleteUserUseCase implements IDeleteUser {
    constructor(private readonly usersRepository: IUsersRepository) {}
    async delete(id: string): Promise<boolean> {
        const exists = await this.usersRepository.getByField('_id', id)
        if (!exists) {
            throw new NotFoundError('Usuário com esse ID não existe.')
        }

        const deleted = await this.usersRepository.deleteUser(id)
        return deleted ? true : false
    }
}
