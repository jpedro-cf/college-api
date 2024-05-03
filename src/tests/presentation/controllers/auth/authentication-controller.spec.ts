import { IAuthentication } from '@/interfaces/domain/useCases/auth/Authentication'
import { AuthenticationController } from '@/presentation/controllers/auth/AuthenticationController'
import { makeFakeAuthentication } from '@/tests/mocks/useCases/AuthenticationUseCaseMock'

interface ISut {
    authentication: IAuthentication
    sut: AuthenticationController
}

const makeSut = (): ISut => {
    const authentication = makeFakeAuthentication()
    const sut = new AuthenticationController(authentication)
    return { sut, authentication }
}

describe('AuthenticationController', () => {
    test('should return 500 if authentication throws', async () => {
        const { sut, authentication } = makeSut()

        jest.spyOn(authentication, 'auth').mockImplementation(() => Promise.reject(new Error('')))

        const res = await sut.handle({ body: { password: 'any', email: 'any' } })
        expect(res.statusCode).toBe(500)
    })
    test('should return 400 if any field is missing', async () => {
        const { sut, authentication } = makeSut()

        jest.spyOn(authentication, 'auth').mockImplementation(() => Promise.reject(new Error('')))

        const res = await sut.handle({ body: { email: 'any' } })
        expect(res.statusCode).toBe(400)
    })

    test('should return 403 if invalid credentials', async () => {
        const { sut, authentication } = makeSut()

        jest.spyOn(authentication, 'auth').mockImplementation(() => Promise.resolve(null))

        const res = await sut.handle({ body: { email: 'any', password: 'any' } })
        expect(res.statusCode).toBe(403)
    })
})
