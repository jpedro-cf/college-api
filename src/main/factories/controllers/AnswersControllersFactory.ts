import { CreateAnswerController } from '@/presentation/controllers/answers/CreateAnswerController'
import { makeCreateAnswerUseCase } from '../use-cases/AnswersUseCaseFactory'
import { makeAuthUseCase } from '../use-cases/AuthUseCasesFactory'

export const makeCreateAnswerController = (): CreateAnswerController => {
    return new CreateAnswerController(makeAuthUseCase(), makeCreateAnswerUseCase())
}
