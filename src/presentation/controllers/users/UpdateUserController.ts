import { IGetByToken } from '@/interfaces/domain/useCases/auth/GetByToken'
import { IUpdateUser } from '@/interfaces/domain/useCases/users/UpdateUser'
import { badRequest, ok, unauthorized } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'

export class UpdateUserController implements IController {
    constructor(private readonly getByToken: IGetByToken, private readonly updateUser: IUpdateUser) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { access_token } = httpRequest.cookies

            if (!access_token) {
                return unauthorized(new Error('Sem permissões para realizar essa operação'))
            }

            const current_user = await this.getByToken.get(access_token)

            if (!current_user) {
                return unauthorized(new Error('Sem permissões para realizar essa operação'))
            }

            const { id, name, email, password, roles } = httpRequest.query

            if (!id) {
                return badRequest(new Error('ID é obrigatório'))
            }
            console.log(current_user)
            if (!current_user.roles.includes('admin') && id != current_user.id) {
                return unauthorized(new Error('Sem permissões para realizar essa operação'))
            }

            const updated = await this.updateUser.update(current_user.id, { id, name, email, password, roles })
            return ok(updated)
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}
