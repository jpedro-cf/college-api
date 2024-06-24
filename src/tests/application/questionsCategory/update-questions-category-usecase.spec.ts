import { UpdateQuestionsCategoryUseCase } from '@/application/questionsCategories/UpdateQuestionsCategoryUseCase'
import { makeFakeCategory } from '@/tests/mocks/models/CategoryModel.mock'
import { makeFakeQuestionsCategoryRepo } from '@/tests/mocks/repositories/QuestionsCategoryRepository.mock'

const makeSut = () => {
    const repository = makeFakeQuestionsCategoryRepo()
    const sut = new UpdateQuestionsCategoryUseCase(repository)

    return { sut, repository }
}

describe('UpdateQuestionsCategoryUseCase', () => {
    test('should throw if repository returns null on getByField()', async () => {
        const { sut, repository } = makeSut()
        jest.spyOn(repository, 'getByField').mockReturnValueOnce(Promise.resolve(null))

        const res = sut.update({
            _id: 'id',
            title: 'title category',
            slug: 'title_category',
            image: 'image_url'
        })

        expect(res).rejects.toThrow()
    })

    test('should throw if slug exists', async () => {
        const { sut, repository } = makeSut()
        jest.spyOn(repository, 'getByField').mockReturnValueOnce(Promise.resolve(null))

        const res = sut.update({
            _id: 'id',
            title: 'title category',
            slug: 'title_category',
            image: 'image_url'
        })

        expect(res).rejects.toThrow()
    })

    test('should throw if repository throws', async () => {
        const { sut, repository } = makeSut()

        jest.spyOn(repository, 'getByField').mockReturnValueOnce(Promise.resolve(makeFakeCategory()))
        jest.spyOn(repository, 'getByField').mockReturnValueOnce(Promise.resolve(null))
        jest.spyOn(repository, 'updateCategory').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.update({
            _id: 'id',
            title: 'title category',
            slug: 'title_category',
            image: 'image_url'
        })
        expect(res).rejects.toThrow()
    })
    test('should return a updated category on success', async () => {
        const { sut, repository } = makeSut()
        jest.spyOn(repository, 'getByField').mockReturnValueOnce(Promise.resolve(makeFakeCategory()))
        jest.spyOn(repository, 'getByField').mockReturnValueOnce(Promise.resolve(null))

        const res = await sut.update({
            _id: 'id',
            title: 'title category updated',
            slug: 'title-category-updated',
            image: 'image_url'
        })
        expect(res.title).toBe('title category updated')
        expect(res.slug).toBe('title-category-updated')
    })
})
