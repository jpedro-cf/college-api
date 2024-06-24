import { IQuestionsCategory } from '@/domain/QuestionsCategory'

export interface IUpdateQuestionsCategory {
    update(data: Omit<IQuestionsCategory, 'createdAt' | 'updatedAt'>): Promise<IQuestionsCategory>
}
