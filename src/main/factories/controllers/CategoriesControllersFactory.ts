import { CreateCategoryController } from '@/presentation/controllers/categories/CreateCategoryController'
import {
    makeCreateCategory,
    makeDeleteCategory,
    makeGetByID,
    makeGetCategories,
    makeUpdateCategory
} from '../use-cases/CategoriesUseCaseFactory'
import { GetCategoriesController } from '@/presentation/controllers/categories/GetCategoriesController'
import { UpdateCategoryController } from '@/presentation/controllers/categories/UpdateCategoryController'
import { DeleteCategoryController } from '@/presentation/controllers/categories/DeleteCategoryController'

export const makeCreateCategoryController = (): CreateCategoryController => {
    return new CreateCategoryController(makeCreateCategory())
}

export const makeGetCategoriesController = (): GetCategoriesController => {
    return new GetCategoriesController(makeGetCategories())
}

export const makeUpdateCategoryController = (): UpdateCategoryController => {
    return new UpdateCategoryController(makeGetByID(), makeUpdateCategory())
}

export const makeDeleteCategoryController = (): DeleteCategoryController => {
    return new DeleteCategoryController(makeDeleteCategory())
}
