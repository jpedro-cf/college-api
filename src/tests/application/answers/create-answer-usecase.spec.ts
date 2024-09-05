import { CreateAnswerUseCase } from '@/application/answers/CreateAnswerUseCase'
import { makeFakeQuestion } from '@/tests/mocks/models/QuestionModel.mock'
import { makeFakeAnswersRepository } from '@/tests/mocks/repositories/AnswersRepository.mock'
import { makeFakeQuestionsRepository } from '@/tests/mocks/repositories/QuestionsRepository.mock'
import { makeFakeUsersRepository } from '@/tests/mocks/repositories/UsersRepository.mock'

const makeSut = () => {
    const usersRepository = makeFakeUsersRepository()
    const questionsRepository = makeFakeQuestionsRepository()
    const answersRepository = makeFakeAnswersRepository()
    const sut = new CreateAnswerUseCase(usersRepository, questionsRepository, answersRepository)
    return { sut, usersRepository, questionsRepository, answersRepository }
}

describe('CreateAnswerUseCase', () => {
    const req = {
        user_id: '123',
        question_id: '123',
        answer_id: 2
    }
    test('should throw if user not found', async () => {
        const { sut, usersRepository } = makeSut()

        jest.spyOn(usersRepository, 'queryOne').mockReturnValueOnce(Promise.resolve(null))

        const res = sut.execute(req)
        expect(res).rejects.toThrow()
    })

    test('should throw if question not found', async () => {
        const { sut, questionsRepository } = makeSut()

        jest.spyOn(questionsRepository, 'queryOne').mockReturnValueOnce(Promise.resolve(null))

        const res = sut.execute(req)
        expect(res).rejects.toThrow()
    })

    test('answers repository should be called with correct=false if answer is not correct and user should lose 5 points', async () => {
        const { sut, questionsRepository, answersRepository, usersRepository } = makeSut()

        const questionModel = makeFakeQuestion()
        questionModel.correct_answer_id = 1

        jest.spyOn(questionsRepository, 'queryOne').mockReturnValueOnce(Promise.resolve(questionModel))
        const spy = jest.spyOn(answersRepository, 'create')
        const userSpy = jest.spyOn(usersRepository, 'update')

        const res = await sut.execute(req)

        expect(spy).toHaveBeenCalledWith(
            expect.objectContaining({
                correct: false
            })
        )
        expect(userSpy).toHaveBeenCalledWith(
            'any_id',
            expect.objectContaining({
                points: 10
            })
        )
        expect(res.id).toBeTruthy()
    })
})
