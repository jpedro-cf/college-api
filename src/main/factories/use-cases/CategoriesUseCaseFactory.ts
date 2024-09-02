import { CreateCategoryUseCase } from '@/application/categories/CreateCategoryUseCase'
import { DeleteCategoryUseCase } from '@/application/categories/DeleteCategoryUseCase'
import { GetCategoryByIdUseCase } from '@/application/categories/GetCategoryByIDUseCase'
import { GetCategoriesUseCase } from '@/application/categories/GetQuestionsCategoryUseCase'
import { UpdateCategoryUseCase } from '@/application/categories/UpdateCategoryUseCase'
import { DbCategoryRepository } from '@/infra/database/repositories/DbCategoryRepository'

export const makeCreateCategory = (): CreateCategoryUseCase => {
    return new CreateCategoryUseCase(new DbCategoryRepository())
}
export const makeGetCategories = (): GetCategoriesUseCase => {
    return new GetCategoriesUseCase(new DbCategoryRepository())
}

export const makeGetByID = (): GetCategoryByIdUseCase => {
    return new GetCategoryByIdUseCase(new DbCategoryRepository())
}

export const makeUpdateCategory = (): UpdateCategoryUseCase => {
    return new UpdateCategoryUseCase(new DbCategoryRepository())
}

export const makeDeleteCategory = (): DeleteCategoryUseCase => {
    return new DeleteCategoryUseCase(new DbCategoryRepository())
}
