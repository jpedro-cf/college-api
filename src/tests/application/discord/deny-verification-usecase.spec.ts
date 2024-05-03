import { DenyVerificationUseCase } from '@/application/discord/verification/DenyVerificationUseCase'
import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { makeFakeUsersRepository } from '@/tests/mocks/repositories/UsersRepository.mock'

interface ISut {
    usersRepository: IUsersRepository
    sut: DenyVerificationUseCase
}

const makeSut = (): ISut => {
    const usersRepository = makeFakeUsersRepository()
    const sut = new DenyVerificationUseCase(usersRepository)
    return { sut, usersRepository }
}

describe('ConfirmVerificationUseCase', () => {
    test('Should throw if usersRepository throw', async () => {
        const { sut, usersRepository } = makeSut()

        jest.spyOn(usersRepository, 'getByDiscord').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.deny('any_discord')
        expect(res).rejects.toThrow()
    })
    test('Should throw if usersRepository returns null', async () => {
        const { sut, usersRepository } = makeSut()

        jest.spyOn(usersRepository, 'getByDiscord').mockReturnValueOnce(Promise.resolve(null))

        const res = sut.deny('any_discord')
        expect(res).rejects.toThrow()
    })
    test('Should return user with updated discord info', async () => {
        const { sut } = makeSut()
        const res = await sut.deny('any_discord')
        expect(res).toBeTruthy()
    })
})
