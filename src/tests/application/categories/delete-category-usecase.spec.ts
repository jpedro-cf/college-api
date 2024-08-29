import { DeleteCategoryUseCase } from '@/application/categories/DeleteCategoryUseCase'
import { makeFakeCategoryRepo } from '@/tests/mocks/repositories/QuestionsCategoryRepository.mock'

const makeSut = () => {
    const repository = makeFakeCategoryRepo()
    const sut = new DeleteCategoryUseCase(repository)
    return { sut, repository }
}

describe('DeleteCategoryUseCase', () => {
    test('should throw if repository throws', async () => {
        const { sut, repository } = makeSut()
        jest.spyOn(repository, 'delete').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.execute('any_id')
        expect(res).rejects.toThrow()
    })
    test('should throw if no category found with provided id', async () => {
        const { sut, repository } = makeSut()
        jest.spyOn(repository, 'queryOne').mockReturnValueOnce(Promise.resolve(null))

        const res = sut.execute('any_id')
        expect(res).rejects.toThrow()
    })

    test('should delete a category on success', async () => {
        const { sut } = makeSut()

        const res = await sut.execute('any_id')
        expect(res).toBeTruthy()
    })
})
