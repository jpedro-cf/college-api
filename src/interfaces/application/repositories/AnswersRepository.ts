import { IAnswer } from '@/domain/Answer'
import { IBaseRepository } from './BaseRepository'

export interface IPerformanceResponseDTO {
    categories: [
        {
            id: string
            title: string
            total: number
            correct: number
        }
    ]
    performance: [
        {
            date: Date
            correct: number
            incorrect: number
        }
    ]
}

export interface IAnswersRepository extends IBaseRepository<IAnswer> {
    getUserPerformance(user_id: string, date: Date): Promise<IPerformanceResponseDTO>
}
