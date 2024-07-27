import { ICategory } from '@/domain/Category'

export interface ICreateCategory {
    create(title: string, slug: string, image?: string): Promise<ICategory>
}
