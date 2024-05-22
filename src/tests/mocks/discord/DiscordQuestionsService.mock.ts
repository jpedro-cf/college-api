import { IDiscordQuestionsService, ISendQuestionDTO } from '@/interfaces/application/discord/DiscordQuestionsService'

export const makeFakeDiscordQuestionsService = (): IDiscordQuestionsService => {
    class DiscordQuestionsServiceStub implements IDiscordQuestionsService {
        async sendQuestion(data: ISendQuestionDTO): Promise<boolean> {
            return Promise.resolve(true)
        }
    }
    return new DiscordQuestionsServiceStub()
}
