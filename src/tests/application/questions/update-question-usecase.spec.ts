import { UpdateQuestionUseCase } from '@/application/questions/UpdateQuestionUseCase'
import { makeFakeCategoryRepo } from '@/tests/mocks/repositories/QuestionsCategoryRepository.mock'
import { makeFakeQuestionsRepository } from '@/tests/mocks/repositories/QuestionsRepository.mock'

const makeSut = () => {
    const questionsRepository = makeFakeQuestionsRepository()
    const categoriesRepository = makeFakeCategoryRepo()
    const sut = new UpdateQuestionUseCase(questionsRepository, categoriesRepository)
    return { sut, questionsRepository, categoriesRepository }
}

describe('UpdateQuestionUseCase', () => {
    test('should throw if question not found', async () => {
        const { sut, questionsRepository } = makeSut()

        jest.spyOn(questionsRepository, 'queryOne').mockReturnValueOnce(Promise.resolve(null))

        const res = sut.execute('123', { question: 'Atualizar' })
        expect(res).rejects.toThrow()
    })

    test('should category provided does not exist', async () => {
        const { sut, categoriesRepository } = makeSut()

        jest.spyOn(categoriesRepository, 'queryOne').mockReturnValueOnce(Promise.resolve(null))

        const res = sut.execute('123', { question: 'Atualizar', categories: ['id_category', 'id_category_2'] })
        expect(res).rejects.toThrow()
    })

    test('should return updated question on success', async () => {
        const { sut } = makeSut()

        const res = await sut.execute('123', { question: 'Atualizar' })
        expect(res.id).toBeTruthy()
    })
})
