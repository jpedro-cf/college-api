import { CreateQuestionsCategoryUseCase } from '@/application/questionsCategories/CreateQuestionsCategoryUseCase'
import { makeFakeQuestionsCategoryRepo } from '@/tests/mocks/repositories/QuestionsCategoryRepository.mock'

const makeSut = () => {
    const questionsCategoryRepository = makeFakeQuestionsCategoryRepo()
    const sut = new CreateQuestionsCategoryUseCase(questionsCategoryRepository)
    return { sut, questionsCategoryRepository }
}

describe('CreateQuestionCategoryUseCase', () => {
    test('Should throw if repository throws', async () => {
        const { sut, questionsCategoryRepository } = makeSut()
        jest.spyOn(questionsCategoryRepository, 'createCategory').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.create('title category', 'title-category')
        expect(res).rejects.toThrow()
    })

    test('Should return a questionCategory on success', async () => {
        const { sut } = makeSut()

        const res = await sut.create('title', 'title-category')
        expect(res.id).toBeTruthy()
    })
})
