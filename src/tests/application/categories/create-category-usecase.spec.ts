import { CreateCategoryUseCase } from '@/application/categories/CreateCategoryUseCase'
import { makeFakeCategoryRepo } from '@/tests/mocks/repositories/QuestionsCategoryRepository.mock'

const makeSut = () => {
    const categoryRepository = makeFakeCategoryRepo()
    const sut = new CreateCategoryUseCase(categoryRepository)
    return { sut, categoryRepository }
}

describe('CreateCategoryUseCase', () => {
    test('Should throw in use error if repository returns a category in use', async () => {
        const { sut, categoryRepository } = makeSut()
        jest.spyOn(categoryRepository, 'queryOne').mockReturnValueOnce(
            Promise.resolve({
                id: '1232132',
                title: 'title category',
                slug: 'title_category',
                createdAt: new Date(),
                updatedAt: new Date()
            })
        )

        const res = sut.execute('title category', 'title-category')
        expect(res).rejects.toThrow()
    })
    test('Should throw if repository throws', async () => {
        const { sut, categoryRepository } = makeSut()
        jest.spyOn(categoryRepository, 'queryOne').mockReturnValueOnce(Promise.resolve(null))
        jest.spyOn(categoryRepository, 'create').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.execute('title category', 'title-category')
        expect(res).rejects.toThrow()
    })

    test('Should return a category on success', async () => {
        const { sut, categoryRepository } = makeSut()
        jest.spyOn(categoryRepository, 'queryOne').mockReturnValueOnce(Promise.resolve(null))

        const res = await sut.execute('title', 'title-category')
        expect(res.id).toBeTruthy()
    })
})
