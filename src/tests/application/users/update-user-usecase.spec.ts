import { UpdateUserUseCase } from '@/application/users/UpdateUserUseCase'
import { makeFakeUserModel } from '@/tests/mocks/models/UserModel.mock'
import { makeFakeUsersRepository } from '@/tests/mocks/repositories/UsersRepository.mock'

const makeSut = () => {
    const repository = makeFakeUsersRepository()
    const sut = new UpdateUserUseCase(repository)
    return { sut, repository }
}

describe('UpdateUserUseCase', () => {
    test('should throw if user does not exist', async () => {
        const { sut, repository } = makeSut()

        jest.spyOn(repository, 'getByField').mockReturnValueOnce(Promise.resolve(null))
        const res = sut.update({})
        expect(res).rejects.toThrow()
    })

    test('should updated a user on success ', async () => {
        const { sut, repository } = makeSut()

        const user = makeFakeUserModel()
        user.roles = ['admin']

        jest.spyOn(repository, 'getByField').mockReturnValueOnce(Promise.resolve(user))

        const user2 = makeFakeUserModel()
        user2._id = '12344556'
        user2.roles = ['manager']

        const res = await sut.update(user2)
        expect(res.roles).toContain('manager')
    })
})
