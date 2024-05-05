import { IQuestionsCategory } from '@/domain/QuestionsCategory'

export interface IGetQuestionsCategoryBySlug {
    get(slug: string): Promise<IQuestionsCategory>
}
