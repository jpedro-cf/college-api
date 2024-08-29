import { UpdateQuestionsCategoryController } from '@/presentation/controllers/questionsCategory/UpdateQuestionsCategoryController'
import { makeFakeGetQuestionsCategoryByIdUseCase } from '@/tests/mocks/useCases/GetQuestionsCategoryByIdUseCase.mock'
import { makeFakeUpdateQuestionsCategory } from '@/tests/mocks/useCases/UpdateQuestionsCategoryUseCase.mock'
import { AlreadyInUseError } from '@/utils/customErrors'

const makeSut = () => {
    const getById = makeFakeGetQuestionsCategoryByIdUseCase()
    const updateCategory = makeFakeUpdateQuestionsCategory()
    const sut = new UpdateQuestionsCategoryController(getById, updateCategory)
    return { sut, getById, updateCategory }
}

describe('UpdateQuestionsCategoryController', () => {
    test('should return 500 if getByID throws', async () => {
        const { sut, getById } = makeSut()

        jest.spyOn(sut, 'handleMultpartForm').mockImplementationOnce(async () => {
            return { title: 'string', image: 'string', id: 'string' }
        })

        jest.spyOn(getById, 'execute').mockReturnValueOnce(Promise.reject(new Error('')))
        const res = await sut.handle({
            parts: () => {
                return { id: true }
            }
        })
        expect(res.statusCode).toBe(500)
    })

    test('should return 400 if slug already exists', async () => {
        const { sut, updateCategory } = makeSut()

        jest.spyOn(sut, 'handleMultpartForm').mockImplementationOnce(async () => {
            return { title: 'string atualizada', id: 'id' }
        })

        jest.spyOn(updateCategory, 'execute').mockReturnValueOnce(Promise.reject(new AlreadyInUseError('')))
        const res = await sut.handle({
            parts: () => {
                return { id: true }
            }
        })
        expect(res.statusCode).toBe(400)
    })

    test('Should return 200 on success', async () => {
        const { sut } = makeSut()
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
