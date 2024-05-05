import { GetQuestionsCategoryBySlugUseCase } from '@/application/questionsCategories/GetQuestionsCategoryBySlugUseCase'
import { makeFakeQuestionsCategoryRepo } from '@/tests/mocks/repositories/QuestionsCategoryRepository.mock'

const makeSut = () => {
    const questionsCategoryRepository = makeFakeQuestionsCategoryRepo()
    const sut = new GetQuestionsCategoryBySlugUseCase(questionsCategoryRepository)
    return { sut, questionsCategoryRepository }
}

describe('GetQuestionCategoryBySlugUseCase', () => {
    test('Should throw if repository throws', async () => {
        const { sut, questionsCategoryRepository } = makeSut()
        jest.spyOn(questionsCategoryRepository, 'getBySlug').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.get('title-category')
        expect(res).rejects.toThrow()
    })
    test('Should return a category on success', async () => {
        const { sut } = makeSut()

        const res = await sut.get('title-category')
        expect(res.id).toBeTruthy()
    })
})
