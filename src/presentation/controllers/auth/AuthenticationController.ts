import { IAuthentication } from '@/interfaces/domain/useCases/auth/Authentication'
import { badRequest, forbidden, ok, serverError } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'

export class AuthenticationController implements IController {
    constructor(private readonly authentication: IAuthentication) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { email, password } = httpRequest.body

            if (!email || !password) {
                return badRequest(new Error('Email e Senha são obrigatórios.'))
            }

            const user = await this.authentication.auth({ email, password })

            if (!user) {
                return forbidden(new Error('Credenciais incorretas ou conta com esse email não existe.'))
            }
            return ok(user, user.access_token)
        } catch (error) {
            return serverError(error)
        }
    }
}
