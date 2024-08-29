import { IDeleteCategory } from '@/interfaces/domain/useCases/categories/DeleteCategory'
import { DeleteQuestionsCategoryController } from '@/presentation/controllers/questionsCategory/DeleteQuestionsCategoryController'
import { NotFoundError } from '@/utils/customErrors'

const makeSut = () => {
    class DeleteCategory implements IDeleteCategory {
        async execute(id: string): Promise<boolean> {
            return Promise.resolve(true)
        }
    }
    const deleteCategory = new DeleteCategory()
    const sut = new DeleteQuestionsCategoryController(deleteCategory)
    return { sut, deleteCategory }
}

describe('DeleteQuestionsCategoryController', () => {
    test('should return 400 if no id provided', async () => {
        const { sut } = makeSut()
        const res = await sut.handle({ query: { id: null } })

        expect(res.statusCode).toBe(400)
    })
    test('should return 400 if no category found', async () => {
        const { sut, deleteCategory } = makeSut()

        jest.spyOn(deleteCategory, 'execute').mockReturnValueOnce(
            Promise.reject(new NotFoundError('Categoria não encontrada'))
        )
        const res = await sut.handle({ query: { id: '123dawda' } })

        expect(res.statusCode).toBe(400)
    })
    test('should return 500 if server error', async () => {
        const { sut, deleteCategory } = makeSut()

        jest.spyOn(deleteCategory, 'execute').mockReturnValueOnce(Promise.reject(new Error('any error')))
        const res = await sut.handle({ query: { id: '123dawda' } })

        expect(res.statusCode).toBe(500)
    })
    test('should return 200 on delete success', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ query: { id: '123dawda' } })

        expect(res.statusCode).toBe(200)
    })
})
