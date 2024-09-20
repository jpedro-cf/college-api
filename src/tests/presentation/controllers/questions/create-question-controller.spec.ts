import { CreateQuestionController } from '@/presentation/controllers/questions/CreateQuestionController'
import { makeFakeCreateQuestion } from '@/tests/mocks/useCases/questions/CreateQuestionUseCase.mock'

const makeSut = () => {
    const createQuestion = makeFakeCreateQuestion()
    const sut = new CreateQuestionController(createQuestion)
    return { sut, createQuestion }
}

describe('CreateQuestionController', () => {
    test('should return 400 if any field is missing', async () => {
        const { sut } = makeSut()
        const res = await sut.handle({
            body: {
                question: 'questão'
            }
        })

        expect(res.statusCode).toBe(400)
    })
    test('should return 400 if any answers field is missing', async () => {
        const { sut } = makeSut()
        const res = await sut.handle({
            body: {
                question: 'Questão titulo 2',
                material: 'https://google.com',
                categories: ['35c468a0-08e8-4c0e-a273-04a8b39b09c1'],
                answers: [
                    {
                        id: 1,
                        title: 'Resposta 1'
                    },
                    {
                        title: 'Resposta 2'
                    }
                ],
                correct: 2
            }
        })

        expect(res.statusCode).toBe(400)
    })
    test('should return 400 if correct answers is not equal to an answer id', async () => {
        const { sut } = makeSut()
        const res = await sut.handle({
            body: {
                question: 'Questão titulo 2',
                material: 'https://google.com',
                categories: ['35c468a0-08e8-4c0e-a273-04a8b39b09c1'],
                answers: [
                    {
                        id: 1,
                        title: 'Resposta 1'
                    },
                    {
                        id: 2,
                        title: 'Resposta 2'
                    }
                ],
                correct: 3
            }
        })

        expect(res.statusCode).toBe(400)
    })
    test('should return 200 on success', async () => {
        const { sut } = makeSut()
        const res = await sut.handle({
            body: {
                question: 'Questão titulo 2',
                material: 'https://google.com',
                categories: ['35c468a0-08e8-4c0e-a273-04a8b39b09c1'],
                answers: [
                    {
                        id: 1,
                        title: 'Resposta 1'
                    },
                    {
                        id: 2,
                        title: 'Resposta 2'
                    }
                ],
                correct: 2
            }
        })

        expect(res.statusCode).toBe(200)
    })
})
