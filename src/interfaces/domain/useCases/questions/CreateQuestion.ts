import { IQuestion } from '@/domain/Question'

export interface ICreatQuestion {
    create(question: IQuestion): Promise<IQuestion>
}
