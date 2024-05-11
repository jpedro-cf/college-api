import { IQuestionsCategory } from '@/domain/QuestionsCategory'

export interface IUpdateQuestionsCategory {
    update(data: IQuestionsCategory): Promise<IQuestionsCategory>
}
