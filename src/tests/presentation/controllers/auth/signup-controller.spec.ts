import { IAuthentication } from '@/interfaces/domain/useCases/auth/Authentication'
import { ISignUp } from '@/interfaces/domain/useCases/auth/SignUp'
import { IGetDiscordUserByUserName } from '@/interfaces/domain/useCases/discord/users/GetUserByUserName'
import { ISendVerification } from '@/interfaces/domain/useCases/discord/verification/SendVerification'
import { badRequest } from '@/interfaces/presentation/codes'
import { SignUpController } from '@/presentation/controllers/auth/SignUpController'
import { makeFakeAuthentication } from '@/tests/mocks/useCases/AuthenticationUseCaseMock'
import { makeGetDiscordUserByName } from '@/tests/mocks/useCases/GetDiscordByUserName.mock'
import { makeSendVerificationService } from '@/tests/mocks/useCases/SendVerificationService.mock'
import { makeSignUpUseCaseStub } from '@/tests/mocks/useCases/SignUp.usecase.mock'

interface ISut {
    signUp: ISignUp
    sendVerification: ISendVerification
    getDiscordUserByName: IGetDiscordUserByUserName
    authentication: IAuthentication
    sut: SignUpController
}

const makeSut = (): ISut => {
    const getDiscordUserByName = makeGetDiscordUserByName()
    const sendVerification = makeSendVerificationService()
    const signUp = makeSignUpUseCaseStub()
    const authentication = makeFakeAuthentication()
    const sut = new SignUpController(signUp, getDiscordUserByName, sendVerification, authentication)

    return { sut, signUp, getDiscordUserByName, sendVerification, authentication }
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
            points: 0
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

    test('should 400 if get discord user by name returns null', async () => {
        const { sut, getDiscordUserByName } = makeSut()

        jest.spyOn(getDiscordUserByName, 'get').mockReturnValueOnce(null)

        const res = await sut.handle({
            body: {
                name: 'any',
                email: 'any',
                discord_username: 'any',
                password: 'pass',
                password_confirmation: 'pass'
            }
        })

        expect(res.statusCode).toBe(400)
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

    test('Should return 500 if sendVerification throws', async () => {
        const { sut, sendVerification } = makeSut()

        jest.spyOn(sendVerification, 'send').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = await sut.handle({
            body: {
                name: 'any',
                email: 'any',
                discord_username: 'any',
                password: 'pass',
                password_confirmation: 'pass'
            }
        })
        expect(res.statusCode).toBe(500)
    })

    test('Should return 500 if get discord by user throws', async () => {
        const { sut, getDiscordUserByName } = makeSut()

        jest.spyOn(getDiscordUserByName, 'get').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = await sut.handle({
            body: {
                name: 'any',
                email: 'any',
                password: 'pass',
                password_confirmation: 'pass',
                discord_username: 'any'
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
