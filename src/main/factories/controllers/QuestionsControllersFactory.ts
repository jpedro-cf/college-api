import { CreateQuestionController } from '@/presentation/controllers/questions/CreateQuestionController'
import { makeCreateQuestion, makeGetQuestions } from '../use-cases/QuestionsUseCaseFactory'
import { GetQuestionsController } from '@/presentation/controllers/questions/GetQuestionsController'

export const makeCreateQuestionController = (): CreateQuestionController => {
    return new CreateQuestionController(makeCreateQuestion())
}

export const makeGetQuestionsController = (): GetQuestionsController => {
    return new GetQuestionsController(makeGetQuestions())
}
