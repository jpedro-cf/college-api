import { IGetByToken } from '@/interfaces/domain/useCases/auth/GetByToken'
import { badRequest, ok, serverError } from '@/interfaces/presentation/codes'
import { IController } from '@/interfaces/presentation/controller'
import { IHttpRequest, IHttpResponse } from '@/interfaces/presentation/http'

export class CurrentUserInfoController implements IController {
    constructor(private readonly getByToken: IGetByToken) {}

    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const { access_token } = httpRequest.cookies
            console.log('TOKEN AQUI --------:' + access_token)
            const user = await this.getByToken.get(access_token)

            if (!user) {
                return badRequest(new Error('Não foi encontrado nenhum usuário com esse token.'))
            }

            return ok(user)
        } catch (error) {
            return serverError(error)
        }
    }
}
