import { IUser } from '@/domain/User'
import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IGetByToken } from '@/interfaces/domain/useCases/auth/GetByToken'

export class GetByTokenUseCase implements IGetByToken {
    constructor(private readonly usersRepository: IUsersRepository) {}

    async get(token: string): Promise<IUser> {
        const data = await this.usersRepository.getByToken(token)
        const { password, discord_confirmed, ...user } = data
        return user
    }
}
