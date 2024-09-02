import { CreateQuestionUseCase } from '@/application/questions/CreateQuestionUseCase'
import { GetQuestionsUseCase } from '@/application/questions/GetQuestionsUseCase'
import { DbCategoryRepository } from '@/infra/database/repositories/DbCategoryRepository'
import { DbQuestionsRepository } from '@/infra/database/repositories/DbQuestionsRepository'

export const makeCreateQuestion = (): CreateQuestionUseCase => {
    return new CreateQuestionUseCase(new DbQuestionsRepository(), new DbCategoryRepository())
}

export const makeGetQuestions = (): GetQuestionsUseCase => {
    return new GetQuestionsUseCase(new DbQuestionsRepository())
}
