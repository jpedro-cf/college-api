import { IGetByToken } from '@/interfaces/domain/useCases/auth/GetByToken'
import { CurrentUserInfoController } from '@/presentation/controllers/auth/CurrentUserInfoController'
import { makeFakeGetByToken } from '@/tests/mocks/useCases/GetByTokenUseCase.mock'

interface ISut {
    getByToken: IGetByToken
    sut: CurrentUserInfoController
}

const makeSut = (): ISut => {
    const getByToken = makeFakeGetByToken()
    const sut = new CurrentUserInfoController(getByToken)

    return { sut, getByToken }
}

describe('GetUserInfoController', () => {
    test('Should return 400 if no user found', async () => {
        const { sut, getByToken } = makeSut()

        jest.spyOn(getByToken, 'get').mockReturnValueOnce(Promise.resolve(null))

        const res = await sut.handle({ cookies: { access_token: 'any_token' } })
        expect(res.statusCode).toBe(400)
    })

    test('Should return 200 on success', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ cookies: { access_token: 'any_token' } })

        expect(res.statusCode).toBe(200)
    })
})
