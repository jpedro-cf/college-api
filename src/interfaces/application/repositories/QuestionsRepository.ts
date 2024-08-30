import { IQuestion } from '@/domain/Question'
import { IBaseRepository } from './BaseRepository'

export interface IQuestionsRepository extends IBaseRepository<IQuestion> {}
