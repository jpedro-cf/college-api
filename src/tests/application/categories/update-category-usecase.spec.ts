import { UpdateCategoryUseCase } from '@/application/categories/UpdateCategoryUseCase'
import { makeFakeCategory } from '@/tests/mocks/models/CategoryModel.mock'
import { makeFakeCategoryRepo } from '@/tests/mocks/repositories/QuestionsCategoryRepository.mock'

const makeSut = () => {
    const repository = makeFakeCategoryRepo()
    const sut = new UpdateCategoryUseCase(repository)

    return { sut, repository }
}

describe('UpdateCategoryUseCase', () => {
    test('should throw if repository returns null on getByField()', async () => {
        const { sut, repository } = makeSut()
        jest.spyOn(repository, 'queryOne').mockReturnValueOnce(Promise.resolve(null))

        const res = sut.execute('id', { title: 'title category' })

        expect(res).rejects.toThrow()
    })

    test('should throw if slug exists', async () => {
        const { sut, repository } = makeSut()
        jest.spyOn(repository, 'queryOne').mockReturnValueOnce(Promise.resolve(null))

        const res = sut.execute('id', { title: 'title category' })

        expect(res).rejects.toThrow()
    })

    test('should throw if repository throws', async () => {
        const { sut, repository } = makeSut()

        jest.spyOn(repository, 'queryOne').mockReturnValueOnce(Promise.resolve(makeFakeCategory()))
        jest.spyOn(repository, 'queryOne').mockReturnValueOnce(Promise.resolve(null))
        jest.spyOn(repository, 'update').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.execute('id', { title: 'title category' })
        expect(res).rejects.toThrow()
    })
    test('should return a updated category on success', async () => {
        const { sut, repository } = makeSut()
        jest.spyOn(repository, 'queryOne').mockReturnValueOnce(Promise.resolve(makeFakeCategory()))
        jest.spyOn(repository, 'queryOne').mockReturnValueOnce(Promise.resolve(null))

        const res = await sut.execute('id', { title: 'title category updated' })
        expect(res.title).toBeTruthy()
    })
})
