import { ICategory } from '@/domain/Category'
import { ICategoryRepository } from '@/interfaces/application/repositories/CategoryRepository'
import { ICreateCategory } from '@/interfaces/domain/useCases/categories/CreateCategory'
import { AlreadyInUseError } from '@/utils/customErrors'

export class CreateCategoryUseCase implements ICreateCategory {
    constructor(private readonly categoryRepository: ICategoryRepository) {}
    async execute(title: string, slug: string): Promise<ICategory> {
        const exists = await this.categoryRepository.queryOne({ slug: { _equals: slug } })
        if (exists) {
            throw new AlreadyInUseError('Categoria com esse slug já existe.')
        }
        const created = await this.categoryRepository.create({ title, slug })

        return created
    }
}
