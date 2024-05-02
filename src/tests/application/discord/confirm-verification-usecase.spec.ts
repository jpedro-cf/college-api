import { ConfirmVerificationUseCase } from '@/application/discord/verification/ConfirmVerificationUseCase'
import { IUsersRepository } from '@/interfaces/application/repositories/UsersRepository'
import { makeFakeUsersRepository } from '@/tests/mocks/repositories/UsersRepository.mock'

interface ISut {
    usersRepository: IUsersRepository
    sut: ConfirmVerificationUseCase
}

const makeSut = (): ISut => {
    const usersRepository = makeFakeUsersRepository()
    const sut = new ConfirmVerificationUseCase(usersRepository)
    return { sut, usersRepository }
}

describe('ConfirmVerificationUseCase', () => {
    test('Should throw if usersRepository throw', async () => {
        const { sut, usersRepository } = makeSut()

        jest.spyOn(usersRepository, 'getByDiscord').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.confirm('any_discord')
        expect(res).rejects.toThrow()
    })
    test('Should throw if usersRepository returns null', async () => {
        const { sut, usersRepository } = makeSut()

        jest.spyOn(usersRepository, 'getByDiscord').mockReturnValueOnce(Promise.resolve(null))

        const res = sut.confirm('any_discord')
        expect(res).rejects.toThrow()
    })
    test('Should return user with updated discord info', async () => {
        const { sut } = makeSut()
        const res = await sut.confirm('any_discord')
        expect(res.discord_username).toBe('any_discord')
    })
})
