import { GetCategoriesController } from '@/presentation/controllers/categories/GetCategoriesController'
import { GetQuestionsController } from '@/presentation/controllers/questions/GetQuestionsController'
import { makeFakeGetQuestionsCategoies } from '@/tests/mocks/useCases/GetQuestionsCategoriesUseCase.mock'
import { makeFakeGetQuestions } from '@/tests/mocks/useCases/questions/GetQuestionsUseCase.mock'

const makeSut = () => {
    const getQuestionns = makeFakeGetQuestions()
    const sut = new GetQuestionsController(getQuestionns)
    return { sut, getQuestionns }
}

describe('GetQuestionsCategoriesController', () => {
    test('should return return 500 if getQuestionns throws', async () => {
        const { sut, getQuestionns } = makeSut()
        jest.spyOn(getQuestionns, 'execute').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = await sut.handle({ query: {} })
        expect(res.statusCode).toBe(500)
    })
    test('should return return 200 on success', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ query: {} })
        expect(res.statusCode).toBe(200)
    })
})
