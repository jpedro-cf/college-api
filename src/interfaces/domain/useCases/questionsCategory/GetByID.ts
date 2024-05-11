import { IQuestionsCategory } from '@/domain/QuestionsCategory'

export interface IGetQuestionsCategoryByID {
    get(id: string): Promise<IQuestionsCategory>
}
