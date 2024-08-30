import { IQuestion } from '@/domain/Question'
import { IQuestionsRepository } from '@/interfaces/application/repositories/QuestionsRepository'
import { makeFakeQuestion } from '../models/QuestionModel.mock'
import {
    IPaginatedResult,
    IQuery,
    TFieldQuery,
    TFiltersQuery
} from '@/interfaces/application/repositories/BaseRepository'

export const makeFakeQuestionsRepository = (): IQuestionsRepository => {
    class QuestionsRepositoryStub implements IQuestionsRepository {
        async queryOne(query: TFiltersQuery<IQuestion>): Promise<IQuestion> {
            return Promise.resolve(makeFakeQuestion())
        }
        async queryMany(query: IQuery<IQuestion>): Promise<IPaginatedResult<IQuestion>> {
            const data = {
                items: [makeFakeQuestion()],
                total_items: 1,
                total_pages: 1
            }
            return Promise.resolve(data)
        }
        async create(data: Partial<IQuestion>): Promise<IQuestion> {
            return Promise.resolve(makeFakeQuestion())
        }
        async delete(id: string): Promise<boolean> {
            return Promise.resolve(true)
        }
        async update(id: string, data: TFieldQuery<IQuestion>): Promise<IQuestion> {
            return Promise.resolve(makeFakeQuestion())
        }
        async getAll(): Promise<IQuestion[]> {
            return Promise.resolve([makeFakeQuestion()])
        }
    }
    return new QuestionsRepositoryStub()
}
