import { IQuestion } from '@/domain/Question'
import { IQuestionsRepository } from '@/interfaces/application/repositories/QuestionsRepository'
import { IQuestionSchema } from '@/interfaces/application/schemas/QuestionSchema'
import { QuestionModel } from '../models/QuestionModel'
import { DbBaseRepository } from './DbBaseRepository'

export class DbQuestionsRepository extends DbBaseRepository<IQuestionSchema> implements IQuestionsRepository {
    constructor() {
        super(QuestionModel)
    }
}
