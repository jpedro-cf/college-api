import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IGetQuestionsCategoryByID } from '@/interfaces/domain/useCases/questionsCategory/GetByID'

export const makeFakeGetQuestionsCategoryByIdUseCase = (): IGetQuestionsCategoryByID => {
    class GetQuestionsCategoryByIdStub implements IGetQuestionsCategoryByID {
        async get(id: string): Promise<IQuestionsCategory> {
            return Promise.resolve({
                id: id,
                title: 'title category',
                slug: 'title_category',
                image: 'image_url',
                created_at: new Date()
            })
        }
    }
    return new GetQuestionsCategoryByIdStub()
}
