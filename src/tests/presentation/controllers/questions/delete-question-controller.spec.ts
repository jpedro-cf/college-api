import { DeleteQuestionController } from '@/presentation/controllers/questions/DeleteQuestionController'
import { makeFakeDeleteQuestion } from '@/tests/mocks/useCases/questions/DeleteQuestionUseCase.mock'

const makeSut = () => {
    const deleteQuestion = makeFakeDeleteQuestion()
    const sut = new DeleteQuestionController(deleteQuestion)

    return { sut, deleteQuestion }
}

describe('DeleteQuestionController', () => {
    test('should return 400 if id not provided', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ params: { id: null } })
        expect(res.statusCode).toBe(400)
    })

    test('should return 204 on success', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ params: { id: '12345' } })
        expect(res.statusCode).toBe(204)
    })
})
