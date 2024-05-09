import { CreateQuestionsCategoryController } from '@/presentation/controllers/questionsCategory/CreateQuestionsCategoryController'
import {
    makeFakeCreateQuestionsCategoryUseCase,
    makeFakeGetQuestionsCategoryBySlugUseCase
} from '@/tests/mocks/useCases/QuestionsCategoryUseCase'

const makeSut = () => {
    const createCategoryUseCase = makeFakeCreateQuestionsCategoryUseCase()
    const getCategoryBySlug = makeFakeGetQuestionsCategoryBySlugUseCase()
    const sut = new CreateQuestionsCategoryController(getCategoryBySlug, createCategoryUseCase)

    return { sut, createCategoryUseCase, getCategoryBySlug }
}
describe('CreateQuestionsCategoryController', () => {
    test('Should return 400 if category already exists', async () => {
        const { sut } = makeSut()
        jest.spyOn(sut, 'handleMultpartForm').mockImplementationOnce(async () => {
            return { title: 'string', image: null }
        })
        const res = await sut.handle({
            parts: () => {
                return { mock: true }
            }
        })
        expect(res.statusCode).toBe(400)
    })
    test('Should return 200 on success', async () => {
        const { sut, getCategoryBySlug } = makeSut()
        jest.spyOn(getCategoryBySlug, 'get').mockReturnValueOnce(Promise.resolve(null))
        jest.spyOn(sut, 'handleMultpartForm').mockImplementationOnce(async () => {
            return { title: 'string', image: 'imagem' }
        })
        const res = await sut.handle({
            parts: () => {
                return { mock: true }
            }
        })
        expect(res.statusCode).toBe(200)
    })
})
