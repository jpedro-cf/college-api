import { GetAnswersController } from '@/presentation/controllers/answers/GetAnswersController'
import { makeFakeGetAnswers } from '@/tests/mocks/useCases/answers/GetAnswersUseCase.mock'

const makeSut = () => {
    const getAnswers = makeFakeGetAnswers()
    const sut = new GetAnswersController(getAnswers)
    return { sut, getAnswers }
}

describe('GetAnswersController', () => {
    test('should return 200 on success with list of answers', async () => {
        const { sut } = makeSut()

        const res = await sut.handle({ query: {} })
        expect(res.statusCode).toBe(200)
    })
})
