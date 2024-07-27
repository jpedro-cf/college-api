import { ICategory } from '@/domain/Category'
import { ICategoryRepository } from '@/interfaces/application/repositories/CategoryRepository'
import { IGetCategoryByID } from '@/interfaces/domain/useCases/categories/GetByID'

export class GetCategoryByIdUseCase implements IGetCategoryByID {
    constructor(private readonly categoriesRepository: ICategoryRepository) {}
    async execute(id: string): Promise<ICategory> {
        const exists = await this.categoriesRepository.getOneByFields({ _id: id })
        if (exists) {
            return exists
        }
        return null
    }
}
