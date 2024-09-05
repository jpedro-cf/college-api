import { CreateAnswerUseCase } from '@/application/answers/CreateAnswerUseCase'
import { DbAnswersRepository } from '@/infra/database/repositories/DbAnswersRepository'
import { DbQuestionsRepository } from '@/infra/database/repositories/DbQuestionsRepository'
import { DbUsersRepository } from '@/infra/database/repositories/DbUsersRepository'

export const makeCreateAnswerUseCase = (): CreateAnswerUseCase => {
    return new CreateAnswerUseCase(new DbUsersRepository(), new DbQuestionsRepository(), new DbAnswersRepository())
}
