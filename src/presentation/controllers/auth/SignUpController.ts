import { ISignUp } from '@/interfaces/domain/useCases/auth/SignUp'
import { badRequest, ok, serverError } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'

export class SignUpController implements IController {
    constructor(private readonly signUp: ISignUp) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const requiredFields = ['name', 'email', 'password', 'password_confirmation']
            const { name, email, password, password_confirmation } = httpRequest.body

            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new Error(`Campo ${field} é obrigatório`))
                }
            }

            if (password != password_confirmation) {
                return badRequest(new Error('As senhas não são iguais'))
            }

            const emailExists = await this.signUp.getUserByEmail(email)

            if (emailExists) {
                return badRequest(new Error('Usuário com esse email já existe'))
            }

            const userCreated = await this.signUp.signUp({
                name,
                email,
                password
            })

            return ok(userCreated)
        } catch (error) {
            return serverError(error)
        }
    }
}
