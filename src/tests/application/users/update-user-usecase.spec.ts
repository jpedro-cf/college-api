import { UpdateUserUseCase } from '@/application/users/UpdateUserUseCase'
import { makeFakeUserModel } from '@/tests/mocks/models/UserModel.mock'
import { makeFakeUsersRepository } from '@/tests/mocks/repositories/UsersRepository.mock'

const makeSut = () => {
    const repository = makeFakeUsersRepository()
    const sut = new UpdateUserUseCase(repository)
    return { sut, repository }
}

describe('UpdateUserUseCase', () => {
    test('should throw if repository throws', async () => {
        const { sut, repository } = makeSut()

        jest.spyOn(repository, 'getByField').mockReturnValueOnce(Promise.reject(new Error('')))
        const res = sut.update('id', {})
        expect(res).rejects.toThrow()
    })
    test('should throw if get by id throws', async () => {
        const { sut, repository } = makeSut()

        jest.spyOn(repository, 'getByField').mockReturnValueOnce(Promise.resolve(null))
        const res = sut.update('id', {})
        expect(res).rejects.toThrow()
    })
    test('should updated a user on success ( not admin )', async () => {
        const { sut } = makeSut()
        const user = makeFakeUserModel()
        user.name = 'joao'
        user.roles = ['admin']

        const res = await sut.update('id', user)
        expect(res.name).toBe('joao')
    })
    test('should updated a user on success ( admin )', async () => {
        const { sut, repository } = makeSut()

        const user = makeFakeUserModel()
        user.roles = ['admin']

        jest.spyOn(repository, 'getByField').mockReturnValueOnce(Promise.resolve(user))

        const user2 = makeFakeUserModel()
        user2.id = '12344556'
        user2.roles = ['manager']

        const res = await sut.update(user.id, user2)
        expect(res.roles).toContain('manager')
    })
})
