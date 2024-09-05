import { IAnswer } from '@/domain/Answer'
import { IAnswersRepository } from '@/interfaces/application/repositories/AnswersRepository'
import {
    IGetAllAnswersResponse,
    IGetAnswers,
    IGetAnswersDTO
} from '@/interfaces/domain/useCases/answers/GetAnswersUseCase'

export class GetAnswersUseCase implements IGetAnswers {
    constructor(private readonly answersRepository: IAnswersRepository) {}
    async get(data: IGetAnswersDTO): Promise<IGetAllAnswersResponse> {
        const response = await this.answersRepository.queryMany({
            query: {
                question: { _contains: data.search ?? '' }
            },
            order: {
                by: 'createdAt',
                direction: data.order ?? 'desc'
            },
            pagination: {
                page: data.current_page ?? 1,
                per_page: data.per_page ?? 9
            }
        })
        return {
            answers: response.items,
            pages: response.total_pages
        }
    }
    async getByID(id: string): Promise<IAnswer> {
        return await this.answersRepository.queryOne({ id: { _equals: id } })
    }
}
