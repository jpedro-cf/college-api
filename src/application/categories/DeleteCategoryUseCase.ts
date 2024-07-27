import { ICategoryRepository } from '@/interfaces/application/repositories/CategoryRepository'
import { IDeleteCategory } from '@/interfaces/domain/useCases/categories/DeleteCategory'
import { NotFoundError } from '@/utils/customErrors'

export class DeleteCategoryUseCase implements IDeleteCategory {
    constructor(private readonly categoryRepository: ICategoryRepository) {}
    async execute(id: string): Promise<boolean> {
        const exists = await this.categoryRepository.getOneByFields({ _id: id })
        if (!exists) {
            throw new NotFoundError('Categoria com esse ID não existe.')
        }

        const deleted = await this.categoryRepository.delete(id)
        return deleted
    }
}
