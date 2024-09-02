import { AuthenticationUseCase } from '@/application/auth/AuthenticationUseCase'
import { SignUpUseCase } from '@/application/auth/SignUpUseCase'
import { BcryptAdapter } from '@/infra/cryptography/Bcrypt'
import { JWTAdapter } from '@/infra/cryptography/Jwt'
import { DbUsersRepository } from '@/infra/database/repositories/DbUsersRepository'

export const makeAuthUseCase = (): AuthenticationUseCase => {
    return new AuthenticationUseCase(new DbUsersRepository(), new BcryptAdapter(8), new JWTAdapter())
}

export const makeSignUpCase = (): SignUpUseCase => {
    return new SignUpUseCase(new DbUsersRepository(), new BcryptAdapter(8))
}
