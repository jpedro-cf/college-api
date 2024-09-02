import { AuthenticationController } from '@/presentation/controllers/auth/AuthenticationController'
import { makeAuthUseCase, makeSignUpCase } from '../use-cases/AuthUseCasesFactory'
import { CurrentUserInfoController } from '@/presentation/controllers/auth/CurrentUserInfoController'
import { SignUpController } from '@/presentation/controllers/auth/SignUpController'

export const makeAuthController = (): AuthenticationController => {
    return new AuthenticationController(makeAuthUseCase())
}

export const makeCurrentUserController = (): CurrentUserInfoController => {
    return new CurrentUserInfoController(makeAuthUseCase())
}

export const makeSignUpController = (): SignUpController => {
    return new SignUpController(makeSignUpCase(), makeAuthUseCase())
}
