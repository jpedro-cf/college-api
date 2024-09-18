import { GetAnswersPerfomanceUseCase } from '@/application/answers/GetAnswersPerfomanceUseCase'
import { makeFakeAnswersRepository } from '@/tests/mocks/repositories/AnswersRepository.mock'

const makeSut = () => {
    const answersRepository = makeFakeAnswersRepository()
    const sut = new GetAnswersPerfomanceUseCase(answersRepository)
    return { sut, answersRepository }
}
describe('GetAnswersPerfomanceUseCase', () => {
    test('should throw if repository throws', async () => {
        const { sut, answersRepository } = makeSut()
        jest.spyOn(answersRepository, 'getUserPerformance').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.execute('123', new Date())
        expect(res).rejects.toThrow()
    })
    test('should return user perfomance on success', async () => {
        const { sut } = makeSut()

        const res = await sut.execute('123', new Date())
        expect(res.categories).toBeTruthy()
        expect(res.performance).toBeTruthy()
    })
})
