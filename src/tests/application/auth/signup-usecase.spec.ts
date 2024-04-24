import { SignUpUseCase } from '@/application/auth/SignUpUseCase'
import { IHasher } from '@/interfaces/application/cryptography/Hasher'
import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { makeFakeHasher } from '@/tests/infra/cryptography/Hasher.mock'
import { makeFakeUsersRepository } from '@/tests/infra/repositories/UsersRepository.mock'
import { makeFakeSignUpData } from '@/tests/mocks/entities/User.mock'

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

        jest.spyOn(usersRepository, 'create').mockReturnValueOnce(Promise.reject(new Error('')))

        const promise = sut.signUp(makeFakeSignUpData())
        await expect(promise).rejects.toThrow()
    })

    test('Should throw if UsersRepository throws', async () => {
        const { sut, hasher } = makeSut()

        jest.spyOn(hasher, 'hash').mockReturnValueOnce(Promise.reject(new Error('')))

        const promise = sut.signUp(makeFakeSignUpData())
        await expect(promise).rejects.toThrow()
    })
})
