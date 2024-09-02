import { DeleteUserUseCase } from '@/application/users/DeleteUserUseCase'
import { UpdateUserUseCase } from '@/application/users/UpdateUserUseCase'
import { DbUsersRepository } from '@/infra/database/repositories/DbUsersRepository'

export const makeUpdateUser = (): UpdateUserUseCase => {
    return new UpdateUserUseCase(new DbUsersRepository())
}

export const makeDeleteUser = (): DeleteUserUseCase => {
    return new DeleteUserUseCase(new DbUsersRepository())
}
