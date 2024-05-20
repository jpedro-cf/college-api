export interface IAnswer {
    id: number
    title: string
}

export interface IQuestion {
    id: string
    question: string
    material?: string
    category_id: string
    answers: IAnswer[]
    created_at: Date
}
