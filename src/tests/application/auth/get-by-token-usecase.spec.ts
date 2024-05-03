import { GetByTokenUseCase } from '@/application/auth/GetByTokenUseCase'
import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { makeFakeUsersRepository } from '@/tests/mocks/repositories/UsersRepository.mock'

interface ISut {
    usersRepository: IUsersRepository
    sut: GetByTokenUseCase
}

const makeSut = (): ISut => {
    const usersRepository = makeFakeUsersRepository()
    const sut = new GetByTokenUseCase(usersRepository)
    return { sut, usersRepository }
}

describe('GetByTokenUseCase', () => {
    test('Should throw if users repository throws', async () => {
        const { sut, usersRepository } = makeSut()
        jest.spyOn(usersRepository, 'getByToken').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.get('any_token')
        expect(res).rejects.toThrow()
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
