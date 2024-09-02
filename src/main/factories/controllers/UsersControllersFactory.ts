import { GetUsersController } from '@/presentation/controllers/users/GetUsersController'
import { makeGetUsers, makeUpdateUser } from '../use-cases/UsersUseCasesFactory'
import { UpdateUserController } from '@/presentation/controllers/users/UpdateUserController'
import { makeAuthUseCase } from '../use-cases/AuthUseCasesFactory'

export const makeGetUsersController = (): GetUsersController => {
    return new GetUsersController(makeGetUsers())
}

export const makeUpdateUsersController = (): UpdateUserController => {
    return new UpdateUserController(makeUpdateUser(), makeAuthUseCase())
}
