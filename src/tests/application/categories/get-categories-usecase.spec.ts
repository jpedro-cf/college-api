import { GetCategoriesUseCase } from '@/application/categories/GetQuestionsCategoryUseCase'
import { makeFakeCategoryRepo } from '@/tests/mocks/repositories/QuestionsCategoryRepository.mock'

const makeSut = () => {
    const categoryRepository = makeFakeCategoryRepo()
    const sut = new GetCategoriesUseCase(categoryRepository)
    return { sut, categoryRepository }
}

describe('GetCategoriesUseCase', () => {
    test('should throw if repository throws', async () => {
        const { sut, categoryRepository } = makeSut()

        jest.spyOn(categoryRepository, 'getAllWithFilters').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.execute({})
        expect(res).rejects.toThrow()
    })
    test('should return a list of categories', async () => {
        const { sut } = makeSut()

        const res = await sut.execute({ search: 'title' })
        expect(res.categories.length).toBeGreaterThan(0)
    })
})
