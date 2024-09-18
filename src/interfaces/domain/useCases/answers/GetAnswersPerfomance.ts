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

export interface IGetAnswersPerfomance {
    execute(user_id: string, date: Date): Promise<IPerformanceResponseDTO>
}
