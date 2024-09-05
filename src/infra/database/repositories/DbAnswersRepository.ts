import { IAnswer } from '@/domain/Answer'
import { DbBaseRepository } from './DbBaseRepository'
import { IAnswersRepository } from '@/interfaces/application/repositories/AnswersRepository'
import { AnswerModel } from '../models/AnswerModel'

export class DbAnswersRepository extends DbBaseRepository<IAnswer> implements IAnswersRepository {
    constructor() {
        super(AnswerModel, ['question'])
    }
}
