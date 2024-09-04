import { UpdateQuestionUseCase } from '@/application/questions/UpdateQuestionUseCase'
import { makeFakeQuestionsRepository } from '@/tests/mocks/repositories/QuestionsRepository.mock'

const makeSut = () => {
    const questionsRepository = makeFakeQuestionsRepository()
    const sut = new UpdateQuestionUseCase(questionsRepository)
    return { sut, questionsRepository }
}

describe('UpdateQuestionUseCase', () => {
    test('should throw if question not found', async () => {
        const { sut, questionsRepository } = makeSut()

        jest.spyOn(questionsRepository, 'queryOne').mockReturnValueOnce(Promise.resolve(null))

        const res = sut.execute('123', { question: 'Atualizar' })
        expect(res).rejects.toThrow()
    })
    test('should return updated question on success', async () => {
        const { sut } = makeSut()

        const res = await sut.execute('123', { question: 'Atualizar' })
        expect(res.id).toBeTruthy()
    })
})
