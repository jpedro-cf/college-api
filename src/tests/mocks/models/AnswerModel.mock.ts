import { IAnswer } from '@/domain/Answer'

export const makeFakeAnswerModel = (): IAnswer => {
    return {
        id: 'string',
        user: 'string',
        question: 'string',
        correct: true,
        createdAt: new Date()
    }
}
