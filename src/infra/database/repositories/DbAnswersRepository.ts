import { IAnswer } from '@/domain/Answer'
import { DbBaseRepository } from './DbBaseRepository'
import { IAnswersRepository } from '@/interfaces/application/repositories/AnswersRepository'
import { AnswerModel } from '../models/AnswerModel'
import { IPerformanceResponseDTO } from '@/interfaces/domain/useCases/answers/GetAnswersPerfomance'

export class DbAnswersRepository extends DbBaseRepository<IAnswer> implements IAnswersRepository {
    constructor() {
        super(AnswerModel, ['question'])
    }
    async getUserPerformance(user_id: string, date: Date): Promise<IPerformanceResponseDTO> {
        const performanceByCategory = await AnswerModel.aggregate([
            { $match: { user: user_id, createdAt: { $gte: date } } },
            {
                $lookup: {
                    from: 'questions',
                    localField: 'question',
                    foreignField: 'id',
                    as: 'questionDetails'
                }
            },
            { $unwind: '$questionDetails' },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'questionDetails.categories',
                    foreignField: 'id',
                    as: 'categoryDetails'
                }
            },
            { $unwind: '$categoryDetails' },
            {
                $group: {
                    _id: '$categoryDetails.id',
                    categoryId: { $first: '$categoryDetails.id' },
                    categoryTitle: { $first: '$categoryDetails.title' },
                    totalAnswers: { $sum: 1 },
                    correctAnswers: { $sum: { $cond: ['$correct', 1, 0] } }
                }
            },
            {
                $project: {
                    categoryId: 1,
                    categoryTitle: 1,
                    totalAnswers: 1,
                    correctAnswers: 1
                }
            },
            {
                $group: {
                    _id: null,
                    categories: {
                        $push: {
                            id: '$categoryId',
                            title: '$categoryTitle',
                            total: '$totalAnswers',
                            correct: '$correctAnswers'
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    categories: 1
                }
            }
        ]).exec()

        const answers = await AnswerModel.aggregate([
            { $match: { user: user_id, createdAt: { $gte: date } } },
            {
                $project: {
                    date: {
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$createdAt'
                        }
                    },
                    id: 1,
                    createdAt: 1,
                    correct: 1
                }
            },
            {
                $group: {
                    _id: '$date',
                    incorrect: { $sum: { $cond: ['$correct', 0, 1] } },
                    correct: { $sum: { $cond: ['$correct', 1, 0] } }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: '$_id',
                    correct: 1,
                    incorrect: 1
                }
            }
        ]).exec()

        return {
            categories: performanceByCategory[0].categories,
            performance: answers as any
        }
    }
}
