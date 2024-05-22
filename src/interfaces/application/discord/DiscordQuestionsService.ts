import { IQuestion } from '@/domain/Question'

export interface ISendQuestionDTO extends IQuestion {
    category_title: string
}

export interface IDiscordQuestionsService {
    sendQuestion(data: ISendQuestionDTO): Promise<boolean>
}
