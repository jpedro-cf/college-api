import { CreateAnswerController } from '@/presentation/controllers/answers/CreateAnswerController'
import {
    makeCreateAnswerUseCase,
    makeGetAnswersPerformance,
    makeGetAnswersUseCase
} from '../use-cases/AnswersUseCaseFactory'
import { makeAuthUseCase } from '../use-cases/AuthUseCasesFactory'
import { GetAnswersController } from '@/presentation/controllers/answers/GetAnswersController'
import { GetAnswerByIDController } from '@/presentation/controllers/answers/GetAnswerByIDController'
import { AnswersPerfomanceController } from '@/presentation/controllers/answers/AnswersPerfomanceController'

export const makeCreateAnswerController = (): CreateAnswerController => {
    return new CreateAnswerController(makeAuthUseCase(), makeCreateAnswerUseCase())
}

export const makeGetAnswersController = (): GetAnswersController => {
    return new GetAnswersController(makeAuthUseCase(), makeGetAnswersUseCase())
}

export const makeGetAnswersByIDController = (): GetAnswerByIDController => {
    return new GetAnswerByIDController(makeAuthUseCase(), makeGetAnswersUseCase())
}

export const makePerformanceController = (): AnswersPerfomanceController => {
    return new AnswersPerfomanceController(makeGetAnswersPerformance(), makeAuthUseCase())
}
