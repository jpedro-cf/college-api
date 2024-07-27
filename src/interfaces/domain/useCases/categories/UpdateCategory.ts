import { ICategory } from '@/domain/Category'

export interface IUpdateCategory {
    execute(id: string, fields: Partial<ICategory>): Promise<ICategory>
}
