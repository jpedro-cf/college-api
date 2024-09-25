import { IAuthentication } from '@/interfaces/domain/useCases/auth/Authentication'
import { IUpdateUser } from '@/interfaces/domain/useCases/users/UpdateUser'
import { badRequest, ok, unauthorized } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'
import { AuthenticationError, InvalidParamError } from '@/utils/customErrors'

export class UpdateUserController implements IController {
    constructor(private readonly updateUser: IUpdateUser, private readonly authentication: IAuthentication) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { id } = httpRequest.params
            const { name, email, roles, password } = httpRequest.body

            if (!id) {
                return badRequest(new InvalidParamError('ID é obrigatório'))
            }

            const current_user = await this.authentication.verifySession(httpRequest.cookies.access_token)

            if ((current_user.id != id && !current_user.roles.includes('admin')) || !current_user) {
                return unauthorized(new AuthenticationError('Você não tem permissão pra editar esse usuário.'))
            }

            if (roles && !current_user.roles.includes('admin')) {
                return unauthorized(new AuthenticationError('Você não tem permissão pra editar os cargos do usuário.'))
            }

            const updated = await this.updateUser.execute(id, { name, email, roles, password })
            return ok(updated)
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}
