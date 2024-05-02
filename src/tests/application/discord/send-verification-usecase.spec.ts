import { SendVerificationUseCase } from '@/application/discord/verification/SendVerificationUseCase'
import { IDiscordVerificationService } from '@/interfaces/application/discord/DiscordVerificationService'
import { makeFakeSendVerification } from '@/tests/mocks/discord/VerificationService.mock'

interface ISut {
    sendVerificationService: IDiscordVerificationService
    sut: SendVerificationUseCase
}

const makeSut = (): ISut => {
    const sendVerificationService = makeFakeSendVerification()
    const sut = new SendVerificationUseCase(sendVerificationService)
    return { sut, sendVerificationService }
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
