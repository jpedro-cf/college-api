import { IUser } from '@/domain/User'
import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IGetByToken } from '@/interfaces/domain/useCases/auth/GetByToken'

export class GetByTokenUseCase implements IGetByToken {
    constructor(private readonly usersRepository: IUsersRepository) {}

    async get(token: string): Promise<IUser> {
        const user = await this.usersRepository.getByToken(token)
        return user
    }
}
