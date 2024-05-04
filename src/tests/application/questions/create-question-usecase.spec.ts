import { CreateQuestionUseCase } from '@/application/questions/CreateQuestionUseCase'
import { IQuestionsRepository } from '@/interfaces/application/repositories/QuestionsRepository'
import { makeCreateQuestionData } from '@/tests/mocks/entities/Question.mock'
import { makeFakeQuestionsRepository } from '@/tests/mocks/repositories/QuestionsRepository.mock'

interface ISut {
    questionsRepository: IQuestionsRepository
    sut: CreateQuestionUseCase
}

const makeSut = (): ISut => {
    const questionsRepository = makeFakeQuestionsRepository()
    const sut = new CreateQuestionUseCase(questionsRepository)
    return { sut, questionsRepository }
}

describe('CreateQuestionUseCase', () => {
    test('Should throw if questionsRepository throws', async () => {
        const { sut, questionsRepository } = makeSut()

        jest.spyOn(questionsRepository, 'createQuestion').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.create(makeCreateQuestionData())

        expect(res).rejects.toThrow()
    })

    test('Should create a question on success', async () => {
        const { sut } = makeSut()

        const res = await sut.create(makeCreateQuestionData())

        expect(res).toBeTruthy()
    })
})
