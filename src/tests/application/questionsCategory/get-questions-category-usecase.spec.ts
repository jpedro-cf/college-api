import { GetQuestionsCategoryUseCase } from '@/application/questionsCategories/GetQuestionsCategoryUseCase'
import { makeFakeQuestionsCategoryRepo } from '@/tests/mocks/repositories/QuestionsCategoryRepository.mock'

const makeSut = () => {
    const categoryRepository = makeFakeQuestionsCategoryRepo()
    const sut = new GetQuestionsCategoryUseCase(categoryRepository)
    return { sut, categoryRepository }
}

describe('GetQuestionsCategoryUseCase', () => {
    test('should throw if repository throws', async () => {
        const { sut, categoryRepository } = makeSut()

        jest.spyOn(categoryRepository, 'getAll').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.get()
        expect(res).rejects.toThrow()
    })
    test('should return a list of categories', async () => {
        const { sut } = makeSut()

        const res = await sut.get({ search: 'title' })
        expect(res.length).toBeGreaterThan(0)
    })
})
