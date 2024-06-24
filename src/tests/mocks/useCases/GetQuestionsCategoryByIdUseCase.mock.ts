import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { IGetQuestionsCategoryByID } from '@/interfaces/domain/useCases/questionsCategory/GetByID'
import { makeFakeCategory } from '../models/CategoryModel.mock'

export const makeFakeGetQuestionsCategoryByIdUseCase = (): IGetQuestionsCategoryByID => {
    class GetQuestionsCategoryByIdStub implements IGetQuestionsCategoryByID {
        async get(id: string): Promise<IQuestionsCategory> {
            return Promise.resolve(makeFakeCategory())
        }
    }
    return new GetQuestionsCategoryByIdStub()
}
