import { ISendQuestionDTO } from '@/interfaces/application/discord/DiscordQuestionsService'

export interface IDiscordSendQuestion {
    send(data: ISendQuestionDTO): Promise<boolean>
}
