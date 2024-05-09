import { GetQuestionsCategoryController } from '@/presentation/controllers/questionsCategory/GetQuestionsCategoryController'
import { makeFakeGetQuestionsCategoies } from '@/tests/mocks/useCases/GetQuestionsCategoriesUseCase.mock'

const makeSut = () => {
    const getCategories = makeFakeGetQuestionsCategoies()
    const sut = new GetQuestionsCategoryController(getCategories)
    return { sut, getCategories }
}

describe('GetQuestionsCategoriesController', () => {
    test('should return return 500 if getCategories throws', async () => {
        const { sut, getCategories } = makeSut()
        jest.spyOn(getCategories, 'get').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = await sut.handle({ body: {} })
        expect(res.statusCode).toBe(500)
    })
    test('should return return 200 on success', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ body: {} })
        expect(res.statusCode).toBe(200)
    })
})
