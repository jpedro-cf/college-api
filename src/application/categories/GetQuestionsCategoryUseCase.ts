import { ICategoryRepository } from '@/interfaces/application/repositories/CategoryRepository'
import {
    IGetAllCategoriesResponse,
    IGetCategories,
    IGetCategoriesDTO
} from '@/interfaces/domain/useCases/categories/GetCategories'

export class GetCategoriesUseCase implements IGetCategories {
    constructor(private readonly categoryRepository: ICategoryRepository) {}

    async execute(data: IGetCategoriesDTO): Promise<IGetAllCategoriesResponse> {
        const response = await this.categoryRepository.getAllWithFilters({
            search: data.search ?? '',
            order: data.order ?? 'desc',
            current_page: data.current_page ?? 1,
            per_page: data.per_page ?? 9
        })
        return response
    }
}
