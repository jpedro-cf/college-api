import { IAuthentication } from '@/interfaces/domain/useCases/auth/Authentication'
import { IUpdateUser } from '@/interfaces/domain/useCases/users/UpdateUser'
import { badRequest, ok, unauthorized } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'
import { AuthenticationError } from '@/utils/customErrors'

export class UpdateUserController implements IController {
    constructor(private readonly updateUser: IUpdateUser, private readonly authentication: IAuthentication) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { id, name, email } = httpRequest.query

            if (!id) {
                return badRequest(new Error('ID é obrigatório'))
            }

            const current_user = await this.authentication.verifySession(httpRequest.cookies.access_token)
            if (current_user.id != id && !current_user.roles.includes('admin')) {
                return unauthorized(new AuthenticationError('Você não tem permissão pra editar esse usuário.'))
            }

            const updated = await this.updateUser.execute(id, { name, email })
            return ok(updated)
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}
