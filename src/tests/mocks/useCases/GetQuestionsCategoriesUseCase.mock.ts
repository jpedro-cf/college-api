import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import {
    IGetAllCategoriesResponse,
    IGetQuestionsCategories,
    IGetQuestionsCategoriesDTO
} from '@/interfaces/domain/useCases/questionsCategory/GetQuestionsCategories'

export const makeFakeGetQuestionsCategoies = (): IGetQuestionsCategories => {
    class GetQuestionsCategoiesStub implements IGetQuestionsCategories {
        async get(data?: IGetQuestionsCategoriesDTO): Promise<IGetAllCategoriesResponse> {
            return Promise.resolve({
                categories: [
                    {
                        _id: 'any_id',
                        title: data ? data.search : 'titulo',
                        slug: 'title_category',
                        image: 'image_url',
                        created_at: new Date()
                    }
                ],
                pages: 1
            })
        }
    }
    return new GetQuestionsCategoiesStub()
}
