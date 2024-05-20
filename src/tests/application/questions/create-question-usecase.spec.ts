import { CreateQuestionUseCase } from '@/application/questions/CreateQuestionUseCase'
import { makeCreateQuestionData } from '@/tests/mocks/entities/Question.mock'
import { makeFakeQuestionsCategoryRepo } from '@/tests/mocks/repositories/QuestionsCategoryRepository.mock'
import { makeFakeQuestionsRepository } from '@/tests/mocks/repositories/QuestionsRepository.mock'

const makeSut = () => {
    const questionsRepository = makeFakeQuestionsRepository()
    const categoryRepository = makeFakeQuestionsCategoryRepo()
    const sut = new CreateQuestionUseCase(questionsRepository, categoryRepository)
    return { sut, questionsRepository, categoryRepository }
}

describe('CreateQuestionUseCase', () => {
    test('Should throw if questionsRepository throws', async () => {
        const { sut, questionsRepository } = makeSut()

        jest.spyOn(questionsRepository, 'createQuestion').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.create(makeCreateQuestionData(), 3)

        expect(res).rejects.toThrow()
    })

    test('Should throw if categoryRepository returns null', async () => {
        const { sut, categoryRepository } = makeSut()

        jest.spyOn(categoryRepository, 'getByID').mockReturnValueOnce(Promise.resolve(null))

        const res = sut.create(makeCreateQuestionData(), 3)

        expect(res).rejects.toThrow()
    })

    test('Should create a question on success', async () => {
        const { sut } = makeSut()

        const res = await sut.create(makeCreateQuestionData(), 3)
        expect(res).toBeTruthy()
    })
})
