import { CreateAnswerUseCase } from '@/application/answers/CreateAnswerUseCase'
import { GetAnswersPerfomanceUseCase } from '@/application/answers/GetAnswersPerfomanceUseCase'
import { GetAnswersUseCase } from '@/application/answers/GetAnswersUseCase'
import { DbAnswersRepository } from '@/infra/database/repositories/DbAnswersRepository'
import { DbQuestionsRepository } from '@/infra/database/repositories/DbQuestionsRepository'
import { DbUsersRepository } from '@/infra/database/repositories/DbUsersRepository'

export const makeCreateAnswerUseCase = (): CreateAnswerUseCase => {
    return new CreateAnswerUseCase(new DbUsersRepository(), new DbQuestionsRepository(), new DbAnswersRepository())
}

export const makeGetAnswersUseCase = (): GetAnswersUseCase => {
    return new GetAnswersUseCase(new DbAnswersRepository())
}

export const makeGetAnswersPerformance = (): GetAnswersPerfomanceUseCase => {
    return new GetAnswersPerfomanceUseCase(new DbAnswersRepository())
}
