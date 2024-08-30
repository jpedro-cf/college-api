export interface IAnswer {
    id: number
    title: string
}

export interface IQuestion {
    id: string
    question: string
    material?: string
    categories: string[]
    answers: IAnswer[]
    correct_answer_id: number
    createdAt: Date
    updatedAt: Date
}
