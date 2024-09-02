import { DeleteUserUseCase } from '@/application/users/DeleteUserUseCase'
import { GetUsersUseCase } from '@/application/users/GetUsersUseCase'
import { UpdateUserUseCase } from '@/application/users/UpdateUserUseCase'
import { DbUsersRepository } from '@/infra/database/repositories/DbUsersRepository'

export const makeUpdateUser = (): UpdateUserUseCase => {
    return new UpdateUserUseCase(new DbUsersRepository())
}

export const makeDeleteUser = (): DeleteUserUseCase => {
    return new DeleteUserUseCase(new DbUsersRepository())
}

export const makeGetUsers = (): GetUsersUseCase => {
    return new GetUsersUseCase(new DbUsersRepository())
}
