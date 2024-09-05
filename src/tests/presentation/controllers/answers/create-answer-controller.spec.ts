import { CreateAnswerController } from '@/presentation/controllers/answers/CreateAnswerController'
import { makeFakeCreateAnswer } from '@/tests/mocks/useCases/answers/CreateAnswerUseCase.mock'
import { makeFakeAuthentication } from '@/tests/mocks/useCases/auth/AuthenticationUseCaseMock'

const makeSut = () => {
    const authentication = makeFakeAuthentication()
    const createAnswer = makeFakeCreateAnswer()
    const sut = new CreateAnswerController(authentication, createAnswer)
    return { sut, authentication, createAnswer }
}

describe('CreateAnswerController', () => {
    test('should return 400 if any field is not provided', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ body: { question_id: null, answer_id: 2 }, cookies: '123' })
        expect(res.statusCode).toBe(400)
    })
    test('should return 200 on success', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ body: { question_id: '1234656', answer_id: 2 }, cookies: '123' })
        expect(res.statusCode).toBe(200)
    })
})
