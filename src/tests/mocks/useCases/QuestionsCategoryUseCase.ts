import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { ICreateQuestionsCategory } from '@/interfaces/domain/useCases/questionsCategory/CreateQuestionsCategory'

export const makeFakeCreateQuestionsCategoryUseCase = (): ICreateQuestionsCategory => {
    class CreateQuestionsCategoryUseCaseStub implements ICreateQuestionsCategory {
        async create(title: string, slug: string, image?: string): Promise<IQuestionsCategory> {
            return Promise.resolve({
                _id: 'any_id',
                title: 'title category',
                slug: 'title_category',
                image: 'image_url',
                created_at: new Date()
            })
        }
    }
    return new CreateQuestionsCategoryUseCaseStub()
}
