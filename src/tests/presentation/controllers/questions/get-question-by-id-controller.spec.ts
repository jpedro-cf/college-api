import { GetQuestionByIDController } from '@/presentation/controllers/questions/GetQuestionByIDController'
import { GetQuestionsController } from '@/presentation/controllers/questions/GetQuestionsController'
import { makeFakeGetQuestions } from '@/tests/mocks/useCases/questions/GetQuestionsUseCase.mock'

const makeSut = () => {
    const getQuestionns = makeFakeGetQuestions()
    const sut = new GetQuestionByIDController(getQuestionns)
    return { sut, getQuestionns }
}

describe('GetQuestionByIDController', () => {
    test('should return return 500 if getQuestionns throws', async () => {
        const { sut, getQuestionns } = makeSut()
        jest.spyOn(getQuestionns, 'byId').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = await sut.handle({ params: { id: '123' } })
        expect(res.statusCode).toBe(500)
    })
    test('should return return 400 if id not provided', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ params: { id: null } })
        expect(res.statusCode).toBe(400)
    })
    test('should return return 200 on success', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ params: { id: '123' } })
        expect(res.statusCode).toBe(200)
    })
})
