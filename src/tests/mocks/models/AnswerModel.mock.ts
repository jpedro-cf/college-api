import { IAnswer } from '@/domain/Answer'

export const makeFakeAnswerModel = (): IAnswer => {
    return {
        id: 'string',
        user: 'string',
        question: 'string',
        answer_id: 2,
        correct: true,
        createdAt: new Date()
    }
}
