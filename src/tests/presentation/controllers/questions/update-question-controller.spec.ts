import { UpdateQuestionController } from '@/presentation/controllers/questions/UpdateQuestionController'
import { makeFakeUpdateQuestion } from '@/tests/mocks/useCases/questions/UpdateQuestionUseCase.mock'

const makeSut = () => {
    const updateQuestion = makeFakeUpdateQuestion()
    const sut = new UpdateQuestionController(updateQuestion)

    return { sut, updateQuestion }
}

describe('UpdateQuestionController', () => {
    test('should return 400 if id not provided', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ params: { id: null }, body: { question: 'teste' } })
        expect(res.statusCode).toBe(400)
    })
    test('should return 400 if answes array provided but with incorrect fields', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({
            params: { id: '12345' },
            body: {
                answers: [
                    {
                        id: 1,
                        title: null
                    }
                ]
            }
        })
        expect(res.statusCode).toBe(400)
    })

    test('should return 400 if correct answer not equal to one of the answers', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({
            params: { id: '12345' },
            body: {
                answers: [
                    {
                        id: 1,
                        title: 'titulo'
                    }
                ],
                correct: 2
            }
        })
        expect(res.statusCode).toBe(400)
    })
    test('should return 200 on success', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({
            params: { id: '12345' },
            body: {
                answers: [
                    {
                        id: 1,
                        title: 'titulo'
                    }
                ],
                correct: 1
            }
        })
        expect(res.statusCode).toBe(200)
    })
})
