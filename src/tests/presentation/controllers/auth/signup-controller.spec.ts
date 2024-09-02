import { SignUpController } from '@/presentation/controllers/auth/SignUpController'
import { makeFakeAuthentication } from '@/tests/mocks/useCases/auth/AuthenticationUseCaseMock'
import { makeSignUpUseCaseStub } from '@/tests/mocks/useCases/auth/SignUp.usecase.mock'
import { AlreadyInUseError } from '@/utils/customErrors'

const makeSut = () => {
    const signUp = makeSignUpUseCaseStub()
    const authentication = makeFakeAuthentication()
    const sut = new SignUpController(signUp, authentication)

    return { sut, signUp, authentication }
}

describe('SignUp controller', () => {
    test('Should return 400 if any field is missing', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({
            body: {
                name: 'any',
                email: 'any'
            }
        })
        expect(res.statusCode).toBe(400)
    })

    test('Should return 400 if email already in use', async () => {
        const { sut, signUp } = makeSut()

        jest.spyOn(signUp, 'execute').mockReturnValueOnce(Promise.reject(new AlreadyInUseError('')))

        const res = await sut.handle({
            body: {
                name: 'any',
                email: 'any',
                password: 'pass'
            }
        })
        expect(res.statusCode).toBe(400)
    })

    test('Should return 500 if sign up throws', async () => {
        const { sut, signUp } = makeSut()

        jest.spyOn(signUp, 'execute').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = await sut.handle({
            body: {
                name: 'any',
                email: 'any',
                password: 'pass'
            }
        })
        expect(res.statusCode).toBe(500)
    })

    test('Should return 500 if get discord by user throws', async () => {
        const { sut, authentication } = makeSut()

        jest.spyOn(authentication, 'auth').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = await sut.handle({
            body: {
                name: 'any',
                email: 'any',
                password: 'pass'
            }
        })
        expect(res.statusCode).toBe(500)
    })

    test('Should return a user on sucess', async () => {
        const { sut } = makeSut()
        const res = await sut.handle({
            body: {
                name: 'any',
                email: 'any',
                password: 'pass'
            }
        })
        expect(res.statusCode).toBe(200)
    })
})
