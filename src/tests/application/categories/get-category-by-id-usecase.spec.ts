import { GetCategoryByIdUseCase } from '@/application/categories/GetCategoryByIDUseCase'
import { makeFakeCategoryRepo } from '@/tests/mocks/repositories/QuestionsCategoryRepository.mock'

const makeSut = () => {
    const questionsCategoryRepository = makeFakeCategoryRepo()
    const sut = new GetCategoryByIdUseCase(questionsCategoryRepository)
    return { sut, questionsCategoryRepository }
}

describe('GetQuestionCategoryByIdUseCase', () => {
    test('Should throw if repository throws', async () => {
        const { sut, questionsCategoryRepository } = makeSut()
        jest.spyOn(questionsCategoryRepository, 'queryOne').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.execute('12344565677')
        expect(res).rejects.toThrow()
    })
    test('Should return a category on success', async () => {
        const { sut } = makeSut()

        const res = await sut.execute('12344565677')
        expect(res._id).toBeTruthy()
    })
})
