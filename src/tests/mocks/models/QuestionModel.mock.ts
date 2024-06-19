import { IQuestionSchema } from '@/interfaces/application/schemas/QuestionSchema'

export const makeFakeQuestion = (): IQuestionSchema => {
    return {
        _id: '321123123',
        question: 'Titulo da questão',
        category_id: '213idoau2e89q',
        material: 'https://google.com.br',
        answers: [
            {
                id: 1,
                title: 'Título resposta'
            },
            {
                id: 2,
                title: 'Título resposta'
            },
            {
                id: 3,
                title: 'Título resposta'
            }
        ],
        correct_answer_id: 3,
        created_at: new Date()
    }
}
