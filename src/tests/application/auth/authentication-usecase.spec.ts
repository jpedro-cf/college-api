import { AuthenticationUseCase } from '@/application/auth/AuthenticationUseCase'
import { IHashComparer } from '@/interfaces/application/cryptography/Hasher'
import { IToken } from '@/interfaces/application/cryptography/Token'
import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { makeFakeHasherCompare } from '@/tests/mocks/cryptography/Hasher.mock'
import { makeTokenMock } from '@/tests/mocks/cryptography/TokenMock'
import { makeFakeUserModel } from '@/tests/mocks/models/UserModel.mock'
import { makeFakeUsersRepository } from '@/tests/mocks/repositories/UsersRepository.mock'

const makeSut = () => {
    const usersRepository = makeFakeUsersRepository()
    const hasherCompare = makeFakeHasherCompare()
    const tokenMock = makeTokenMock()
    const sut = new AuthenticationUseCase(usersRepository, hasherCompare, tokenMock)
    return { sut, usersRepository, hasherCompare, tokenMock }
}

describe('AuthenticationUseCase', () => {
    test('Should throw if Users Repository throws', async () => {
        const { sut, usersRepository } = makeSut()

        jest.spyOn(usersRepository, 'updateUser').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.auth({ email: 'any_email@email.com', password: 'any_password' })
        expect(res).rejects.toThrow()
    })
    test('Should throw if Hasher throws', async () => {
        const { sut, hasherCompare } = makeSut()

        jest.spyOn(hasherCompare, 'compare').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.auth({ email: 'any_email@email.com', password: 'any_password' })
        expect(res).rejects.toThrow()
    })
    test('Should throw if Token throws', async () => {
        const { sut, tokenMock } = makeSut()

        jest.spyOn(tokenMock, 'encrypt').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.auth({ email: 'any_email@email.com', password: 'any_password' })
        expect(res).rejects.toThrow()
    })

    test('Should return null if usersRepository returns null', async () => {
        const { sut, usersRepository } = makeSut()
        jest.spyOn(usersRepository, 'getByField').mockReturnValueOnce(null as any)
        const accessToken = await sut.auth({ email: 'any_email@email.com', password: 'any_password' })
        expect(accessToken).toBe(null)
    })
    test('Should return null if HashComparer returns false', async () => {
        const { sut, hasherCompare } = makeSut()
        jest.spyOn(hasherCompare, 'compare').mockReturnValueOnce(new Promise((resolve) => resolve(false)))
        const accessToken = await sut.auth({ email: 'any_email@email.com', password: 'any_password' })
        expect(accessToken).toBeNull()
    })

    test('Should return token on success', async () => {
        const { sut } = makeSut()
        const res = await sut.auth({ email: 'any_email@email.com', password: 'any_password' })
        expect(res.token).toBeTruthy()
    })
})
