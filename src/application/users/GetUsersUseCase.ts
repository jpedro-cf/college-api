import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { IGetUsers, IGetUsersDTO, IGetUsersResponse } from '@/interfaces/domain/useCases/users/GetUsers'

export class GetUsersUseCase implements IGetUsers {
    constructor(private readonly usersRepository: IUsersRepository) {}

    async execute(data: IGetUsersDTO): Promise<IGetUsersResponse> {
        const response = await this.usersRepository.queryMany({
            query: {
                name: { _contains: data.search ?? '' }
            },
            order: {
                by: 'createdAt',
                direction: data.order ?? 'desc'
            },
            pagination: {
                page: data.current_page ?? 1,
                per_page: data.per_page ?? 9
            }
        })
        return {
            users: response.items,
            pages: response.total_pages
        }
    }
}
