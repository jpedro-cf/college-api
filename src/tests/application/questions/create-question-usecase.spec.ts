import { CreateQuestionUseCase } from '@/application/questions/CreateQuestionUseCase'
import { makeCreateQuestionData } from '@/tests/mocks/entities/Question.mock'
import { makeFakeCategoryRepo } from '@/tests/mocks/repositories/QuestionsCategoryRepository.mock'
import { makeFakeQuestionsRepository } from '@/tests/mocks/repositories/QuestionsRepository.mock'

const makeSut = () => {
    const questionsRepository = makeFakeQuestionsRepository()
    const categoryRepository = makeFakeCategoryRepo()
    const sut = new CreateQuestionUseCase(questionsRepository, categoryRepository)
    return { sut, questionsRepository, categoryRepository }
}

describe('CreateQuestionUseCase', () => {
    test('Should throw if categoryRepository returns null', async () => {
        const { sut, categoryRepository } = makeSut()

        jest.spyOn(categoryRepository, 'queryOne').mockReturnValueOnce(Promise.resolve(null))

        const res = sut.execute(makeCreateQuestionData(), 3)

        expect(res).rejects.toThrow()
    })
    test('Should throw if questionsRepository throws', async () => {
        const { sut, questionsRepository } = makeSut()

        jest.spyOn(questionsRepository, 'create').mockReturnValueOnce(Promise.reject(new Error('')))

        const res = sut.execute(makeCreateQuestionData(), 3)

        expect(res).rejects.toThrow()
    })

    test('Should create a question on success', async () => {
        const { sut } = makeSut()

        const res = await sut.execute(makeCreateQuestionData(), 3)
        expect(res).toBeTruthy()
    })
})
