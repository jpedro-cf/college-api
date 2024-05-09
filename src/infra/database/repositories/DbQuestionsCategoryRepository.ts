import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IQuestionsCategoryRepository } from '@/interfaces/application/repositories/QuestionsCategoryRepository'
import { QuestionsCategoryModel } from '../models/QuestionsCategoryModel'
import { IGetQuestionsCategoriesDTO } from '@/interfaces/domain/useCases/questionsCategory/GetQuestionsCategories'

export class DbQuestionsCategoryRepository implements IQuestionsCategoryRepository {
    async getAll(data?: IGetQuestionsCategoriesDTO): Promise<IQuestionsCategory[]> {
        let query = {}

        // Verifica se há parâmetros de pesquisa e monta a consulta correspondente
        if (data && data.search) {
            query = { title: { $regex: data.search, $options: 'i' } } // Procura por títulos que contenham o texto especificado, ignorando maiúsculas e minúsculas
        }
        const categories = await QuestionsCategoryModel.find(query)
            .sort(data?.order === 'desc' ? { created_at: -1 } : { created_at: 1 })
            .exec()

        return categories
    }
    async createCategory(title: string, slug: string, image?: string): Promise<IQuestionsCategory> {
        const questionsCategory = new QuestionsCategoryModel({
            title,
            slug,
            image
        })
        await questionsCategory.save()
        return questionsCategory.toObject()
    }
    async getBySlug(slug: string): Promise<IQuestionsCategory> {
        const category = await QuestionsCategoryModel.findOne({
            slug: slug
        })
        if (category) {
            return category.toObject()
        }
        return null
    }
}
