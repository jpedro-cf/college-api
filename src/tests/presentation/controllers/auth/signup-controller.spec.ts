import { badRequest } from '@/interfaces/presentation/codes'
import { SignUpController } from '@/presentation/controllers/auth/SignUpController'
import { makeFakeAuthentication } from '@/tests/mocks/useCases/AuthenticationUseCaseMock'
import { makeSendVerificationService } from '@/tests/mocks/useCases/SendVerificationService.mock'
import { makeSignUpUseCaseStub } from '@/tests/mocks/useCases/SignUp.usecase.mock'
import { NotFoundError } from '@/utils/customErrors'

const makeSut = () => {
    const sendVerification = makeSendVerificationService()
    const signUp = makeSignUpUseCaseStub()
    const authentication = makeFakeAuthentication()
    const sut = new SignUpController(signUp, sendVerification, authentication)

    return { sut, signUp, sendVerification, authentication }
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

        jest.spyOn(signUp, 'getUserByEmail').mockResolvedValueOnce({
            id: 'any_id',
            name: 'any_name',
            email: 'any_email@email.com',
            roles: ['student'],
            points: 0
        })

        const res = await sut.handle({
            body: {
                name: 'any',
                email: 'any',
                password: 'pass'
            }
        })
        expect(res.statusCode).toBe(400)
        expect(res).toEqual(badRequest(new Error('Usuário com esse email já existe')))
    })

    test('Should return 500 if sign up throws', async () => {
        const { sut, signUp } = makeSut()

        jest.spyOn(signUp, 'signUp').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = await sut.handle({
            body: {
                name: 'any',
                email: 'any',
                password: 'pass'
            }
        })
        expect(res.statusCode).toBe(500)
    })

    test('Should return 500 if sendVerification throws', async () => {
        const { sut, sendVerification } = makeSut()

        jest.spyOn(sendVerification, 'send').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = await sut.handle({
            body: {
                name: 'any',
                email: 'any',
                discord_username: 'any',
                password: 'pass'
            }
        })
        expect(res.statusCode).toBe(500)
    })

    test('Should return 400 if username not found', async () => {
        const { sut, sendVerification } = makeSut()

        jest.spyOn(sendVerification, 'send').mockReturnValueOnce(Promise.reject(new NotFoundError('')))

        const res = await sut.handle({
            body: {
                name: 'any',
                email: 'any',
                discord_username: 'any',
                password: 'pass'
            }
        })
        expect(res.statusCode).toBe(400)
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
