import { CreateQuestionsCategoryUseCase } from '@/application/questionsCategories/CreateQuestionsCategoryUseCase'
import { makeFakeQuestionsCategoryRepo } from '@/tests/mocks/repositories/QuestionsCategoryRepository.mock'

const makeSut = () => {
    const questionsCategoryRepository = makeFakeQuestionsCategoryRepo()
    const sut = new CreateQuestionsCategoryUseCase(questionsCategoryRepository)
    return { sut, questionsCategoryRepository }
}

describe('CreateQuestionCategoryUseCase', () => {
    test('Should throw in use error if repository returns a category in use', async () => {
        const { sut, questionsCategoryRepository } = makeSut()
        jest.spyOn(questionsCategoryRepository, 'getBySlug').mockReturnValueOnce(
            Promise.resolve({
                id: '1232132',
                title: 'title category',
                slug: 'title_category',
                image: 'image_url',
                created_at: new Date()
            })
        )

        const res = sut.create('title category', 'title-category')
        expect(res).rejects.toThrow()
    })
    test('Should throw if repository throws', async () => {
        const { sut, questionsCategoryRepository } = makeSut()
        jest.spyOn(questionsCategoryRepository, 'getBySlug').mockReturnValueOnce(Promise.resolve(null))
        jest.spyOn(questionsCategoryRepository, 'createCategory').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.create('title category', 'title-category')
        expect(res).rejects.toThrow()
    })

    test('Should return a questionCategory on success', async () => {
        const { sut, questionsCategoryRepository } = makeSut()
        jest.spyOn(questionsCategoryRepository, 'getBySlug').mockReturnValueOnce(Promise.resolve(null))

        const res = await sut.create('title', 'title-category')
        expect(res.id).toBeTruthy()
    })
})
