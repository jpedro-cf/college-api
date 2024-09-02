import { GetQuestionsUseCase } from '@/application/questions/GetQuestionsUseCase'
import { makeFakeQuestionsRepository } from '@/tests/mocks/repositories/QuestionsRepository.mock'

const makeSut = () => {
    const questionsRepository = makeFakeQuestionsRepository()
    const sut = new GetQuestionsUseCase(questionsRepository)
    return { sut, questionsRepository }
}

describe('GetQuestionsUseCase', () => {
    test('should throw if repository throws', async () => {
        const { sut, questionsRepository } = makeSut()

        jest.spyOn(questionsRepository, 'queryMany').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.execute({})
        expect(res).rejects.toThrow()
    })
    test('should return a list of questions', async () => {
        const { sut } = makeSut()

        const res = await sut.execute({ search: 'title' })
        expect(res.questions.length).toBeGreaterThan(0)
        expect(res.pages).toBeGreaterThan(0)
    })
})
