import { IGetByToken } from '@/interfaces/domain/useCases/auth/GetByToken'
import { IUpdateUser } from '@/interfaces/domain/useCases/users/UpdateUser'
import { badRequest, ok, unauthorized } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'

export class UpdateUserController implements IController {
    constructor(private readonly updateUser: IUpdateUser) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { id, name, email, roles } = httpRequest.query

            if (!id) {
                return badRequest(new Error('ID é obrigatório'))
            }

            const updated = await this.updateUser.update({ _id: id, name, email, roles })
            return ok(updated)
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}
