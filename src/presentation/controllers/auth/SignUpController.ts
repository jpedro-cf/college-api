import { IAuthentication } from '@/interfaces/domain/useCases/auth/Authentication'
import { ISignUp } from '@/interfaces/domain/useCases/auth/SignUp'
import { ISendVerification } from '@/interfaces/domain/useCases/discord/verification/SendVerification'
import { badRequest, ok, serverError } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'
import { mapErrorToHttpResponse } from '@/presentation/helpers/ErrorMapper'

export class SignUpController implements IController {
    constructor(
        private readonly signUp: ISignUp,
        private readonly sendVerificationMessage: ISendVerification,
        private readonly authentication: IAuthentication
    ) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const requiredFields = ['name', 'email', 'password']
            const { name, email, password, discord_username } = httpRequest.body

            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new Error(`Campo [${field}] é obrigatório`))
                }
            }
            const emailExists = await this.signUp.getUserByEmail(email)

            if (emailExists) {
                return badRequest(new Error('Usuário com esse email já existe'))
            }

            if (discord_username) {
                const verificationMessageSent = await this.sendVerificationMessage.send(discord_username)

                if (!verificationMessageSent) {
                    return serverError(new Error('Erro ao enviar mensagem de verificação para o discord.'))
                }
            }

            const userCreated = await this.signUp.signUp({
                name,
                discord_username: discord_username ? discord_username : null,
                email,
                password
            })

            let access_token = null

            if (!discord_username) {
                access_token = await this.authentication.auth({ email, password })
            }
            return ok(
                discord_username ? 'Mensagem de verificação do discord enviada!' : userCreated,
                access_token?.token
            )
        } catch (error) {
            return mapErrorToHttpResponse(error)
        }
    }
}
