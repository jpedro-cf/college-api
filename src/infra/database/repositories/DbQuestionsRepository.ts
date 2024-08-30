import { IQuestion } from '@/domain/Question'
import { IQuestionsRepository } from '@/interfaces/application/repositories/QuestionsRepository'
import { QuestionModel } from '../models/QuestionModel'
import { DbBaseRepository } from './DbBaseRepository'

export class DbQuestionsRepository extends DbBaseRepository<IQuestion> implements IQuestionsRepository {
    constructor() {
        super(QuestionModel, ['categories'])
    }
}
