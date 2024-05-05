import { IQuestionsCategory } from '@/domain/QuestionsCategory'

export interface IQuestionsCategoryRepository {
    createCategory(title: string, slug: string, image?: string): Promise<IQuestionsCategory>
    getBySlug(slug: string): Promise<IQuestionsCategory>
}
