import { GetUsersUseCase } from '@/application/users/GetUsersUseCase'
import { makeFakeUsersRepository } from '@/tests/mocks/repositories/UsersRepository.mock'

const makeSut = () => {
    const repository = makeFakeUsersRepository()
    const sut = new GetUsersUseCase(repository)
    return { sut, repository }
}

describe('GetUsersUseCase', () => {
    test('should throw if repository throws', async () => {
        const { sut, repository } = makeSut()
        jest.spyOn(repository, 'getAll').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.get({})
        expect(res).rejects.toThrow()
    })
    test('should return a list of users on success', async () => {
        const { sut } = makeSut()

        const res = await sut.get({})
        expect(res.users.length).toBeGreaterThan(0)
        expect(res.pages).toBeGreaterThan(0)
    })
})
