import { ICategory } from '@/domain/Category'
import { IUpdateCategory } from '@/interfaces/domain/useCases/categories/UpdateCategory'

export const makeFakeUpdateCategory = (): IUpdateCategory => {
    class Stub implements IUpdateCategory {
        async execute(id: string, fields: Partial<ICategory>): Promise<ICategory> {
            return Promise.resolve({
                id: fields.id,
                title: fields.title,
                slug: fields.slug,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        }
    }
    return new Stub()
}
