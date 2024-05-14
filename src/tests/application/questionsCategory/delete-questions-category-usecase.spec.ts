import { DeleteQuestionsCategoryUseCase } from '@/application/questionsCategories/DeleteQuestionsCategoryUseCase'
import { makeFakeQuestionsCategoryRepo } from '@/tests/mocks/repositories/QuestionsCategoryRepository.mock'

const makeSut = () => {
    const repository = makeFakeQuestionsCategoryRepo()
    const sut = new DeleteQuestionsCategoryUseCase(repository)
    return { sut, repository }
}

describe('DeleteQuestionsCategoryUseCase', () => {
    test('should throw if repository throws', async () => {
        const { sut, repository } = makeSut()
        jest.spyOn(repository, 'deleteCategory').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.delete('any_id')
        expect(res).rejects.toThrow()
    })
})
