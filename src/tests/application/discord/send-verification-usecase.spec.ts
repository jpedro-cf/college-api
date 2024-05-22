import { SendVerificationUseCase } from '@/application/discord/verification/SendVerificationUseCase'
import { makeFakeDiscordUsersService } from '@/tests/mocks/discord/DiscordUsersService.mock'
import { makeFakeSendVerification } from '@/tests/mocks/discord/VerificationService.mock'

const makeSut = () => {
    const sendVerificationService = makeFakeSendVerification()
    const usersService = makeFakeDiscordUsersService()
    const sut = new SendVerificationUseCase(sendVerificationService, usersService)
    return { sut, sendVerificationService, usersService }
}

describe('SendVerificationUseCase', () => {
    test('should throw if sendVerificationService throws', async () => {
        const { sut, sendVerificationService } = makeSut()

        jest.spyOn(sendVerificationService, 'sendVerificationMessage').mockReturnValueOnce(
            Promise.reject(new Error(''))
        )
        const res = sut.send('any')
        expect(res).rejects.toThrow()
    })

    test('should throw if usersService returns null', async () => {
        const { sut, usersService } = makeSut()

        jest.spyOn(usersService, 'getByUsername').mockReturnValueOnce(Promise.resolve(null))
        const res = sut.send('any')
        expect(res).rejects.toThrow()
    })

    test('should return false if sendVerificationService returns false', async () => {
        const { sut, sendVerificationService } = makeSut()
        jest.spyOn(sendVerificationService, 'sendVerificationMessage').mockReturnValueOnce(Promise.resolve(false))
        const res = await sut.send('any')
        expect(res).toBeFalsy()
    })

    test('should return true on success', async () => {
        const { sut } = makeSut()
        const res = await sut.send('any')
        expect(res).toBeTruthy()
    })
})
