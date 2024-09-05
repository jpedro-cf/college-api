import { CreateQuestionUseCase } from '@/application/questions/CreateQuestionUseCase'
import { DeleteQuestionUseCase } from '@/application/questions/DeleteQuestionUseCase'
import { GetQuestionsUseCase } from '@/application/questions/GetQuestionsUseCase'
import { UpdateQuestionUseCase } from '@/application/questions/UpdateQuestionUseCase'
import { DbAnswersRepository } from '@/infra/database/repositories/DbAnswersRepository'
import { DbCategoryRepository } from '@/infra/database/repositories/DbCategoryRepository'
import { DbQuestionsRepository } from '@/infra/database/repositories/DbQuestionsRepository'

export const makeCreateQuestion = (): CreateQuestionUseCase => {
    return new CreateQuestionUseCase(new DbQuestionsRepository(), new DbCategoryRepository())
}

export const makeGetQuestions = (): GetQuestionsUseCase => {
    return new GetQuestionsUseCase(new DbQuestionsRepository())
}

export const makeUpdateQuestion = (): UpdateQuestionUseCase => {
    return new UpdateQuestionUseCase(new DbQuestionsRepository(), new DbCategoryRepository())
}

export const makeDeleteQuestion = (): DeleteQuestionUseCase => {
    return new DeleteQuestionUseCase(new DbQuestionsRepository(), new DbAnswersRepository())
}
