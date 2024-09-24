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
        jest.spyOn(repository, 'queryMany').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.execute({})
        expect(res).rejects.toThrow()
    })
    test('should return a list of users on success', async () => {
        const { sut } = makeSut()

        const res = await sut.execute({})
        expect(res.users.length).toBeGreaterThan(0)
        expect(res.pages).toBeGreaterThan(0)
    })

    test('should return null if repository returns null', async () => {
        const { sut, repository } = makeSut()
        jest.spyOn(repository, 'queryOne').mockReturnValueOnce(Promise.resolve(null))
        const res = await sut.getByID('123')
        expect(res).toBeNull()
    })
    test('should return a user by id', async () => {
        const { sut } = makeSut()

        const res = await sut.getByID('123')
        expect(res.id).toBeTruthy()
    })
})
