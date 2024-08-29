import { ICategoryRepository } from '@/interfaces/application/repositories/CategoryRepository'
import {
    IGetAllCategoriesResponse,
    IGetCategories,
    IGetCategoriesDTO
} from '@/interfaces/domain/useCases/categories/GetCategories'

export class GetCategoriesUseCase implements IGetCategories {
    constructor(private readonly categoryRepository: ICategoryRepository) {}

    async execute(data: IGetCategoriesDTO): Promise<IGetAllCategoriesResponse> {
        const response = await this.categoryRepository.queryMany({
            query: {
                title: { _contains: data.search ?? '' }
            },
            order: {
                by: 'createdAt',
                direction: data.order ?? 'desc'
            },
            pagination: {
                page: data.current_page ?? 1,
                per_page: data.per_page ?? 9
            }
        })
        return {
            categories: response.items,
            pages: response.total_pages
        }
    }
}
