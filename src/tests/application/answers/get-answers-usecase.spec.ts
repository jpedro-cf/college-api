import { GetAnswersUseCase } from '@/application/answers/GetAnswersUseCase'
import { makeFakeAnswersRepository } from '@/tests/mocks/repositories/AnswersRepository.mock'

const makeSut = () => {
    const answersRepository = makeFakeAnswersRepository()
    const sut = new GetAnswersUseCase(answersRepository)

    return { sut, answersRepository }
}
describe('GetAnswersUseCase', () => {
    test('should return a list of questions on get()', async () => {
        const { sut } = makeSut()

        const res = await sut.get({ user_id: '123', search: 'title' })
        expect(res.answers.length).toBeGreaterThan(0)
        expect(res.pages).toBeGreaterThan(0)
    })
    test('should return a single questions on getByID()', async () => {
        const { sut } = makeSut()

        const res = await sut.getByID('123')
        expect(res.id).toBeTruthy()
    })
})
