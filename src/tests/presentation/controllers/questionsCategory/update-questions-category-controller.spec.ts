import { UpdateQuestionsCategoryController } from '@/presentation/controllers/questionsCategory/UpdateQuestionsCategoryController'
import { makeFakeGetQuestionsCategoryByIdUseCase } from '@/tests/mocks/useCases/GetQuestionsCategoryByIdUseCase.mock'
import { makeFakeGetQuestionsCategoryBySlugUseCase } from '@/tests/mocks/useCases/QuestionsCategoryUseCase'
import { makeFakeUpdateQuestionsCategory } from '@/tests/mocks/useCases/UpdateQuestionsCategoryUseCase.mock'

const makeSut = () => {
    const getBySlug = makeFakeGetQuestionsCategoryBySlugUseCase()
    const getById = makeFakeGetQuestionsCategoryByIdUseCase()
    const updateCategory = makeFakeUpdateQuestionsCategory()
    const sut = new UpdateQuestionsCategoryController(getBySlug, getById, updateCategory)
    return { sut, getById, getBySlug, updateCategory }
}

describe('UpdateQuestionsCategoryController', () => {
    test('should return 500 if getByID throws', async () => {
        const { sut, getById } = makeSut()

        jest.spyOn(sut, 'handleMultpartForm').mockImplementationOnce(async () => {
            return { title: 'string', image: 'string', id: 'string' }
        })

        jest.spyOn(getById, 'get').mockReturnValueOnce(Promise.reject(new Error('')))
        const res = await sut.handle({
            parts: () => {
                return { id: true }
            }
        })
        expect(res.statusCode).toBe(500)
    })
    test('should return 500 if getBySlug throws', async () => {
        const { sut, getBySlug } = makeSut()

        jest.spyOn(sut, 'handleMultpartForm').mockImplementationOnce(async () => {
            return { title: 'string', image: 'string', id: 'string' }
        })

        jest.spyOn(getBySlug, 'get').mockReturnValueOnce(Promise.reject(new Error('')))
        const res = await sut.handle({
            parts: () => {
                return { id: true }
            }
        })
        expect(res.statusCode).toBe(500)
    })
    test('should return 500 if updateCategory throws', async () => {
        const { sut, updateCategory, getBySlug } = makeSut()

        jest.spyOn(getBySlug, 'get').mockImplementationOnce(async () => {
            return null
        })
        jest.spyOn(sut, 'handleMultpartForm').mockImplementationOnce(async () => {
            return { title: 'string', image: 'string', id: 'string' }
        })

        jest.spyOn(updateCategory, 'update').mockImplementationOnce(() => {
            throw new Error('')
        })
        const res = await sut.handle({
            parts: () => {
                return { id: true }
            }
        })
        expect(res.statusCode).toBe(500)
    })

    test('Should return 200 on success', async () => {
        const { sut, getBySlug } = makeSut()
        jest.spyOn(getBySlug, 'get').mockReturnValueOnce(Promise.resolve(null))
        jest.spyOn(sut, 'handleMultpartForm').mockImplementationOnce(async () => {
            return { title: 'string atualizada', id: 'id' }
        })
        const res = await sut.handle({
            parts: () => {
                return { mock: true }
            }
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.title).toBe('string atualizada')
        expect(res.body.slug).toBe('string-atualizada')
    })
})
