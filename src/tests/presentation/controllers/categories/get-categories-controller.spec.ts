import { GetCategoriesController } from '@/presentation/controllers/categories/GetCategoriesController'
import { makeFakeGetCategories } from '@/tests/mocks/useCases/categories/GetCategoriesUseCase.mock'

const makeSut = () => {
    const getCategories = makeFakeGetCategories()
    const sut = new GetCategoriesController(getCategories)
    return { sut, getCategories }
}

describe('GetQuestionsCategoriesController', () => {
    test('should return return 500 if getCategories throws', async () => {
        const { sut, getCategories } = makeSut()
        jest.spyOn(getCategories, 'execute').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = await sut.handle({ query: {} })
        expect(res.statusCode).toBe(500)
    })
    test('should return return 200 on success', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ query: {} })
        expect(res.statusCode).toBe(200)
    })
})
