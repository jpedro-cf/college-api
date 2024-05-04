export interface IAnswer {
    id: string
    title: string
}

export interface IQuestion {
    question: string
    answers: IAnswer[]
    correct_answer: string
}
