import { CreateQuestionController } from '@/presentation/controllers/questions/CreateQuestionController'
import {
    makeCreateQuestion,
    makeDeleteQuestion,
    makeGetQuestions,
    makeUpdateQuestion
} from '../use-cases/QuestionsUseCaseFactory'
import { GetQuestionsController } from '@/presentation/controllers/questions/GetQuestionsController'
import { UpdateQuestionController } from '@/presentation/controllers/questions/UpdateQuestionController'
import { DeleteQuestionController } from '@/presentation/controllers/questions/DeleteQuestionController'
import { GetQuestionByIDController } from '@/presentation/controllers/questions/GetQuestionByIDController'

export const makeCreateQuestionController = (): CreateQuestionController => {
    return new CreateQuestionController(makeCreateQuestion())
}

export const makeGetQuestionsController = (): GetQuestionsController => {
    return new GetQuestionsController(makeGetQuestions())
}
export const makeGetQuestionByIDController = (): GetQuestionByIDController => {
    return new GetQuestionByIDController(makeGetQuestions())
}

export const makeUpdateQuestionController = (): UpdateQuestionController => {
    return new UpdateQuestionController(makeUpdateQuestion())
}

export const makeDeleteQuestionController = (): DeleteQuestionController => {
    return new DeleteQuestionController(makeDeleteQuestion())
}
