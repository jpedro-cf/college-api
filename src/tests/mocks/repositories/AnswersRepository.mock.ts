import { IAnswer } from '@/domain/Answer'
import { IAnswersRepository } from '@/interfaces/application/repositories/AnswersRepository'
import {
    TFieldQuery,
    TFiltersQuery,
    IQuery,
    IPaginatedResult
} from '@/interfaces/application/repositories/BaseRepository'
import { makeFakeAnswerModel } from '../models/AnswerModel.mock'
import { IPerformanceResponseDTO } from '@/interfaces/domain/useCases/answers/GetAnswersPerfomance'

export const makeFakeAnswersRepository = (): IAnswersRepository => {
    class Stub implements IAnswersRepository {
        async getUserPerformance(user_id: string, date: Date): Promise<IPerformanceResponseDTO> {
            return Promise.resolve({
                categories: [
                    {
                        id: 'string',
                        title: 'string',
                        total: 10,
                        correct: 5
                    }
                ],
                performance: [
                    {
                        date: new Date(),
                        correct: 5,
                        incorrect: 5
                    }
                ]
            })
        }
        async create(data: Partial<IAnswer>): Promise<IAnswer> {
            return Promise.resolve(makeFakeAnswerModel())
        }
        async delete(id: string): Promise<boolean> {
            return Promise.resolve(true)
        }
        async update(id: string, data: TFieldQuery<IAnswer>): Promise<IAnswer> {
            return Promise.resolve(makeFakeAnswerModel())
        }
        async queryOne(query: TFiltersQuery<IAnswer>): Promise<IAnswer> {
            return Promise.resolve(makeFakeAnswerModel())
        }
        async queryMany(query: IQuery<IAnswer>): Promise<IPaginatedResult<IAnswer>> {
            return Promise.resolve({
                items: [makeFakeAnswerModel()],
                total_items: 1,
                total_pages: 1
            })
        }
        async getAll(): Promise<IAnswer[]> {
            return Promise.resolve([makeFakeAnswerModel()])
        }
    }
    return new Stub()
}
