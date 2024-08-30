import { IGetUsers } from '@/interfaces/domain/useCases/users/GetUsers'
import { ok } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'

export class GetUsersController implements IController {
    constructor(private readonly getUsers: IGetUsers) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const users = await this.getUsers.execute({
                search: httpRequest.query.search ?? '',
                order: httpRequest.query.order ?? 'desc',
                per_page: httpRequest.query.per_page ?? 9,
                current_page: httpRequest.query.current_page ?? 1
            })
            return ok(users)
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}
