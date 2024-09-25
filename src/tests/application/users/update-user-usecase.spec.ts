import { UpdateUserUseCase } from '@/application/users/UpdateUserUseCase'
import { makeFakeHasher } from '@/tests/mocks/cryptography/Hasher.mock'
import { makeFakeUserModel } from '@/tests/mocks/models/UserModel.mock'
import { makeFakeUsersRepository } from '@/tests/mocks/repositories/UsersRepository.mock'

const makeSut = () => {
    const repository = makeFakeUsersRepository()
    const hasher = makeFakeHasher()
    const sut = new UpdateUserUseCase(repository, hasher)
    return { sut, repository, hasher }
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

    test('should call hasher if password provided', async () => {
        const { sut, hasher } = makeSut()

        const spy = jest.spyOn(hasher, 'hash')
        await sut.execute('123', { password: '123' })
        expect(spy).toHaveBeenCalled()
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
