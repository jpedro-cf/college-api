import { IAnswer } from '@/domain/Answer'
import { IBaseRepository } from './BaseRepository'
import { IPerformanceResponseDTO } from '@/interfaces/domain/useCases/answers/GetAnswersPerfomance'

export interface IAnswersRepository extends IBaseRepository<IAnswer> {
    getUserPerformance(user_id: string, date: Date): Promise<IPerformanceResponseDTO>
}
