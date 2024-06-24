import { IQuestionsCategory } from '@/domain/QuestionsCategory'
import { ICreateQuestionsCategory } from '@/interfaces/domain/useCases/questionsCategory/CreateQuestionsCategory'
import { makeFakeCategory } from '../models/CategoryModel.mock'

export const makeFakeCreateQuestionsCategoryUseCase = (): ICreateQuestionsCategory => {
    class CreateQuestionsCategoryUseCaseStub implements ICreateQuestionsCategory {
        async create(title: string, slug: string, image?: string): Promise<IQuestionsCategory> {
            return Promise.resolve(makeFakeCategory())
        }
    }
    return new CreateQuestionsCategoryUseCaseStub()
}
