import { IAuthentication } from '@/interfaces/domain/useCases/auth/Authentication'
import { IGetUsers } from '@/interfaces/domain/useCases/users/GetUsers'
import { badRequest, ok, unauthorized } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'
import { AuthenticationError, InvalidParamError, NotFoundError } from '@/utils/customErrors'

export class GetUserByIDController implements IController {
    constructor(private readonly getUsers: IGetUsers, private readonly authentication: IAuthentication) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { id } = httpRequest.params
            if (!id) {
                return badRequest(new InvalidParamError('ID é obrigatório'))
            }

            const current_user = await this.authentication.verifySession(httpRequest.cookies.access_token)

            if ((current_user.id != id && !current_user.roles.includes('admin')) || !current_user) {
                return unauthorized(new AuthenticationError('Você não tem permissão pra visualizar esse usuário.'))
            }

            const user = await this.getUsers.getByID(id)
            if (!user) {
                return badRequest(new NotFoundError('Usuário não encontrado.'))
            }

            return ok(user)
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}
