import { ICategory } from '@/domain/Category'

export interface IGetCategoryByID {
    execute(id: string): Promise<ICategory>
}
