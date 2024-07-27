import { ICategory } from '@/domain/Category'
import { ICategoryRepository } from '@/interfaces/application/repositories/CategoryRepository'
import { IUpdateCategory } from '@/interfaces/domain/useCases/categories/UpdateCategory'
import { convertToSlug } from '@/utils/converToSlug'
import { AlreadyInUseError } from '@/utils/customErrors'

export class UpdateCategoryUseCase implements IUpdateCategory {
    constructor(private readonly categoryRepository: ICategoryRepository) {}
    async execute(id: string, fields: Partial<ICategory>): Promise<ICategory> {
        const exists = await this.categoryRepository.getOneByFields({ _id: id })

        if (!exists) {
            throw new AlreadyInUseError('Categoria com esse ID não existe.')
        }

        if (fields.title) {
            const slug = convertToSlug(fields.title)
            const slug_exists = await this.categoryRepository.getOneByFields({ slug: slug })
            if (slug_exists) {
                throw new AlreadyInUseError('Categoria com esse titulo/slug já existe.')
            }
        }

        const updated = await this.categoryRepository.update(exists._id, fields)
        return updated ?? null
    }
}
