import { UpdateCategoryController } from '@/presentation/controllers/categories/UpdateCategoryController'
import { makeFakeGetQuestionsCategoryByIdUseCase } from '@/tests/mocks/useCases/GetQuestionsCategoryByIdUseCase.mock'
import { makeFakeUpdateQuestionsCategory } from '@/tests/mocks/useCases/UpdateQuestionsCategoryUseCase.mock'
import { AlreadyInUseError } from '@/utils/customErrors'

const makeSut = () => {
    const getById = makeFakeGetQuestionsCategoryByIdUseCase()
    const updateCategory = makeFakeUpdateQuestionsCategory()
    const sut = new UpdateCategoryController(getById, updateCategory)
    return { sut, getById, updateCategory }
}

describe('UpdateQuestionsCategoryController', () => {
    test('should return 500 if getByID throws', async () => {
        const { sut, getById } = makeSut()

        jest.spyOn(getById, 'execute').mockReturnValueOnce(Promise.reject(new Error('')))
        const res = await sut.handle({
            body: {
                id: 'id'
            }
        })
        expect(res.statusCode).toBe(500)
    })

    test('should return 400 if slug already exists', async () => {
        const { sut, updateCategory } = makeSut()

        jest.spyOn(updateCategory, 'execute').mockReturnValueOnce(Promise.reject(new AlreadyInUseError('')))
        const res = await sut.handle({
            body: {
                id: 'id'
            }
        })
        expect(res.statusCode).toBe(400)
    })

    test('Should return 200 on success', async () => {
        const { sut } = makeSut()
        const res = await sut.handle({
            body: {
                id: 'id'
            }
        })
        expect(res.statusCode).toBe(200)
    })
})
