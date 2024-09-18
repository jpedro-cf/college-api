import {
    IGetAnswersPerfomance,
    IPerformanceResponseDTO
} from '@/interfaces/domain/useCases/answers/GetAnswersPerfomance'

export const makeFakeGetAnswerPerfomance = (): IGetAnswersPerfomance => {
    class Stub implements IGetAnswersPerfomance {
        async execute(user_id: string, date: Date): Promise<IPerformanceResponseDTO> {
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
    }
    return new Stub()
}
