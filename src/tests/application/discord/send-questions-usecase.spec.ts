import { SendDiscordQuestionUseCase } from '@/application/discord/questions/SendDiscordQuestionUseCase'
import { makeFakeDiscordQuestionsService } from '@/tests/mocks/discord/DiscordQuestionsService.mock'
import { makeCreateQuestionData } from '@/tests/mocks/entities/Question.mock'

const makeSut = () => {
    const service = makeFakeDiscordQuestionsService()
    const sut = new SendDiscordQuestionUseCase(service)
    return { sut, service }
}

describe('SendDiscordQuestionUseCase', () => {
    test('should throw if service throws', () => {
        const { sut, service } = makeSut()
        jest.spyOn(service, 'sendQuestion').mockReturnValueOnce(Promise.reject(new Error('')))
        const res = sut.send({ ...makeCreateQuestionData(), category_title: 'titulo' })
        expect(res).rejects.toThrow()
    })
    test('should return true on success', async () => {
        const { sut } = makeSut()
        const res = sut.send({ ...makeCreateQuestionData(), category_title: 'titulo' })
        expect(res).toBeTruthy()
    })
})
