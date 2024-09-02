import { IDeleteCategory } from '@/interfaces/domain/useCases/categories/DeleteCategory'
import { DeleteCategoryController } from '@/presentation/controllers/categories/DeleteCategoryController'
import { NotFoundError } from '@/utils/customErrors'

const makeSut = () => {
    class DeleteCategory implements IDeleteCategory {
        async execute(id: string): Promise<boolean> {
            return Promise.resolve(true)
        }
    }
    const deleteCategory = new DeleteCategory()
    const sut = new DeleteCategoryController(deleteCategory)
    return { sut, deleteCategory }
}

describe('DeleteQuestionsCategoryController', () => {
    test('should return 400 if no id provided', async () => {
        const { sut } = makeSut()
        const res = await sut.handle({ params: { id: null } })

        expect(res.statusCode).toBe(400)
    })
    test('should return 400 if no category found', async () => {
        const { sut, deleteCategory } = makeSut()

        jest.spyOn(deleteCategory, 'execute').mockReturnValueOnce(
            Promise.reject(new NotFoundError('Categoria não encontrada'))
        )
        const res = await sut.handle({ params: { id: '123dawda' } })

        expect(res.statusCode).toBe(400)
    })
    test('should return 500 if server error', async () => {
        const { sut, deleteCategory } = makeSut()

        jest.spyOn(deleteCategory, 'execute').mockReturnValueOnce(Promise.reject(new Error('any error')))
        const res = await sut.handle({ params: { id: '123dawda' } })

        expect(res.statusCode).toBe(500)
    })
    test('should return 200 on delete success', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ params: { id: '123dawda' } })

        expect(res.statusCode).toBe(200)
    })
})
