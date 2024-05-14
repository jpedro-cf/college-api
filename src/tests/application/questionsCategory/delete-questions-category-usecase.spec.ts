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
    test('should throw if no category found with provided id', async () => {
        const { sut, repository } = makeSut()
        jest.spyOn(repository, 'getByID').mockReturnValueOnce(Promise.resolve(null))

        const res = sut.delete('any_id')
        expect(res).rejects.toThrow()
    })

    test('should delete a category on success', async () => {
        const { sut } = makeSut()

        const res = await sut.delete('any_id')
        expect(res).toBeTruthy()
    })
})
