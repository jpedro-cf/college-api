import { ICategory } from '@/domain/Category'

export interface IGetCategoriesDTO {
    search?: string
    order?: 'desc' | 'asc'
    current_page?: number
    per_page?: number
}
export interface IGetAllCategoriesResponse {
    categories: ICategory[]
    pages: number
}

export interface IGetCategories {
    execute(data: IGetCategoriesDTO): Promise<IGetAllCategoriesResponse>
}
