import { IQuestion } from '@/domain/Question'

export const makeFakeQuestion = (): IQuestion => {
    return {
        id: '321123123',
        question: 'Titulo da questão',
        categories: ['213idoau2e89q'],
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
        createdAt: new Date(),
        updatedAt: new Date()
    }
}
