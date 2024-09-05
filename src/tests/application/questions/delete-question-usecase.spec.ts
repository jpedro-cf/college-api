import { DeleteQuestionUseCase } from '@/application/questions/DeleteQuestionUseCase'
import { UpdateQuestionUseCase } from '@/application/questions/UpdateQuestionUseCase'
import { makeFakeAnswersRepository } from '@/tests/mocks/repositories/AnswersRepository.mock'
import { makeFakeQuestionsRepository } from '@/tests/mocks/repositories/QuestionsRepository.mock'

const makeSut = () => {
    const questionsRepository = makeFakeQuestionsRepository()
    const answersRepository = makeFakeAnswersRepository()
    const sut = new DeleteQuestionUseCase(questionsRepository, answersRepository)
    return { sut, questionsRepository, answersRepository }
}

describe('DeleteQuestionUseCase', () => {
    test('should throw if question not found', async () => {
        const { sut, questionsRepository } = makeSut()

        jest.spyOn(questionsRepository, 'queryOne').mockReturnValueOnce(Promise.resolve(null))

        const res = sut.execute('123')
        expect(res).rejects.toThrow()
    })
    test('should delte answers with that have this question', async () => {
        const { sut, answersRepository } = makeSut()

        const spy = jest.spyOn(answersRepository, 'delete')

        await sut.execute('123')
        expect(spy).toHaveBeenCalled()
    })
    test('should return true on success', async () => {
        const { sut } = makeSut()

        const res = await sut.execute('123')
        expect(res).toBeTruthy()
    })
})
