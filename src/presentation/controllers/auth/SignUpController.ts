import { IDiscordUsersService } from '@/interfaces/application/discord/DiscordUsersService'
import { ISignUp } from '@/interfaces/domain/useCases/auth/SignUp'
import { IGetDiscordUserByUserName } from '@/interfaces/domain/useCases/discord/users/GetUserByUserName'
import { badRequest, ok, serverError } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'

export class SignUpController implements IController {
    constructor(private readonly signUp: ISignUp, private readonly getDiscordUserByName: IGetDiscordUserByUserName) {}
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const requiredFields = ['name', 'email', 'password', 'password_confirmation']
            const { name, email, password, password_confirmation, discord_username } = httpRequest.body

            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new Error(`Campo ${field} é obrigatório`))
                }
            }

            if (discord_username) {
                const discord_user = await this.getDiscordUserByName.get(discord_username)
                if (!discord_user) {
                    return badRequest(new Error('Usuário do discord com esse username não existe.'))
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
