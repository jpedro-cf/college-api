import { IQuestion } from '@/domain/Question'

export interface IUpdateQuestion {
    execute(id: string, data: Partial<IQuestion>): Promise<IQuestion>
}
