import { IDeleteQuestion } from '@/interfaces/domain/useCases/questions/DeleteQuestion'

export const makeFakeDeleteQuestion = (): IDeleteQuestion => {
    class Stub implements IDeleteQuestion {
        async execute(id: string): Promise<boolean> {
            return Promise.resolve(true)
        }
    }
    return new Stub()
}
