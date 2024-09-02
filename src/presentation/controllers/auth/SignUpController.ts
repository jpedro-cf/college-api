import { IAuthentication } from '@/interfaces/domain/useCases/auth/Authentication'
import { ISignUp } from '@/interfaces/domain/useCases/auth/SignUp'
import { badRequest, ok, serverError } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'

export class SignUpController implements IController {
    constructor(private readonly signUp: ISignUp, private readonly authentication: IAuthentication) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const requiredFields = ['name', 'email', 'password']
            const { name, email, password } = httpRequest.body

            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new Error(`Campo [${field}] é obrigatório`))
                }
            }

            await this.signUp.execute({
                name,
                email,
                password
            })

            const user = await this.authentication.auth({ email, password })

            if (!user) {
                return serverError(new Error('Ocorreu um erro ao realizar essa operação.'))
            }

            return ok(user, user.access_token)
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}
