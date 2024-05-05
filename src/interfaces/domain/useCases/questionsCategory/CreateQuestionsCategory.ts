import { IQuestionsCategory } from '@/domain/QuestionsCategory'

export interface ICreateQuestionsCategory {
    create(title: string, slug: string, image?: string): Promise<IQuestionsCategory>
}
