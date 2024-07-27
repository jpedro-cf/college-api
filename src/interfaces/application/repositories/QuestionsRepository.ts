import { IQuestion } from '@/domain/Question'
import { IQuestionSchema } from '../schemas/QuestionSchema'
import { IBaseRepository } from './BaseRepository'

export interface IQuestionsRepository extends IBaseRepository<IQuestionSchema> {}
