import { ICategory } from '@/domain/Category'

export const makeFakeCategory = (): ICategory => {
    return {
        _id: 'string',
        title: 'titulo categoria',
        slug: 'titulo-categoria',
        image: 'https://google.com',
        createdAt: new Date(),
        updatedAt: new Date()
    }
}
