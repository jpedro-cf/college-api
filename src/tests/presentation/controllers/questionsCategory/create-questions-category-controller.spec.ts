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

        const res = await sut.handle({
            body: {
                title: 'titulo',
                image: 'imagem'
            }
        })

        expect(res.statusCode).toBe(400)
    })

    test('Should return 200 on success', async () => {
        const { sut, getCategoryBySlug } = makeSut()
        jest.spyOn(getCategoryBySlug, 'get').mockReturnValueOnce(Promise.resolve(null))
        const res = await sut.handle({
            body: {
                title: 'titulo',
                image: 'imagem'
            }
        })

        expect(res.statusCode).toBe(200)
    })
})
