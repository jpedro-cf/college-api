import { GetByTokenUseCase } from '@/application/auth/GetByTokenUseCase'
import { IToken } from '@/interfaces/application/cryptography/Token'
import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { makeTokenMock } from '@/tests/mocks/cryptography/TokenMock'
import { makeFakeUsersRepository } from '@/tests/mocks/repositories/UsersRepository.mock'

interface ISut {
    token: IToken
    usersRepository: IUsersRepository
    sut: GetByTokenUseCase
}

const makeSut = (): ISut => {
    const token = makeTokenMock()
    const usersRepository = makeFakeUsersRepository()
    const sut = new GetByTokenUseCase(usersRepository, token)
    return { sut, usersRepository, token }
}

describe('GetByTokenUseCase', () => {
    test('Should throw if users repository throws', async () => {
        const { sut, usersRepository } = makeSut()
        jest.spyOn(usersRepository, 'getByToken').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.get('any_token')
        expect(res).rejects.toThrow()
    })

    test('Should throw if token throws', async () => {
        const { sut, token } = makeSut()
        jest.spyOn(token, 'decrypt').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.get('any_token')
        expect(res).rejects.toThrow()
    })

    test('Should return nulls if token returns null', async () => {
        const { sut, token } = makeSut()
        jest.spyOn(token, 'decrypt').mockReturnValueOnce(Promise.resolve(null))

        const res = await sut.get('any_token')
        expect(res).toBeNull()
    })

    test('Should return nulls if repository returns null', async () => {
        const { sut, usersRepository } = makeSut()
        jest.spyOn(usersRepository, 'getByToken').mockReturnValueOnce(Promise.resolve(null))

        const res = await sut.get('any_token')
        expect(res).toBeNull()
    })

    test('Should return an account on success', async () => {
        const { sut } = makeSut()

        const res = await sut.get('any_token')

        expect(res.id).toBeTruthy()
    })
})
