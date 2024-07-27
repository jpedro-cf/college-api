import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IGetUsers, IGetUsersDTO, IGetUsersResponse } from '@/interfaces/domain/useCases/users/GetUsers'

export class GetUsersUseCase implements IGetUsers {
    constructor(private readonly usersRepository: IUsersRepository) {}

    async get(data: IGetUsersDTO): Promise<IGetUsersResponse> {
        const response = await this.usersRepository.getAllWithFilters({
            search: data.search ?? '',
            order: data.order ?? 'desc',
            current_page: data.current_page ?? 1,
            per_page: data.per_page ?? 9
        })
        return response
    }
}
