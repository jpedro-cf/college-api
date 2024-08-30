import { ICategory } from '@/domain/Category'

export interface ICreateCategory {
    execute(title: string, slug: string): Promise<ICategory>
}
