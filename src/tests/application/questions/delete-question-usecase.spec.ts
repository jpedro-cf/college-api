import { DeleteQuestionUseCase } from '@/application/questions/DeleteQuestionUseCase'
import { UpdateQuestionUseCase } from '@/application/questions/UpdateQuestionUseCase'
import { makeFakeQuestionsRepository } from '@/tests/mocks/repositories/QuestionsRepository.mock'

const makeSut = () => {
    const questionsRepository = makeFakeQuestionsRepository()
    const sut = new DeleteQuestionUseCase(questionsRepository)
    return { sut, questionsRepository }
}

describe('DeleteQuestionUseCase', () => {
    test('should throw if question not found', async () => {
        const { sut, questionsRepository } = makeSut()

        jest.spyOn(questionsRepository, 'queryOne').mockReturnValueOnce(Promise.resolve(null))

        const res = sut.execute('123')
        expect(res).rejects.toThrow()
    })
    test('should return true on success', async () => {
        const { sut } = makeSut()

        const res = await sut.execute('123')
        expect(res).toBeTruthy()
    })
})
