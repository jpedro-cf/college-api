import { IQuestionsRepository } from '@/interfaces/application/repositories/QuestionsRepository'
import {
    IGetAllQuestionsResponse,
    IGetQuestions,
    IGetQuestionsDTO
} from '@/interfaces/domain/useCases/questions/GetQuestions'

export class GetQuestionsUseCase implements IGetQuestions {
    constructor(private readonly questionsRepository: IQuestionsRepository) {}
    async execute(data: IGetQuestionsDTO): Promise<IGetAllQuestionsResponse> {
        const response = await this.questionsRepository.queryMany({
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
            questions: response.items,
            pages: response.total_pages
        }
    }
}