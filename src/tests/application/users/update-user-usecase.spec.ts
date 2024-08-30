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

        jest.spyOn(repository, 'queryOne').mockReturnValueOnce(Promise.resolve(null))
        const res = sut.execute('123', {})
        expect(res).rejects.toThrow()
    })

    test('should throw if field in use', async () => {
        const { sut, repository } = makeSut()

        jest.spyOn(repository, 'queryOne').mockReturnValueOnce(Promise.resolve(makeFakeUserModel()))
        const res = sut.execute('123', { email: '123' })
        expect(res).rejects.toThrow()
    })

    test('should updated a user on success ', async () => {
        const { sut, repository } = makeSut()

        const user = makeFakeUserModel()

        jest.spyOn(repository, 'queryOne').mockReturnValueOnce(Promise.resolve(user))
        jest.spyOn(repository, 'queryOne').mockReturnValueOnce(null)

        const res = await sut.execute('123', { email: '123' })
        expect(res.id).toBeTruthy()
    })
})
