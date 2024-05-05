import { IQuestionsCategory } from '@/domain/QuestionsCategory'

export interface IQuestionsCategoryRepository {
    createCategory(title: string, image?: string): Promise<IQuestionsCategory>
}
