import { GetAnswerByIDController } from '@/presentation/controllers/answers/GetAnswerByIDController'
import { makeFakeAnswerModel } from '@/tests/mocks/models/AnswerModel.mock'
import { makeFakeUserModel } from '@/tests/mocks/models/UserModel.mock'
import { makeFakeGetAnswers } from '@/tests/mocks/useCases/answers/GetAnswersUseCase.mock'
import { makeFakeAuthentication } from '@/tests/mocks/useCases/auth/AuthenticationUseCaseMock'

const makeSut = () => {
    const authentication = makeFakeAuthentication()
    const getAnswers = makeFakeGetAnswers()
    const sut = new GetAnswerByIDController(authentication, getAnswers)
    return { sut, authentication, getAnswers }
}

describe('GetAnswerByIDController', () => {
    test('should return 400 if id is not provided', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ params: { id: null }, cookies: {} })
        expect(res.statusCode).toBe(400)
    })
    test('should return 401 if access_token not provided', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ params: { id: '123' }, cookies: { access_token: null } })
        expect(res.statusCode).toBe(401)
    })

    test('should return 400 if answer not found', async () => {
        const { sut, getAnswers } = makeSut()
        jest.spyOn(getAnswers, 'getByID').mockReturnValueOnce(Promise.resolve(null))

        const res = await sut.handle({ params: { id: '123' }, cookies: { access_token: '123' } })
        expect(res.statusCode).toBe(400)
    })

    test('should return 401 if user not found', async () => {
        const { sut, authentication } = makeSut()
        jest.spyOn(authentication, 'verifySession').mockReturnValueOnce(Promise.resolve(null))

        const res = await sut.handle({ params: { id: '123' }, cookies: { access_token: '123' } })
        expect(res.statusCode).toBe(401)
    })

    test('should return 401 if user id not equal answer.user', async () => {
        const { sut, authentication, getAnswers } = makeSut()

        const user = makeFakeUserModel()
        user.id = 'id_invalido'

        const answer = makeFakeAnswerModel()
        answer.user = 'id_diferente'

        jest.spyOn(authentication, 'verifySession').mockReturnValueOnce(Promise.resolve(user))
        jest.spyOn(getAnswers, 'getByID').mockReturnValueOnce(Promise.resolve(answer))

        const res = await sut.handle({ params: { id: '123' }, cookies: { access_token: '123' } })
        expect(res.statusCode).toBe(401)
    })

    test('should return 200 on success', async () => {
        const { sut, authentication, getAnswers } = makeSut()

        const user = makeFakeUserModel()
        user.id = 'id_valido'

        const answer = makeFakeAnswerModel()
        answer.user = 'id_valido'

        jest.spyOn(authentication, 'verifySession').mockReturnValueOnce(Promise.resolve(user))
        jest.spyOn(getAnswers, 'getByID').mockReturnValueOnce(Promise.resolve(answer))

        const res = await sut.handle({ params: { id: '123' }, cookies: { access_token: '123' } })
        expect(res.statusCode).toBe(200)
    })
})
