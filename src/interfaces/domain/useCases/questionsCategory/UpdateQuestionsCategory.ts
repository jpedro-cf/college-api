import { IQuestionsCategory } from '@/domain/QuestionsCategory'

export interface IUpdateQuestionsCategory {
    update(data: Omit<IQuestionsCategory, 'created_at'>): Promise<IQuestionsCategory>
}
