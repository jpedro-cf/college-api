import { IQuestion } from '@/domain/Question'

export const makeFakeQuestion = (): IQuestion => {
    return {
        question: 'Titulo da questão',
        answers: [
            {
                id: '21321123132',
                title: 'Título resposta'
            },
            {
                id: '21321123132',
                title: 'Título resposta'
            },
            {
                id: '3',
                title: 'Título resposta'
            }
        ],
        correct_answer: '3'
    }
}
