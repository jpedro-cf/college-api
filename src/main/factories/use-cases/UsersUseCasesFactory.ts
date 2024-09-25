import { DeleteUserUseCase } from '@/application/users/DeleteUserUseCase'
import { GetUsersUseCase } from '@/application/users/GetUsersUseCase'
import { UpdateUserUseCase } from '@/application/users/UpdateUserUseCase'
import { BcryptAdapter } from '@/infra/cryptography/Bcrypt'
import { DbUsersRepository } from '@/infra/database/repositories/DbUsersRepository'

export const makeUpdateUser = (): UpdateUserUseCase => {
    return new UpdateUserUseCase(new DbUsersRepository(), new BcryptAdapter(8))
}

export const makeDeleteUser = (): DeleteUserUseCase => {
    return new DeleteUserUseCase(new DbUsersRepository())
}

export const makeGetUsers = (): GetUsersUseCase => {
    return new GetUsersUseCase(new DbUsersRepository())
}
