export interface IAnswer {
    id: number
    title: string
}

export interface IQuestion {
    _id: string
    question: string
    material?: string
    category_id: string
    answers: IAnswer[]
    createdAt: Date
    updatedAt: Date
}
