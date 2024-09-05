import { CreateAnswerController } from '@/presentation/controllers/answers/CreateAnswerController'
import { makeCreateAnswerUseCase, makeGetAnswersUseCase } from '../use-cases/AnswersUseCaseFactory'
import { makeAuthUseCase } from '../use-cases/AuthUseCasesFactory'
import { GetAnswersController } from '@/presentation/controllers/answers/GetAnswersController'
import { GetAnswerByIDController } from '@/presentation/controllers/answers/GetAnswerByIDController'

export const makeCreateAnswerController = (): CreateAnswerController => {
    return new CreateAnswerController(makeAuthUseCase(), makeCreateAnswerUseCase())
}

export const makeGetAnswersController = (): GetAnswersController => {
    return new GetAnswersController(makeAuthUseCase(), makeGetAnswersUseCase())
}

export const makeGetAnswersByIDController = (): GetAnswerByIDController => {
    return new GetAnswerByIDController(makeAuthUseCase(), makeGetAnswersUseCase())
}
