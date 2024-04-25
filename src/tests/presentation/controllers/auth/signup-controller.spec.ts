import { ISignUp } from '@/interfaces/domain/useCases/auth/SignUp'
import { badRequest } from '@/interfaces/presentation/codes'
import { SignUpController } from '@/presentation/controllers/auth/SignUpController'
import { makeSignUpUseCaseStub } from '@/tests/mocks/useCases/SignUp.usecase.mock'

interface ISut {
    signUp: ISignUp
    sut: SignUpController
}

const makeSut = (): ISut => {
    const signUp = makeSignUpUseCaseStub()
    const sut = new SignUpController(signUp)

    return { sut, signUp }
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

    test('Should return 400 if password != password_confirmation', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({
            body: {
                name: 'any',
                email: 'any',
                password: 'pass',
                password_confirmation: 'any'
            }
        })
        expect(res.statusCode).toBe(400)
        expect(res).toEqual(badRequest(new Error('As senhas não são iguais')))
    })

    test('Should return 400 if email already in use', async () => {
        const { sut, signUp } = makeSut()

        jest.spyOn(signUp, 'getUserByEmail').mockResolvedValueOnce({
            id: 'any_id',
            name: 'any_name',
            email: 'any_email@email.com',
            roles: ['student'],
            points: 0,
            ranking: 0
        })

        const res = await sut.handle({
            body: {
                name: 'any',
                email: 'any',
                password: 'pass',
                password_confirmation: 'pass'
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
                password: 'pass',
                password_confirmation: 'pass'
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
                password: 'pass',
                password_confirmation: 'pass'
            }
        })
        expect(res.statusCode).toBe(200)
    })
})
