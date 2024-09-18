import { IAnswersRepository } from '@/interfaces/application/repositories/AnswersRepository'
import {
    IGetAnswersPerfomance,
    IPerformanceResponseDTO
} from '@/interfaces/domain/useCases/answers/GetAnswersPerfomance'

export class GetAnswersPerfomanceUseCase implements IGetAnswersPerfomance {
    constructor(private readonly answersRepository: IAnswersRepository) {}
    async execute(user_id: string, date: Date): Promise<IPerformanceResponseDTO> {
        return await this.answersRepository.getUserPerformance(user_id, date)
    }
}
