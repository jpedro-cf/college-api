import { SignUpUseCase } from '@/application/auth/SignUpUseCase'
import { IHasher } from '@/interfaces/application/cryptography/Hasher'
import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { makeFakeHasher } from '@/tests/mocks/cryptography/Hasher.mock'
import { makeFakeUsersRepository } from '@/tests/mocks/repositories/UsersRepository.mock'
import { makeFakeSignUpData } from '@/tests/mocks/entities/User.mock'
import { makeFakeUserModel } from '@/tests/mocks/models/UserModel.mock'
import { AlreadyInUseError } from '@/utils/customErrors'

interface ISut {
    sut: SignUpUseCase
    usersRepository: IUsersRepository
    hasher: IHasher
}

const makeSut = (): ISut => {
    const usersRepository = makeFakeUsersRepository()
    const hasher = makeFakeHasher()
    const sut = new SignUpUseCase(usersRepository, hasher)

    return { sut, usersRepository, hasher }
}

describe('SignUp usecase', () => {
    test('Should throw if UsersRepository throws', async () => {
        const { sut, usersRepository } = makeSut()

        jest.spyOn(usersRepository, 'getByField').mockReturnValueOnce(Promise.resolve(null))
        jest.spyOn(usersRepository, 'create').mockReturnValueOnce(Promise.reject(new Error('')))

        const promise = sut.signUp(makeFakeSignUpData())
        expect(promise).rejects.toThrow()
    })

    test('Should throw if email in use', async () => {
        const { sut } = makeSut()

        const promise = sut.signUp(makeFakeSignUpData())
        expect(promise).rejects.toThrow()
    })

    test('Should throw if hasher throws', async () => {
        const { sut, hasher, usersRepository } = makeSut()

        jest.spyOn(usersRepository, 'getByField').mockReturnValueOnce(Promise.resolve(null))
        jest.spyOn(hasher, 'hash').mockReturnValueOnce(Promise.reject(new Error('')))

        const promise = sut.signUp(makeFakeSignUpData())
        expect(promise).rejects.toThrow()
    })

    test('Should return an User on success', async () => {
        const { sut, usersRepository } = makeSut()

        jest.spyOn(usersRepository, 'getByField').mockReturnValueOnce(Promise.resolve(null))
        const response = await sut.signUp(makeFakeSignUpData())
        expect(response._id).toBeTruthy()
    })
})
