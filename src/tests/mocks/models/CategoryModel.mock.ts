import { ICategory } from '@/domain/Category'

export const makeFakeCategory = (): ICategory => {
    return {
        id: 'string',
        title: 'titulo categoria',
        slug: 'titulo-categoria',
        createdAt: new Date(),
        updatedAt: new Date()
    }
}
