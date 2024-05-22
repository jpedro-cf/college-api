import { IDiscordQuestionsService, ISendQuestionDTO } from '@/interfaces/application/discord/DiscordQuestionsService'
import { IDiscordSendQuestion } from '@/interfaces/domain/useCases/discord/questions/DiscordSendQuestion'

export class SendDiscordQuestionUseCase implements IDiscordSendQuestion {
    constructor(private readonly questionsService: IDiscordQuestionsService) {}
    async send(data: ISendQuestionDTO): Promise<boolean> {
        const sent = await this.questionsService.sendQuestion(data)
        return sent ? true : false
    }
}
