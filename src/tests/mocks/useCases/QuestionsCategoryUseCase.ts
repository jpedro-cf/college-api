import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { ICreateQuestionsCategory } from '@/interfaces/domain/useCases/questionsCategory/CreateQuestionsCategory'
import { IGetQuestionsCategoryBySlug } from '@/interfaces/domain/useCases/questionsCategory/GetBySlug'

export const makeFakeCreateQuestionsCategoryUseCase = (): ICreateQuestionsCategory => {
    class CreateQuestionsCategoryUseCaseStub implements ICreateQuestionsCategory {
        async create(title: string, slug: string, image?: string): Promise<IQuestionsCategory> {
            return Promise.resolve({
                id: 'any_id',
                title: 'title category',
                slug: 'title_category',
                image: 'image_url'
            })
        }
    }
    return new CreateQuestionsCategoryUseCaseStub()
}

export const makeFakeGetQuestionsCategoryBySlugUseCase = (): IGetQuestionsCategoryBySlug => {
    class GetQuestionsCategoryBySlugUseCase implements IGetQuestionsCategoryBySlug {
        async get(slug: string): Promise<IQuestionsCategory> {
            return Promise.resolve({
                id: 'any_id',
                title: 'title category',
                slug: 'title_category',
                image: 'image_url'
            })
        }
    }
    return new GetQuestionsCategoryBySlugUseCase()
}
