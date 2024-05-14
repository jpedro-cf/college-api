import { badRequest, forbidden, serverError, unauthorized } from '@/interfaces/presentation/codes'
import { IHttpResponse } from '@/interfaces/presentation/http'

const errorResponseMap: { [key: string]: (error: Error) => IHttpResponse } = {
    NotFoundError: (error) => badRequest(error),
    MissingParamError: (error) => badRequest(error),
    InvalidParamError: (error) => badRequest(error),
    PermissionError: (error) => unauthorized(error),
    AlreadyInUseError: (error) => badRequest(error)
}

export const mapErrorToHttpResponse = (error: Error): IHttpResponse => {
    const errorFunction = errorResponseMap[error.name]

    if (errorFunction) {
        return errorFunction(error)
    }

    return serverError(error)
}
