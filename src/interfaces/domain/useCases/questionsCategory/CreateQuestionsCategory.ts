import { IQuestionsCategory } from '@/domain/QuestionsCategory'

export interface ICreateQuestionsCategory {
    create(title: string, image?: string): Promise<IQuestionsCategory>
}
