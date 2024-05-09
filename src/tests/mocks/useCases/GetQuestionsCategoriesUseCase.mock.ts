import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import {
    IGetQuestionsCategories,
    IGetQuestionsCategoriesDTO
} from '@/interfaces/domain/useCases/questionsCategory/GetQuestionsCategories'

export const makeFakeGetQuestionsCategoies = (): IGetQuestionsCategories => {
    class GetQuestionsCategoiesStub implements IGetQuestionsCategories {
        async get(data?: IGetQuestionsCategoriesDTO): Promise<IQuestionsCategory[]> {
            return Promise.resolve([
                {
                    id: 'any_id',
                    title: data ? data.search : 'titulo',
                    slug: 'title_category',
                    image: 'image_url',
                    created_at: new Date()
                }
            ])
        }
    }
    return new GetQuestionsCategoiesStub()
}
