import { CurrentUserInfoController } from '@/presentation/controllers/auth/CurrentUserInfoController'
import { makeFakeAuthentication } from '@/tests/mocks/useCases/auth/AuthenticationUseCaseMock'

const makeSut = () => {
    const authentication = makeFakeAuthentication()
    const sut = new CurrentUserInfoController(authentication)

    return { sut, authentication }
}

describe('GetUserInfoController', () => {
    test('Should return 400 if no user found', async () => {
        const { sut, authentication } = makeSut()

        jest.spyOn(authentication, 'verifySession').mockReturnValueOnce(Promise.resolve(null))

        const res = await sut.handle({ cookies: { access_token: 'any_token' } })
        expect(res.statusCode).toBe(400)
    })

    test('Should return 200 on success', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ cookies: { access_token: 'any_token' } })

        expect(res.statusCode).toBe(200)
    })
})
