import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IUpdateQuestionsCategory } from '@/interfaces/domain/useCases/questionsCategory/UpdateQuestionsCategory'

export const makeFakeUpdateQuestionsCategory = (): IUpdateQuestionsCategory => {
    class UpdateQuestionsCategoryStub implements IUpdateQuestionsCategory {
        async update(data: Omit<IQuestionsCategory, 'created_at'>): Promise<IQuestionsCategory> {
            return Promise.resolve({
                _id: data._id,
                title: data.title,
                slug: data.slug,
                image: data.image,
                created_at: new Date()
            })
        }
    }
    return new UpdateQuestionsCategoryStub()
}
