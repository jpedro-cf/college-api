import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IUpdateQuestionsCategory } from '@/interfaces/domain/useCases/categories/UpdateQuestionsCategory'

export const makeFakeUpdateQuestionsCategory = (): IUpdateQuestionsCategory => {
    class UpdateQuestionsCategoryStub implements IUpdateQuestionsCategory {
        async update(data: Omit<IQuestionsCategory, 'createdAt' | 'updatedAt'>): Promise<IQuestionsCategory> {
            return Promise.resolve({
                _id: data._id,
                title: data.title,
                slug: data.slug,
                image: data.image,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        }
    }
    return new UpdateQuestionsCategoryStub()
}
